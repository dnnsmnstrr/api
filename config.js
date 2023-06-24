////////////////
// API CONFIG //
////////////////

// Personal Info
const FIRST_NAME = 'Dennis'
const LAST_NAME = 'Muensterer'
const FULL_NAME = [FIRST_NAME, LAST_NAME].join(' ')
const USERNAME = 'dennismuensterer'
const USERNAME_SHORT = USERNAME.replace(/[aeiou]/ig, '')
const BIRTHDATE = '1997-06-16' //YYYY-MM-DD
const EMAIL = USERNAME + '@gmail.com'
const ALTERNATE_EMAILS = ['aol.com', 'icloud.com', 'dm@hpm.agency']

// Domain
const SECOND_LEVEL_DOMAIN = 'muensterer'
const TOP_LEVEL_DOMAIN = 'lol'
const DEFAULT_URL = 'https://' + DOMAIN_NAME + '.' + DOMAIN_EXTENSION
const API_URL = `https://${USERNAME_SHORT}.vercel.app`

export {
  API_URL,
  DEFAULT_URL,
  FULL_NAME,
  BIRTHDATE,
  EMAIL,
  USERNAME,
  USERNAME_SHORT,
  FIRST_NAME,
  LAST_NAME,
  ALTERNATE_EMAILS
}
