# Video status

The following flow chart can be previewd in Visual Studio Code using the [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) extension.

```mermaid
graph TB
  Start(( )) --> UploadStatus[UPLOAD]
  UploadStatus --> UploadTask{Upload}
  UploadTask -->|Succeed| ProcessingStatus[PROCESSING]

  Start(( )) --> ImportStatus[IMPORT]
  ImportStatus --> ImportTask{Import}
  ImportTask -->|Succeed| ProcessingStatus[PROCESSING]

  ProcessingStatus --> ProcessTask{Process}
  ProcessTask -->|Failed| ProcessingFailedStatus[PROCESSING FAILED]
  ProcessingFailedStatus --> End
  ProcessTask -->|Succeed| DraftStatus[DRAFT]
  DraftStatus --> PublishTask{Publish}
  PublishTask --> |Approved| PublishedStatus[PUBLISHED]
  PublishedStatus --> End
```

At any time, the user can also delete the video which immediately deletes it from our database.

## Available actions depending on status

|                   | Save | Publish | Unpublish | Delete | View | Upload |
| ----------------: | :--: | :-----: | :-------: | :----: | :--: | :----: |
|            IMPORT |  ✓   |         |           |   ✓    |      |        |
|            UPLOAD |  ✓   |         |           |   ✓    |      |   ✓    |
|        PROCESSING |  ✓   |         |           |   ✓    |      |        |
| PROCESSING_FAILED |  ✓   |         |           |   ✓    |      |   ✓    |
|             DRAFT |  ✓   |    ✓    |           |   ✓    |  ✓   |        |
|         PUBLISHED |  ✓   |         |     ✓     |        |  ✓   |        |

## Required fields to do actions

|         | Title | Description | Category | Release year | Cover | Credits |
| ------- | :---: | :---------: | :------: | :----------: | :---: | :-----: |
| Save    |   ✓   |             |          |              |       |         |
| Publish |   ✓   |      ✓      |    ✓     |      ✓       |   ✓   |         |
