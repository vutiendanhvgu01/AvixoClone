terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.38.0"
    }
  }

  backend "s3" {
    bucket         = "65doctor-tf-state"
    key            = "app/production/avixo2-report-portal.tfstate"
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
      service    = "avixo2-report-portal"
      env        = "production"
    }
  }
}

module "avixo2-report-portal" {
  source = "../../module/app"

  env                        = "production"
  aws_region                 = "ap-southeast-1"
  stack                      = "avixo2-report-portal"
  container_port             = "13041"
  host_port                  = 0
  source_repo_name           = "avixo2-report-portal"
  source_repo_branch         = "main"
  source_repo_full           = "Speedoc/avixo2"
  vpc_id                     = "vpc-0c5a1a35215866ca9"
  family                     = "avixo2-report-portal"
  secret_name                = "web/avixo2-report-portal/production"
  kms_key_alias              = "alias/avixo2-report-portal-production"
  dd_secret_name             = "DdApiKeySecret-MwcQ6rOMjZog"
  autoscaling_min            = 2
  autoscaling_max            = 4
  task_definition_cpu        = 512
  task_definition_memory     = 1024
  dns_domain_zone            = "avixo.co"
  domain_name                = "vitals.avixo.co"
  access_log_bucket          = "65doctor.logs"
  web_acl_name               = "API_Firewall2"
  scaling_cpu_low_threshold  = 30
  scaling_cpu_high_threshold = 75
  ip_whitelist               = ["0.0.0.0/0"]
  create_ecr_repo            = "false"
  container_image            = "avixo2-report-portal"
  alb_internal_only          = "false"
  alb_healthcheck_path       = "/api/ping"
  alb_ssl_policy             = "ELBSecurityPolicy-TLS-1-2-Ext-2018-06"
  alb_deletion_protection    = "true"
  secrets_keys               = ["AVIXO_UTILITY_API_URI", "AVIXO_UTILITY_API_KEY", "USMS_API_URL", "USMS_API_KEY"] # Refer to secrets keys that need to be expose as env variable
  app_version                = "1.0"
  ecs_cluster_name           = "production-cluster" # Refer to ECS cluster name
  network_mode               = "bridge"
  alb_name                   = "production-alb"
  alb_tgroup_name            = "avx2-report-portal-prd-tgrp"
}
