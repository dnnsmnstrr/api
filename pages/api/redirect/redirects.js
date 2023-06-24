import getSocial from '../social/getSocial'
import getPlaylist from '../playlist/getPlaylist'
import {
  API_URL,
  DEFAULT_URL,
  USERNAME,
  USERNAME_SHORT,
  EMAIL
} from '../../../config'

// no url means the redirect will be built out of the default url and the name
// name: the main string to match a redirect to
// description?: short text about where this will link or what this will do
// url?: a relative path or full url to a different website
// aliases?: an array of additional strings to match a redirect to (can also include emoji)
const redirects = [
  {
    name: 'homepage',
    description: 'My Homepage, hosted on GitHub Pages',
    url: DEFAULT_URL, //required to override default behaviour
    aliases: ['home', 'main', 'root', 'landing', '🏠']
  },
  {
    name: 'contact',
    description: 'Send me an email',
    url: 'mailto:' + EMAIL,
    aliases: ['email', 'message', 'mail', '📧']
  },
  {
    name: 'github',
    url: 'https://www.github.com/' + USERNAME_SHORT,
    aliases: ['g', 'gh', 'git', 'hub', 'code', 'repo', 'hack', '🤖']
  },
  {
    name: 'gitlab',
    url: 'https://www.gitlab.com/' + USERNAME_SHORT,
    aliases: ['gl', 'lab', '🦊']
  },
  {
    name: 'spotify',
    description: 'Music is life!',
    url: 'https://open.spotify.com/user/' + USERNAME,
    aliases: ['s', 'sp', 'spot', 'music', '🎵', '🎧']
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/' + USERNAME_SHORT,
    aliases: ['i', 'ig', 'insta', 'gram', 'nofilter', 'pictures', 'photos', 'stories', '📷']
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/' + USERNAME_SHORT,
    aliases: ['t', 'tw', 'tweet', 'tweets', 'hashtag', '🐦']
  },
  {
    name: 'mastodon',
    url: 'https://mastodon.social/@' + USERNAME_SHORT,
    description: 'twitter alternative',
    aliases: ['mast', 'tröt', 'fediverse', 'toot', '🦣']
  },
  {
    name: 'facebook',
    url: 'https://facebook.com/' + USERNAME,
    aliases: ['f', 'fb', 'book', 'gesichtsbuch', 'meta']
  },
  {
    name: 'reddit',
    url: 'https://www.reddit.com/user/themissing_link',
    aliases: ['r', 'readit', 'neckbeard', '👽']
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/' + USERNAME,
    aliases: ['l', 'in', 'linked', 'jobs', '🧑‍💼', '💼']
  },
  {
    name: 'paypal',
    url: 'https://www.paypal.com/paypalme/' + USERNAME,
    aliases: ['p', 'pp', 'pay', 'donate', 'sendmoney', 'wheremymoneyat', '💰', '💸', '🫰']
  },
  {
    name: 'youtube',
    url: 'https://www.youtube.com/user/' + USERNAME,
    aliases: ['y', 'yt', 'tube', 'videos', 'watch', '📹', '📺']
  },
  {
    name: 'zettelkasten',
    aliases: ['z', 'n', 'zk', 'zettel', 'notes', 'slipbox', 'knowlege', '📔', '📓', '🗃️']
  },
  {
    name: 'now',
    description: 'A page with information about what I\'m up to at the moment',
    aliases: ['currently', 'atm', 'doing', 'update'],
    url: 'zettelkasten/now'
  }, 
  {
    name: 'dendron',
    description: 'An alternate deployment of my notes, using dendron',
    url: `https://${USERNAME_SHORT}.gitlab.io/zettelkasten`
  },
  {
    name: 'flowershow',
    description: 'Yet another zettelkasten deployment',
    url: 'https://zettelkasten-flowershow.vercel.app',
    aliases: ['flower', 'flowerpower', '💐']
  },
  {
    name: 'dotfiles',
    aliases: ['d', 'df', 'setup', 'dot', 'config', '⚙️']
  },
  {
    name: 'making',
    url: 'https://www.tiktok.com/@dennis.makerer',
    aliases: ['makerer', 'make', 'maker', 'makermonday', '🛠️']
  },
  {
    name: 'tiktok',
    url: `https://www.tiktok.com/@${USERNAME_SHORT}`,
    aliases: ['tt', 'spyware', '🇨🇳']
  },
  {
    name: 'ToolShare',
    aliases: ['tool', 'tools', 'toolshare', '🧰']
  },
  {
    name: 'universe',
    url: `https://${USERNAME_SHORT}.univer.se`,
    aliases: ['dennis', '🌌']
  },
  {
    name: 'yat',
    url: 'https://y.at/robot.laptop.phone.watch.headphone',
    aliases: ['emoji', '🤖💻📱⌚🎧']
  },
  {
    name: 'felix',
    description: 'my brother\'s website',
    url: 'https://fm-branding.de/',
    aliases: ['fdp', 'lindner-junior', 'dumbass', '🤑']
  },
  {
    name: 'lancemax',
    url: 'https://lancemax.com/',
    aliases: ['lance', 'lm']
  },
  {
    name: 'wishlist',
    url: 'https://www.amazon.de/hz/wishlist/ls/1Y2URDXEYY1JO',
    aliases: ['wish', 'gift', 'birthday', '🎂', '🎁']
  },
  {
    name: 'kickstarter',
    url: 'https://www.kickstarter.com/profile/' + USERNAME,
    aliases: ['ks', 'crowdfunding', 'backed']
  },
  {
    name: 'imdb',
    url: 'https://www.imdb.com/user/ur31201407',
    aliases: ['movies', 'ratings', 'watchlist', '🎥', '🎬', '🍿']
  },
  {
    name: 'steam',
    url: 'https://steamcommunity.com/id/' + USERNAME_SHORT,
    aliases: ['gaming', 'play', 'zocken', '🎮', '👾']
  },
  {
    name: 'humblekeys',
    aliases: ['humble', 'keys', 'games', 'freegames', '🕹️', '🔑']
  },
  {
    name: 'slides',
    url: 'https://slides.com/' + USERNAME,
    aliases: ['presentation', 'slide', 'present', '📈', '🪧']
  },
  { name: 'uses', description: 'a list of tech I use', url: 'zettelkasten/uses' }, // https://uses.tech/
  {
    name: 'stack',
    description: 'A list of tools and devices I use',
    url: 'https://stackshare.io/' + USERNAME_SHORT + '/my-stack',
    aliases: ['mystack', 'techstack']
  },
  {
    name: 'work',
    description: 'The website of the company I currently work at',
    url: 'https://hpm.agency',
    aliases: ['hpm', 'agency', '🏢']
  },
  {
    name: 'tesora',
    description: 'an app I helped build',
    aliases: ['tes', '💎'],
    url: 'https://tesora.app/'
  },
  {
    name: 'voteos',
    description: 'a blockchain voting platform',
    url: 'https://voteos.com',
    aliases: ['voe', 'vote', '🗳️']
  },
  {
    name: 'telegram',
    url: 'https://t.me/' + USERNAME_SHORT,
    aliases: ['tg', 'tele', '📠', '💬']
  },
  {
    name: 'it-talents',
    description: 'an interview about a scholarship I received',
    url: 'https://it-talents.de/partnerunternehmen/dennis-erhaelt-ein-it-stipendium/',
    aliases: ['stipendium', 'interview', 'scholarship', '📰']
  },
  {
    name: 'stickers',
    description: 'my telegram sticker pack',
    url: 'https://t.me/addstickers/memesterer'
  },
  {
    name: 'grepper',
    url: 'https://www.codegrepper.com/profile/dennis-muensterer',
    aliases: ['codegrepper', 'snippets']
  },
  { name: 'lebenslauf', aliases: ['cv'] },
  { name: 'readcv', url: 'https://read.cv/' + USERNAME_SHORT }, 
  { name: 'life', aliases: ['timeline', '📅'] },
  { name: 'help', aliases: ['?', 'available', 'urls', 'list', '🆘', '❔', '❓'] },
  { name: 'statsfm', url: 'https://stats.fm/' + USERNAME, aliases: ['spotistats', '📊'] },
  { name: 'resume', url: 'https://registry.jsonresume.org/' + USERNAME_SHORT, aliases: ['jsonresume'] },
  { name: 'github-resume', url: 'https://resume.github.io/?' + USERNAME_SHORT },
  { name: 'masks', url: 'https://t.me/addstickers/maskerer' },
  { name: 'discord', url: 'https://discord.gg/CrB72mXEzN' },
  { name: 'google', url: 'https://www.google.com/search?q=Dennis+Muensterer' },
  { name: 'status', url: 'https://muensterer.betteruptime.com', aliases: ['monitor', 'betteruptime', '✅'] },
  { name: 'uptime', aliases: ['up', 'upptime']},
  { name: 'api', description: 'my personal API page', url: API_URL },
  { name: 'information', url: API_URL + '/api/dennis', description: 'information about me in JSON format', aliases: ['info', 'stats', 'personal-data', 'ℹ️', 'ℹ'] },
  { name: 'playlists', url: 'universe/playlists' }, //extend existing redirects
  { name: 'shuffle', url: 'random', aliases: ['feelinglucky', '🔀', '🎲']},
  { name: 'insult', url: 'contact?Subject=Fuck%20You%21', aliases: ['hate', 'fu', '🖕', 'haters-gonna-hate'] }, //add query params
  { name: 'edit', url: 'github/dnnsmnstrr.github.io', aliases: ['✏️', '🖊️'] }, //shortcut to website repo
  { name: 'edit-redirects', url: 'github/api/edit/master/pages/api/redirect/redirects.js', aliases: ['↪️', '↩️', '🔃'] }, //link to these redirects
]

const getRedirect = async (route = [], {noReturn, ...restParams} = {}) => {
  const [ query, ...restRoute] = route
  let redirect
  console.log('query', query)
  switch (query) {
    case 'redirect':
    case 'help':
      redirect = { url: API_URL + '/redirects' }
      console.log('redirect', redirect)
      break
    case 'random':
      redirect = redirects[Math.floor(Math.random() * redirects.length)]
      break
    case 'social':
      if (restRoute[0]){
        const social = await getSocial(restRoute[0])
        if (typeof(social) === 'string') {
          return social
        }
      }
      break
    case 'playlist':
      if (restRoute[0]){
        const playlist = await getPlaylist(restRoute[0])
        if (playlist) return playlist
      }
      break
    default:
      // search for redirect
      redirect = redirects.find(({name = '', aliases = [], url}) => {
        if (!name) {
          console.log('missing name for', url, aliases)
          return false
        }
        return name === query.toLowerCase() || aliases.includes(query)
      })
      if (!redirect) {
        try {
          const url = await getSocial(query)
          redirect = {url}
        } catch (e) {
          console.log(e)
        }
      }
  }

  return getRedirectURL(redirect, {query, route: restRoute, ...restParams})
}

const getRedirectURL = ({url, name}, {route = [], query, noReturn, ...params} = {}) => {
  const rebuildParams = (params) => {
    const paramList = Object.keys(params).map((param, index) => `${index === 0 ? '?' : '&'}${param}=${params[param]}`)
    return paramList.join('')
  }
  let path = rebuildParams(params)
  if (route && route.length) {
    path = route.reduce((previous, current) => previous + '/' + current, '') + path
  }
  if (url) {
    path = `${url}${path}`
  } else if (name) {
    path = `${DEFAULT_URL}/${name}${path}`
  } else {
    // a failed redirect will end up back here, therefore the 'noReturn' parameter is used to avoid endless loops on redirect attempts
    path = `${DEFAULT_URL}/${!noReturn ? query : ''}`
  }
  return path
}

export default function handler(req, res) {
  const { slug } = req.query
  const sortedRedirects = redirects.sort((a, b) => a.name.localeCompare(b.name))

  res.json(sortedRedirects)
}

export { redirects, getRedirect, getRedirectURL }
