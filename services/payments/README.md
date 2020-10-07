# payments

See [here](../README.md) for general behaviour.

## Set parameters

```bash
STAGE=staging
REGION=eu-west-1

aws ssm --region $REGION put-parameter --overwrite --name /$STAGE/stripe-client-id --type String --value "[VALUE]"
aws ssm --region $REGION put-parameter --overwrite --name /$STAGE/stripe-public-key --type String --value "[VALUE]"
aws ssm --region $REGION put-parameter --overwrite --name /$STAGE/stripe-secret-key --type SecureString --value "[VALUE]"
```

## Create domain

```bash
STAGE=staging
REGION=eu-west-1

npx serverless create_domain --stage $STAGE --region $REGION
```
