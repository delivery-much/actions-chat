/**
 * Build body of Google Chat card for dailies.
 *
 * @param {string} dailyOrder - Daily order
 *
 * @returns {object} Google Chat card body
 */
const newDaily = (dailyOrder) => {
  const body = {
    cards: [
      {
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  contentMultiline: true,
                  content: dailyOrder
                }
              }
            ]
          }
        ]
      }
    ]
  }
  return body
}

module.exports = { newDaily }
