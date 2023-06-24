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

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    var isBirthDayAfterToday = m < 0 || (m === 0 && today.getDate() < birthDate.getDate())
    if (isBirthDayAfterToday) age--;
    return age;
}
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
    age: getAge(BIRTHDATE),
    homepage: DEFAULT_URL,
    username: USERNAME,
    email: EMAIL,
  })
}
