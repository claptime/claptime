# Claptime

## Install

### Node.js

Node 12 or greater. Usage of [nvm](https://github.com/nvm-sh/nvm) is recommended.

```bash
nvm use
```

### Amplify CLI

```bash
npm install --global @aws-amplify/cli@latest
```

### Git LFS

Videos are stored on Git LFS. In order to seed videos, [install Git LFS](https://git-lfs.github.com/). Then pull large files:

```bash
git lfs pull
```

### CLI

The Claptime CLI will be installed along with this package.

```bash
npm ci
claptime --help
```

## Set parameters

```bash
STAGE=staging
REGION=eu-west-1

aws ssm --region $REGION put-parameter --overwrite --name /$STAGE/slack-webhook --type String --value "[VALUE]"
```

### Create and setup a new environment

```bash
STAGE=mystage
cd web
amplify init
? Do you want to use an existing environment? No
? Enter a name for the environment $STAGE
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default

git checkout -B $STAGE
git add amplify/team-provider-info.json
git commit -m "adding new env"
# about 5 minutes
amplify push
? Are you sure you want to continue? Yes
? Do you want to update code for your updated GraphQL API Yes
? Do you want to generate GraphQL statements (queries, mutations and subscription) based on your schema types?
This will overwrite your current graphql queries, mutations and subscriptions Yes

claptime deploy:all

claptime setup-env
claptime seed:all
claptime seed:videos

npm run dev
# go to localhost:3000
```

### Lint

```bash
npm run lint
```
