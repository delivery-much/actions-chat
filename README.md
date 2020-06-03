# @delivery-much/actions-chat

This Action send Google Chat messages.

## Inputs

### `url`

**Required** Your Google Chat Webhook URL. You can find it in "Configure Webhooks" option in Chat rooms.

## Example usage

```yaml
uses: delivery-much/actions-chat@v1
with:
  url: ${{ secrets.GOOGLE_CHAT_WEBHOOK_URL }}
```
