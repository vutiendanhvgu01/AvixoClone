
# ---------------------------------------------------------------------------------------------------------------------
# ALB
# ---------------------------------------------------------------------------------------------------------------------

data "aws_alb" "alb" {
  name = var.alb_name
}

# ---------------------------------------------------------------------------------------------------------------------
# ALB TARGET GROUP
# ---------------------------------------------------------------------------------------------------------------------

resource "aws_alb_target_group" "trgp" {
  name     = "${local.stack_name}-tgrp"
  port     = var.container_port
  protocol = "HTTP"
  vpc_id   = var.vpc_id
  #target_type          = "ip"
  deregistration_delay = 5
  health_check {
    path = var.alb_healthcheck_path
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# ALB LISTENER
# ---------------------------------------------------------------------------------------------------------------------

data "aws_lb_listener" "alb-listener" {
  load_balancer_arn = data.aws_alb.alb.arn
  port              = 443
}

resource "aws_lb_listener_rule" "alb-listener" {
  listener_arn = data.aws_lb_listener.alb-listener.arn

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.trgp.arn
  }

  condition {
    host_header {
      values = [var.domain_name]
    }
  }
}

resource "aws_lb_listener_certificate" "alb" {
  listener_arn    = data.aws_lb_listener.alb-listener.arn
  certificate_arn = aws_acm_certificate.cert.arn
}

data "aws_route53_zone" "speedoc" {
  name = var.dns_domain_zone
}

resource "aws_route53_record" "alias_route53_record" {

  zone_id = data.aws_route53_zone.speedoc.zone_id # Replace with your zone ID
  name    = var.domain_name                       # Replace with your name/domain/subdomain
  type    = "A"

  alias {
    name                   = data.aws_alb.alb.dns_name
    zone_id                = data.aws_alb.alb.zone_id
    evaluate_target_health = true
  }
}

resource "aws_acm_certificate" "cert" {

  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.speedoc.zone_id
}

resource "aws_acm_certificate_validation" "cert" {

  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}
