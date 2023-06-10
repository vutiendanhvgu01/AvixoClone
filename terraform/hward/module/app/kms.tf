resource "aws_kms_key" "app" {
  description             = "KMS key for ${local.stack_name}"
  deletion_window_in_days = 10

  enable_key_rotation = true
  multi_region        = true
}

resource "aws_kms_alias" "app" {
  name          = "alias/${local.stack_name}"
  target_key_id = aws_kms_key.app.key_id

}
