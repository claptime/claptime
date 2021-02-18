# 🧑‍💻 Developer setup

## Prerequisites

- Install the [AWS CLI](https://aws.amazon.com/cli/), and configure your credentials: `aws configure`
- Install [Node.js](https://nodejs.org/) v12 (usage of a version manager like [nvm](https://github.com/nvm-sh/nvm/) is recommended)
- Install the [Amplify CLI](https://docs.amplify.aws/cli/): `npm install --global @aws-amplify/cli@4.36.2`
- (Optional) Install [jq](https://stedolan.github.io/jq/) (used in the videos service)
- (Optional) Install [docker](https://www.docker.com/products/docker-desktop/) (used in the videos service)

## Install

- First, clone the repository:

```bash
$ cd ~ # or change to any directory
$ git clone git@github.com:claptime/claptime.git
$ cd claptime
$ export CLAPTIME_HOME=`pwd`
```

We will use the `$CLAPTIME_HOME` environment variable later, so it could be a good idea to add the last command in your `.bashrc` or `.zshrc`.

- Then, install:

```bash
$ npm ci
```

This will perform installation in `$CLAPTIME_HOME`, `$CLAPTIME_HOME/cli` and `$CLAPTIME_HOME/commons`. You should now be able to use the Claptime CLI:

```bash
$ claptime --help
```

## Create a new environment

```bash
$ export STAGE=nickpark
$ cd $CLAPTIME_HOME/web
$ npm ci
$ amplify init # answer no, the name of your stage (nickpark) and select an AWS profile
# This will create your stack in the cloud

$ git checkout -B adding-new-env
$ git add amplify/team-provider-info.json
$ git commit -m "adding new env"

# Deploy Amplify backend
$ amplify push # This can take some time, in particular the first time

# Deploy Serverless services
$ claptime deploy:all

# Seed fixtures
$ claptime seed:all
$ claptime seed:videos
```

Now you're ready to develop:

```bash
$ npm run dev
```

Open your browser, and go to [localhost:3000](localhost:3000). Note that you will have to configure CORS in order to load videos from the CDN. You can install [CORS Everywhere on Firefox](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/) or [Allow CORS on Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf).

## Public environments

### Production

- Stage name: `prod`
- URL: [https://www.clap-time.com](https://www.clap-time.com)
- Git branch: `#master`

### Staging

- Stage name: `staging`
- URL: [https://staging.clap-time.com](https://staging.clap-time.com)
- Git branch: `#develop`
- Username: `claptime`
- Password: `crackersstaging`

## Configure the CD

1. [Create a GitHub personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)

```bash
$ aws cloudformation deploy \
  --template-file cd.yml \
  --stack-name claptime-cd \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    DefaultAuthUsernameParameter=TO_REPLACE \
    DefaultAuthPasswordParameter=TO_REPLACE \
    OAuthTokenParameter=TO_REPLACE
```
