const github = require('@actions/github')
const { newAxios } = require('./axios')
const { openedPullRequest } = require('./messages')

/**
 * Send Google Chat message.
 *
 * @param {string} url - Google Chat Webhook URL
 */
const send = async (url) => {
  const axiosInstance = newAxios(url)

  switch (github.context.eventName) {
    case 'pull_request': {
      const body = openedPullRequest(
        github.context.repo,
        github.context.payload.pull_request.title,
        github.context.actor,
        github.context.payload.pull_request.html_url
      )
      const response = await axiosInstance.post(url, body)
      if (response.status !== 200) throw new Error(`Google Chat notification failed. response status=${response.status}`)
      break
    }
    default:
      throw new Error('Sorry, we don\'t accept this event type yet.')
  }
}

module.exports = { send }
