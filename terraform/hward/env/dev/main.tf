terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.38.0"
    }
  }

  backend "s3" {
    bucket         = "65doctor-tf-state"
    key            = "app/dev/avixo2-hward.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}

provider "aws" {
  # Configuration options
  region = "ap-southeast-1"
  default_tags {
    tags = {
      deployment = "terraform"
      service    = "avixo2-hward"
      env        = "dev"
    }
  }
}

module "avixo2-hward" {
  source = "../../module/app"

  env                        = "dev"
  aws_region                 = "ap-southeast-1"
  stack                      = "avixo2-hward"
  container_port             = "13040"
  host_port                  = 0
  source_repo_name           = "avixo2-hward"
  source_repo_branch         = "main"
  source_repo_full           = "Speedoc/avixo2"
  vpc_id                     = "vpc-090c71c6e99f31534"
  family                     = "avixo2-hward"
  secret_name                = "web/avixo2-hward/dev"
  kms_key_alias              = "alias/avixo2-hward-dev"
  dd_secret_name             = "DdApiKeySecret-MwcQ6rOMjZog"
  autoscaling_min            = 1
  autoscaling_max            = 3
  task_definition_cpu        = 512
  task_definition_memory     = 1024
  dns_domain_zone            = "avixo.co"
  domain_name                = "dev.hward.avixo.co"
  access_log_bucket          = "65doctor.logs"
  web_acl_name               = "API_Firewall2"
  scaling_cpu_low_threshold  = 30
  scaling_cpu_high_threshold = 75
  ip_whitelist               = ["0.0.0.0/0"]
  create_ecr_repo            = "true"
  container_image            = "avixo2-hward"
  alb_internal_only          = "false"
  alb_healthcheck_path       = "/ping"
  alb_ssl_policy             = "ELBSecurityPolicy-TLS-1-2-Ext-2018-06"
  alb_deletion_protection    = "true"
  secrets_keys               = ["API_VERSION", "AUTH_MS_URL", "BASE_URL", "CLIENT_ACCOUNT", "ONEMAP_URI", "USMS_API_URL", "USMS_API_KEY", "AVIXO_CMS_URL", "BOOKING_SERVICE_URL", "BOOKING_SERVICE_API_KEY", "UNLEASH_FRONTEND_API_URL", "UNLEASH_FRONTEND_API_TOKEN", "UNLEASH_APP_NAME"] # Refer to secrets keys that need to be expose as env variable
  app_version                = "1.0"
  ecs_cluster_name           = "dev-cluster" # Refer to ECS cluster name
  network_mode               = "bridge"
  alb_name                   = "dev-alb"
}
