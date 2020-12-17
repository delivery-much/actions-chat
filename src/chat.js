const github = require('@actions/github')
const { newAxios } = require('./axios')
const { newPullRequest } = require('./messages/pull-request')
const { newRelease } = require('./messages/release')
const { newDaily } = require('./messages/daily')

/**
 * Handle GitHub events context.
 *
 * @param {string} url - Google Chat Webhook URL
 */
const handleGitHubEvents = async (url) => {
  const axiosInstance = newAxios(url)

  switch (github.context.eventName) {
    case 'pull_request': {
      const { repo } = github.context.repo
      const title = github.context.payload.pull_request.title
      const author = github.context.actor
      const htmlUrl = github.context.payload.pull_request.html_url

      const body = newPullRequest(repo, title, author, htmlUrl)
      await send(axiosInstance, url, body)
      break
    }
    case 'release': {
      const { repo } = github.context.repo
      const tag = github.context.payload.release.tag_name
      const author = github.context.actor
      const htmlUrl = github.context.payload.release.html_url

      const body = newRelease(repo, tag, author, htmlUrl)
      await send(axiosInstance, url, body)
      break
    }
    default:
      throw new Error('Sorry, we don\'t accept this event type yet.')
  }
}

/**
 * Handle daily context.
 *
 * @param {string} url - Google Chat Webhook URL
 * @param {string} order - Daily order
 */
const handleDaily = async (url, order) => {
  const axiosInstance = newAxios(url)
  const body = newDaily(order)
  await send(axiosInstance, url, body)
}

/**
 * Send Google Chat message.
 *
 * @param {AxiosInstance} axiosInstance - Axios instance
 * @param {string} url - POST URL
 * @param {object} body - POST body
 */
const send = async (axiosInstance, url, body) => {
  try {
    await axiosInstance.post(url, body)
  } catch (error) {
    throw new Error(`Google Chat notification failed. ${error}}`)
  }
}

module.exports = { handleGitHubEvents, handleDaily }
