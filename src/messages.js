/**
 * Build body of Google Chat card for opened Pull Requests.
 *
 * @param {string} url - Google Chat Webhook URL
 */
const openedPullRequest = (repo, title, author, htmlUrl) => {
  const body = {
    cards: [
      {
        header: {
          title: 'New Pull Request',
          imageUrl: 'https://vectorified.com/images/git-icon-4.png'
        },
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Repository',
                  content: repo
                }
              },
              {
                keyValue: {
                  topLabel: 'Title',
                  content: title
                }
              },
              {
                keyValue: {
                  topLabel: 'Author',
                  content: author
                }
              }
            ]
          },
          {
            widgets: [
              {
                buttons: [
                  {
                    textButton: {
                      text: 'OPEN',
                      onClick: {
                        openLink: {
                          url: htmlUrl
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  return body
}

module.exports = { openedPullRequest }
