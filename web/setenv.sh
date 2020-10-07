#!/bin/bash

get_param() {
  if [[ -z "${USER_BRANCH}" ]]; then
    STAGE="staging"
  else
    STAGE="${USER_BRANCH}"
  fi
  echo `aws ssm --region $AWS_REGION get-parameter --with-decryption --output text --name /$STAGE/$1 --query Parameter.Value 2> /dev/null`
}

export SLACK_WEBHOOK="$(get_param slack-webhook)"
export STRIPE_CONNECT_CLIENT_ID="$(get_param stripe-client-id)"
export STRIPE_PUBLISHABLE_KEY="$(get_param stripe-public-key)"
export NODE_OPTIONS="--max_old_space_size=8192"
echo "Environment variables exported. Warning: this does not work in Amplify Console, ensure they are defined in it as well to work in the CD."
