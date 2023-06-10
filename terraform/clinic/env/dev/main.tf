terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.38.0"
    }
  }

  backend "s3" {
    bucket         = "65doctor-tf-state"
    key            = "app/dev/avixo2-clinic.tfstate"
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
      service    = "avixo2-clinic"
      env        = "dev"
    }
  }
}

module "avixo2-clinic" {
  source = "../../module/app"

  env                        = "dev"
  aws_region                 = "ap-southeast-1"
  stack                      = "avixo2-clinic"
  container_port             = "13011"
  host_port                  = 0
  source_repo_name           = "avixo2-clinic"
  source_repo_branch         = "main"
  source_repo_full           = "Speedoc/avixo2"
  vpc_id                     = "vpc-090c71c6e99f31534"
  family                     = "avixo2-clinic"
  secret_name                = "web/avixo2-clinic/dev"
  kms_key_alias              = "alias/avixo2-clinic-dev"
  dd_secret_name             = "DdApiKeySecret-MwcQ6rOMjZog"
  autoscaling_min            = 1
  autoscaling_max            = 3
  task_definition_cpu        = 512
  task_definition_memory     = 1024
  dns_domain_zone            = "avixo.co"
  domain_name                = "dev.clinic.avixo.co"
  access_log_bucket          = "65doctor.logs"
  web_acl_name               = "API_Firewall2"
  scaling_cpu_low_threshold  = 30
  scaling_cpu_high_threshold = 75
  ip_whitelist               = ["0.0.0.0/0"]
  create_ecr_repo            = "true"
  container_image            = "avixo2-clinic"
  alb_internal_only          = "false"
  alb_healthcheck_path       = "/ping"
  alb_ssl_policy             = "ELBSecurityPolicy-TLS-1-2-Ext-2018-06"
  alb_deletion_protection    = "true"
  secrets_keys               = ["ALLERGY_MS_URL", "API_VERSION", "AUTH_MS_URL", "BASE_URL", "IMMUNISATION_MS_URL", "APPOINTMENT_MS_URL", "INVOICE_MS_URL", "PRESCRIPTION_MS_URL", "PATIENT_MS_URL", "DIAGNOSIS_MS_URL", "MEDICAL_RECORD_MS_URL", "MEDICAL_CERTIFICATE_MS_URL", "ORGANISATION_MS_URL", "DISPENSE_MS_URL", "PRACTITIONER_MS_URL", "NEHR_CONNECTOR_MS_URL", "CATALOG_MS_URL", "INVENTORY_MS_URL"] # Refer to secrets keys that need to be expose as env variable
  app_version                = "1.0"
  ecs_cluster_name           = "dev-cluster" # Refer to ECS cluster name
  network_mode               = "bridge"
  alb_name                   = "dev-alb"
}