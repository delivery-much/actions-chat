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
      const { repo } = github.context.repo
      const title = github.context.payload.pull_request.title
      const author = github.context.actor
      const htmlUrl = github.context.payload.pull_request.html_url

      const body = openedPullRequest(repo, title, author, htmlUrl)
      await post(axiosInstance, url, body)
      break
    }
    default:
      throw new Error('Sorry, we don\'t accept this event type yet.')
  }
}

/**
 * Do a HTTP POST with Axios.
 *
 * @param {AxiosInstance} axiosInstance - Axios instance
 * @param {string} url - POST URL
 * @param {object} body - POST body
 */
const post = async (axiosInstance, url, body) => {
  try {
    await axiosInstance.post(url, body)
  } catch (error) {
    throw new Error(`Google Chat notification failed. ${error}}`)
  }
}

module.exports = { send }
