const github = require('@actions/github')
const { newAxios } = require('./axios')
const { newPullRequest, newRelease } = require('./messages')

/**
 * Sends Google Chat message.
 *
 * @param {string} url - Google Chat Webhook URL
 */
const send = async (url) => {
  switch (github.context.eventName) {
    case 'pull_request': {
      const { repo } = github.context.repo
      const { title } = github.context.payload.pull_request
      const { actor: author } = github.context
      const { html_url: htmlUrl } = github.context.payload.pull_request

      const body = newPullRequest(repo, title, author, htmlUrl)
      await post(url, body)
      break
    }
    case 'release': {
      const { repo } = github.context.repo
      const { tag_name: tag } = github.context.payload.release
      const { actor: author } = github.context
      const { html_url: htmlUrl } = github.context.payload.release

      const body = newRelease(repo, tag, author, htmlUrl)
      await post(url, body)
      break
    }
    default:
      throw new Error('Sorry, we don\'t accept this event type yet.')
  }
}

/**
 * Does a HTTP POST with Axios.
 *
 * @param {string} url - POST URL
 * @param {object} body - POST body
 */
const post = async (url, body) => {
  const axiosInstance = newAxios(url)
  try {
    await axiosInstance.post(url, body)
  } catch (error) {
    throw new Error(`Google Chat notification failed. ${error}}`)
  }
}

module.exports = { send }
