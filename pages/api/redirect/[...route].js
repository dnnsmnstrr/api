import { getRedirect } from './redirects'

export default async (req, res) => {
  try {
    const { query: { route, ...params } } = req
    const Location = await getRedirect(route, params)
    res.writeHead(307, { Location } )
    res.end()
  } catch (err) {
    console.log('redirect failed: ', err)
  }
}
