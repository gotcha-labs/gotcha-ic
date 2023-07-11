class APIError extends Error {
    constructor(message, statusCode) {
      super()
      console.log({message})
      console.log({statusCode})
      this.message = message
      this.statusCode = statusCode ?? 500
    }
  }
  
  module.exports = APIError
  