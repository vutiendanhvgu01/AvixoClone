data "aws_caller_identity" "source" {

}

data "aws_iam_policy_document" "gha-iam-policy" {
  statement {
    actions = [
      "secretsmanager:GetSecretValue"
    ]

    resources = [
      "${aws_secretsmanager_secret.app.arn}",
    ]
  }

  statement {
    actions = [
      "kms:Decrypt",
    ]

    resources = [
      "${aws_kms_key.app.arn}",
    ]

  }

  statement {
    actions = [
      "ecs:RegisterTaskDefinition",
      "ecs:DescribeTaskDefinition",
      "ecr:GetAuthorizationToken",
    ]

    resources = [
      "*",
    ]

  }

  statement {
    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
    ]

    resources = [
      "arn:aws:ecr:${var.aws_region}:${data.aws_caller_identity.source.account_id}:repository/${var.stack}",
    ]
  }

  statement {
    actions = [
      "iam:PassRole",
    ]

    resources = [
      "${aws_iam_role.tasks-execution-service-role.arn}",
      "${aws_iam_role.tasks-service-role.arn}",
    ]

  }

  statement {
    actions = [
      "ecs:UpdateService",
      "ecs:DescribeServices",
    ]

    resources = [
      "${aws_ecs_service.service.id}",
    ]

  }


}

resource "aws_iam_policy" "gha-iam-policy" {
  name        = "${local.stack_name}-gha-iam-policy"
  description = "A policy for github action role"

  policy = data.aws_iam_policy_document.gha-iam-policy.json
}

data "aws_iam_policy_document" "gha-assume-role-policy" {
  statement {
    actions = [
      "sts:AssumeRoleWithWebIdentity",
    ]

    principals {
      type        = "Federated"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.source.account_id}:oidc-provider/token.actions.githubusercontent.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values = [
        "repo:${var.source_repo_full}:ref:refs/heads/${var.source_repo_branch}",
        "repo:${var.source_repo_full}:ref:refs/heads/e2etest*",
        "repo:${var.source_repo_full}:pull_request",
      ]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
  }


}
resource "aws_iam_role" "gha_role" {
  name               = "github-${var.stack}-${var.env}-role"
  assume_role_policy = data.aws_iam_policy_document.gha-assume-role-policy.json
  path               = "/"
}

resource "aws_iam_role_policy_attachment" "gha-attach-policy" {
  role       = aws_iam_role.gha_role.name
  policy_arn = aws_iam_policy.gha-iam-policy.arn
}

