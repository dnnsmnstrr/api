import {
  DEFAULT_URL,
  BIRTHDATE,
  EMAIL,
  USERNAME,
  USERNAME_SHORT,
  FIRST_NAME,
  LAST_NAME,
  FULL_NAME
} from '../../config'

/**
 * @swagger
 * /api/dennis:
 *   get:
 *     description: Returns information about dennis
 *     responses:
 *       200:
 *         description: information was found
 */
export default (req, res) => {
  res.statusCode = 200
  res.json({
    name: FULL_NAME,
    birthdate: BIRTHDATE,
    homepage: DEFAULT_URL,
    username: USERNAME,
    email: EMAIL,
  })
}
