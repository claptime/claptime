# users

See [here](../README.md) for general behaviour.

## Set parameters

```bash
STAGE=staging
REGION=eu-west-1

aws ssm --region $REGION put-parameter --overwrite --name /$STAGE/mailchimp-audience-id --type String --value "[VALUE]"
aws ssm --region $REGION put-parameter --overwrite --name /$STAGE/mailchimp-api-key --type SecureString --value "[VALUE]"
```
