# Infra

## CD

1. [Create a GitHub personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)

```bash
aws cloudformation deploy \
  --template-file cd.yml \
  --stack-name claptime-cd \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    DefaultAuthUsernameParameter=TO_REPLACE \
    DefaultAuthPasswordParameter=TO_REPLACE \
    OAuthTokenParameter=TO_REPLACE
```
