import { Response } from "express";

const handleError = (err: any, res: Response) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};

class ErrorHandler extends Error {
  private statusCode: number; 

  constructor(statusCode: number, message: string) {
    super();
    console.error('Error', statusCode, message)
    this.statusCode = statusCode;
    this.message = message;
  }
}
  
module.exports = {
  ErrorHandler,
  handleError
}