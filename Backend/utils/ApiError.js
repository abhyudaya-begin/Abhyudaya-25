class ApiError extends Error {
    constructor(statuscode, message = "Something went wrong") {
      super(message); // Call parent constructor to set message
      this.statuscode = statuscode;
      this.success = false;
  
      // Assign message explicitly to avoid conflicts with Error class
      this.errorMessage = message;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = { ApiError };
  