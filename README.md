# @delivery-much/actions-chat

Messages are sent by [chat.js](src/chat.js) and defined in [messages.js](src/messages.js).

We use Axios as HTTP client and the basic instance is defined in [axios.js](src/axios.js).

## Supported messages

- [New pull request](#new-pull-request)
- [New release](#new-release)

## Inputs

### `url`

**Required** Your Google Chat Webhook URL. You can find it in "Configure Webhooks" option in Chat rooms.

## Example workflows

### New pull request

- Create a file `chat-pull-request.yml` in `.github/workflows/` directory with the following content:

```yaml
name: chat-pull-request 
on:
  pull_request:
    types: [opened, reopened]
jobs:
  chat:
    runs-on: ubuntu-latest
    steps:
      - uses: delivery-much/actions-chat@v1
        with:
          url: ${{ secrets.GOOGLE_CHAT_PULL_REQUEST_WEBHOOK_URL }}
```

### New release

- Create a file `chat-release.yml` in `.github/workflows/` directory with the following content:

```yaml
name: chat-release
on:
  release:
    types: [created]
jobs:
  chat:
    runs-on: ubuntu-latest
    steps:
      - uses: delivery-much/actions-chat@v1
        with:
          url: ${{ secrets.GOOGLE_CHAT_RELEASE_WEBHOOK_URL }}
```
