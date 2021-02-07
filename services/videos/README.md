# videos

See [here](../README.md) for general behaviour.

## Build and deploy docker image

### Pre-requisites

- Install [docker](https://www.docker.com/)
- Install [jq](https://stedolan.github.io/jq/)

### Install

- Run `npm install`
- Set environment variables:

```bash
$ STAGE=staging
$ REGION=eu-west-1
```

## Set parameters

```bash
$ STAGE=staging
$ REGION=eu-west-1

$ aws ssm --region $REGION put-parameter --overwrite --name /$STAGE/slack-webhook --type String --value "[VALUE]"
```

### Build

```bash
$ REPO_NAME=`aws --region $REGION ecr describe-repositories | jq -r ".repositories[] | select ( .repositoryName == \"claptime-videos-$STAGE\") | .repositoryUri"`
$ docker build . -t $REPO_NAME\:claptime-videos
```

### Publish

```bash
$ aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin `aws sts get-caller-identity --query Account --output text`.dkr.ecr.$REGION.amazonaws.com
$ docker push $REPO_NAME\:claptime-videos
```

### Run locally

1. Ensure you filled your `.env` file (copy and fill `.env.template` file)
2. Start the container

```bash
$ docker run --env-file .env -it --rm $REPO_NAME\:claptime-videos bash
bash-4.2#
```

3. Run the tasks

```bash
# uploader
$ node uploader.js --bucket-name claptime-storage-staging --key SampleVideo_1280x720_30mb2.mkv --id a6722d52-00a1-4039-905c-ebcbf7489b4b
# importer
$ node importer.js --video-node-id 8262089a-f08d-4ad4-9e90-81d9c83fe282 --video-link https://www.youtube.com/watch\?v\=ILmuqWCe2Yc --username 1055373a-1da4-49ee-b6c7-051a34e8cd16
```

### Clean dangling images

```bash
$ docker rmi `docker images -f dangling=true -q`
```

## TODO

- Ensure CPU/RAM config is working well
- Find a way to vendor and use `claptime-commons` from within the docker (for now S3 functions are copied)
- API: when pipeline resolvers will be supported, returned VideoNode should be fetched by AppSync itself. https://github.com/aws-amplify/amplify-cli/issues/1055
