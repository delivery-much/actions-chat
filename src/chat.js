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

  if (github.context.eventName === 'pull_request') {
    const body = openedPullRequest(
      github.context.repo,
      github.context.payload.pull_request.title,
      github.context.actor,
      github.context.payload.pull_request.html_url
    )

    try {
      await axiosInstance.post(url, body)
    } catch (error) {
      throw new Error(`Google Chat notification failed. Error:\n  ${error}}`)
    }
  } else {
    throw new Error('Sorry, we don\'t accept this event type yet.')
  }
}

module.exports = { send }
