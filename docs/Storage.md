# 💾 Data storage

## Regular file storage

The `claptime-storage-{STAGE}` bucket (managed by Amplify) offers multiple access levels. Here are the files currently stored in this bucket:

- `public/`
  - `collections/{collectionId}`
    - `original.{ext}`
    - `1500-300.jpg`
  - `news/{newsId}`
    - `original.{ext}`
    - `1500-500.jpg`
  - `profiles/{profileId}`
    - `original.{ext}`
    - `512-512.jpg`
  - `videoNodes/{videoId}/`
    - `original.{ext}`
    - `600-800-300.jpg`
- `protected/{userIdentityId}/` Used to upload images before resizing
- `private/{userIdentityId}/` Used to upload videos before processing
  - `{videoId}.{ext}`

## Video streaming

When a filmmaker uploads a video (for instance a MP4), it arrives in the `storage` bucket. This triggers the `uploader` task from the [videos service](../services/videos) which will download this video and prepare it for streaming, by chunking it and making it available in multiple resolutions. All the resulting files will be uploaded in a second S3 bucket, the `claptime-videos-{STAGE}` bucket, in which files are being served by a CloudFront CDN.
