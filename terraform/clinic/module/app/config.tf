terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">=4.38.0"
    }
  }

}

provider "aws" {
  # Configuration options
  region = "ap-southeast-1"
  default_tags {
    tags = {
      deployment = "terraform"
      service    = "${var.stack}"
      env        = "${var.env}"
    }
  }
}

locals {
  stack_name              = "${var.stack}-${var.env}"
  app_container_image_url = "${data.aws_caller_identity.source.account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.container_image}"
  healthcheck_path        = "http://localhost:${var.container_port}${var.alb_healthcheck_path}"
  sorted_secrets_keys = var.secrets_keys

  sorted_secrets_vars = [
    for k in local.sorted_secrets_keys :
    {
      name      = k
      valueFrom = "${aws_secretsmanager_secret.app.arn}:${k}::"
    }
  ]

}

output "final_secrets_vars" {
  value = local.sorted_secrets_vars
}