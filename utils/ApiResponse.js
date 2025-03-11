class ApiResponse {
    constructor(statusCode, data, message = "Success") {
      this.statusCode = statusCode;
      this.message = message; // Fixed typo
      this.data = data;
      this.success = statusCode < 400; // Automatically set success flag
    }
  }
  
  module.exports = ApiResponse; // Ensure correct export
  