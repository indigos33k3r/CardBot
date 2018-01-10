/**
 * Error thrower
 * @constructor
 * @param {string} err - The error to be thrown
 */
class Error {
  constructor(err) {
    return throw err;
  }
}

module.exports = Error
