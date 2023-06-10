resource "aws_secretsmanager_secret" "app" {
  name       = var.secret_name
  kms_key_id = aws_kms_key.app.key_id

}
