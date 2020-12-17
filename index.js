const core = require('@actions/core')
const chat = require('./src/chat')

// Run Action.
const run = async () => {
  try {
    const url = core.getInput('url', { required: true })
    const dailyOrder = core.getInput('daily_order')

    dailyOrder
      ? await chat.handleDaily(url, dailyOrder)
      : await chat.handleGitHubEvents(url)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
