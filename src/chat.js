const github = require('@actions/github')
const { post } = require('./axios')
const { newPullRequest, newRelease } = require('./messages')

/**
 * Sends Google Chat message.
 *
 * @param {string} url - Google Chat Webhook URL
 */
const send = async (url) => {
  switch (github.context.eventName) {
    case 'pull_request': {
      await handlePullRequest(url)
      break
    }
    case 'release': {
      await handleRelease(url)
      break
    }
    default:
      throw new Error('Sorry, we don\'t accept this event type yet.')
  }
}

const handlePullRequest = async (url) => {
  if (!github.context.payload.pull_request.draft) {
    const { repo } = github.context.repo
    const { title } = github.context.payload.pull_request
    const { actor: author } = github.context
    const { html_url: htmlUrl } = github.context.payload.pull_request

    const body = newPullRequest(repo, title, author, htmlUrl)
    await post(url, body)
  }
}

const handleRelease = async (url) => {
  const { repo } = github.context.repo
  const { tag_name: tag } = github.context.payload.release
  const { actor: author } = github.context
  const { html_url: htmlUrl } = github.context.payload.release

  const body = newRelease(repo, tag, author, htmlUrl)
  await post(url, body)
}

module.exports = { send }
