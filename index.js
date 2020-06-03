const core = require('@actions/core')
const chat = require('./src/chat')

// Run Action.
const run = async () => {
  try {
    const url = core.getInput('url', { required: true })
    await chat.send(url)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
