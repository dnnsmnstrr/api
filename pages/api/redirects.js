import { redirects, getRedirectURL } from './redirect/redirects'

export default function handler(req, res) {
  const { slug } = req.query
  const sortedRedirects = redirects.sort((a, b) => a.name.localeCompare(b.name))
  const buildList = () => {
    const listItems = sortedRedirects.map((redirect) => (
      `<li><a href="${getRedirectURL(redirect)}" title="${redirect.aliases && redirect.aliases.length ? 'Aliases: ' + redirect.aliases.join(', ') : 'No Aliases'}" >${redirect.name}</a></li>`
    ))
    return listItems.join('')
  }

  const body = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Redirects</title>
    </head>
    <body>
      <h1>Available Redirects</h1>
      <ul>
        ${buildList()}
      </ul>
    </body>
</html>`

  res.send(body)
}
