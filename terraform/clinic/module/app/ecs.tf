# ---------------------------------------------------------------------------------------------------------------------
# ECS CLUSTER
# ---------------------------------------------------------------------------------------------------------------------
data "aws_subnets" "private" {
  filter {
    name   = "vpc-id"
    values = [var.vpc_id]
  }

  tags = {
    zone = "private"
  }
}

data "aws_subnet" "private" {
  for_each = toset(data.aws_subnets.private.ids)
  id       = each.value
}

data "aws_secretsmanager_secret" "datadog" {
  name = var.dd_secret_name
}

data "aws_ecs_cluster" "ecs-cluster" {
  cluster_name = var.ecs_cluster_name


}

resource "aws_ecr_repository" "repo" {
  count                = var.create_ecr_repo ? 1 : 0
  name                 = var.stack
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
  encryption_configuration {
    encryption_type = "KMS"
    kms_key         = aws_kms_key.app.arn
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# ECS TASK DEFINITION USING FARGATE
# ---------------------------------------------------------------------------------------------------------------------

module "ecs-container-definition-app" {
  source  = "cloudposse/ecs-container-definition/aws"
  version = "0.58.1"

  container_name  = var.family
  essential       = true
  container_image = local.app_container_image_url
  linux_parameters = {
    "capabilities" = {
      add  = []
      drop = []
    }
    "devices"            = []
    "initProcessEnabled" = true
    "maxSwap"            = null
    "sharedMemorySize"   = null
    "swappiness"         = null
    "tmpfs"              = []
  }
  docker_labels = {
    "com.datadoghq.tags.env" : "${var.env}",
    "com.datadoghq.tags.service" : "${var.stack}",
    "com.datadoghq.tags.version" : "${var.app_version}"
  }

  healthcheck = {
    command = [
      "CMD-SHELL", "wget --no-verbose --tries=1 --spider ${local.healthcheck_path} || exit 1"
    ]
    retries     = 3
    timeout     = 5
    interval    = 5
    startPeriod = 10
  }

  environment = [

    {
      name  = "DD_ENV"
      value = "${var.env}"
    },

    {
      name  = "APP_ENV"
      value = "${var.env}"
    },

    {
      name  = "DD_SERVICE"
      value = "${var.stack}"
    },

    {
      name  = "DD_VERSION"
      value = "${var.app_version}"
    }
  ]

  secrets = local.sorted_secrets_vars

  port_mappings = [
    {
      containerPort = "${var.container_port}"
      hostPort      = "${var.host_port}"
      protocol      = "tcp"
    }
  ]
}

data "aws_availability_zones" "main" {
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }

  filter {
    name = "region-name"
    values = [
      "${var.aws_region}"
    ]
  }
}

resource "aws_ecs_task_definition" "task-def" {

  family                   = local.stack_name
  network_mode             = var.network_mode
  requires_compatibilities = ["EC2"]
  cpu                      = var.task_definition_cpu
  memory                   = var.task_definition_memory
  task_role_arn            = aws_iam_role.tasks-service-role.arn
  execution_role_arn       = aws_iam_role.tasks-execution-service-role.arn

  container_definitions = jsonencode([
    module.ecs-container-definition-app.json_map_object
  ])

  placement_constraints {
    type       = "memberOf"
    expression = "attribute:ecs.availability-zone in [${join(",", data.aws_availability_zones.main.names)}]"
  }

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "ARM64"
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# ECS SERVICE
# ---------------------------------------------------------------------------------------------------------------------

resource "aws_ecs_service" "service" {

  lifecycle {
    ignore_changes = [
      desired_count
    ]
  }

  name                   = "${local.stack_name}-service"
  cluster                = data.aws_ecs_cluster.ecs-cluster.id
  task_definition        = aws_ecs_task_definition.task-def.arn
  desired_count          = var.autoscaling_min
  enable_execute_command = true
  launch_type            = "EC2"
  propagate_tags         = "SERVICE"

  load_balancer {
    target_group_arn = aws_alb_target_group.trgp.id
    container_name   = var.family
    container_port   = var.container_port
  }

  ordered_placement_strategy {
    type  = "spread"
    field = "attribute:ecs.availability-zone"
  }
}

resource "aws_iam_role" "tasks-execution-service-role" {
  name               = "${local.stack_name}-ECSTasksExecutionServiceRole"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.tasks-service-assume-policy.json
}

resource "aws_iam_role" "tasks-service-role" {
  name               = "${local.stack_name}-ECSTasksServiceRole"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.tasks-service-assume-policy.json
}


data "aws_iam_policy_document" "tasks-service-assume-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "tasks-execution-service-role-attachment" {
  role       = aws_iam_role.tasks-execution-service-role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "tasks-executions-service-policy" {
  statement {
    actions = [
      "secretsmanager:GetSecretValue",
      "kms:Decrypt"
    ]
    resources = [
      aws_secretsmanager_secret.app.arn,
      data.aws_secretsmanager_secret.datadog.arn,
      aws_kms_key.app.arn
    ]
  }

  statement {
    actions = [
      "ecr:CreatePullThroughCacheRule",
      "ecr:BatchImportUpstreamImage",
      "ecr:CreateRepository",
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "tasks-executions-service-policy" {
  name        = "${local.stack_name}-tasks-executions-service-policy"
  description = "A policy for ecs task execution"

  policy = data.aws_iam_policy_document.tasks-executions-service-policy.json
}

data "aws_iam_policy_document" "tasks-service-policy" {
  statement {
    actions = [
      "secretsmanager:GetSecretValue",
      "kms:Decrypt"
    ]
    resources = [
      aws_secretsmanager_secret.app.arn,
      aws_kms_key.app.arn
    ]
  }
  statement {
    actions = [
      "ssmmessages:CreateControlChannel",
      "ssmmessages:CreateDataChannel",
      "ssmmessages:OpenControlChannel",
      "ssmmessages:OpenDataChannel",
    ]
    resources = ["*"]
  }

}

resource "aws_iam_policy" "tasks-service-policy" {
  name        = "${local.stack_name}-tasks-service-policy"
  description = "A policy for ecs task "

  policy = data.aws_iam_policy_document.tasks-service-policy.json
}

resource "aws_iam_role_policy_attachment" "tasks-service-attach" {
  role       = aws_iam_role.tasks-service-role.name
  policy_arn = aws_iam_policy.tasks-service-policy.arn
}

resource "aws_iam_role_policy_attachment" "tasks-execution-service-attach" {
  role       = aws_iam_role.tasks-execution-service-role.name
  policy_arn = aws_iam_policy.tasks-executions-service-policy.arn
}
