# @delivery-much/actions-chat

Messages are sent by [chat.js](src/chat.js) and defined in [messages.js](src/messages.js).

We use Axios as HTTP client and the basic instance is defined in [axios.js](src/axios.js).

## Supported messages

- New pull request
- New release

## Inputs

### `url`

**Required** Your Google Chat Webhook URL. You can find it in "Configure Webhooks" option in Chat rooms.

## Example usage

```yaml
uses: delivery-much/actions-chat@v1
with:
  url: ${{ secrets.GOOGLE_CHAT_WEBHOOK_URL }}
```
