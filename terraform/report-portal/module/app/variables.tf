# ---------------------------------------------------------------------------------------------------------------------
# VARIABLES
# ---------------------------------------------------------------------------------------------------------------------

variable "aws_region" {
  description = "The AWS region to create things in."
  //default     = "us-east-2"
}

variable "stack" {
  description = "Name of the stack."
}

variable "env" {
  description = "Environment name."
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "public_subnets" {
  description = "A list of public subnets inside the VPC"
  type        = list(string)
  default     = []
}

variable "private_subnets" {
  description = "A list of private subnets inside the VPC"
  type        = list(string)
  default     = []
}

variable "family" {
  description = "Family of the Task Definition"
  default     = "petclinic"
}

variable "container_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = 8080
}

variable "task_definition_cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
}

variable "task_definition_memory" {
  description = "Fargate instance memory to provision (in MiB)"
}

# Source repo name and branch

variable "source_repo_name" {
  description = "Source repo name"
  type        = string
}

variable "source_repo_branch" {
  description = "Source repo branch"
  type        = string
}

variable "source_repo_full" {
  description = "Source repo full"
  type        = string
}

variable "secret_name" {
  description = "AWS Secret Manager name for app"
  type        = string
}

variable "kms_key_alias" {
  description = "AWS KMS Key Alias"
  type        = string
}

variable "dd_secret_name" {
  description = "AWS Secret Manager name for datadog"
  type        = string
}

variable "autoscaling_min" {
  description = "Autoscaling min capacity"
  type        = string
}

variable "autoscaling_max" {
  description = "Autoscaling max capacity"
  type        = string
}

variable "dns_domain_zone" {
  description = "Route53 domain zone"
  type        = string
}

variable "domain_name" {
  description = "Endpoint url domain name"
  type        = string
}

variable "access_log_bucket" {
  description = "S3 bucket to store access logs"
}

variable "web_acl_name" {
  description = "AWS Web ACL Name"
  type        = string
}

variable "scaling_cpu_high_threshold" {
  description = "Autoscaling high cpu utilisation threshold"
  default     = 80
}

variable "scaling_cpu_low_threshold" {
  description = "Autoscaling low cpu utilisation threshold"
  default     = 30
}

variable "ip_whitelist" {
  type    = list(string)
  default = ["0.0.0.0/0"]
}

variable "alb_internal_only" {
  description = "Toggle for application load balancer to be internal only"
  type        = bool
  default     = false
}

variable "create_ecr_repo" {
  description = "Toggle for creating ECR repo"
  type        = bool
  default     = false
}

variable "container_image" {
  description = "Container image name"
  type        = string
}

variable "alb_healthcheck_path" {
  description = "ALB healthcheck path"
  type        = string
}

variable "alb_ssl_policy" {
  description = "ALB SSL policy"
  type        = string
}

variable "secrets_keys" {
  description = "List of secrets keys to be retrieved from AWS Secret Manager"
  type        = list(string)
}

variable "app_version" {
  description = "App version"
  type        = string
}

variable "ecs_cluster_name" {
  description = "ECS cluster name"
  type        = string
}

variable "network_mode" {
  description = "Network mode for the task"
  type        = string
}

variable "host_port" {
  description = "Host port for the task"
  type        = string
}

variable "alb_deletion_protection" {
  description = "ALB deletion protection"
  type        = string
}

variable "alb_name" {
  description = "ALB name"
  type        = string
}

variable "alb_tgroup_name" {
  description = "ALB target group name"
  type        = string
  default = ""
}