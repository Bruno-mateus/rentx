
export default class AppError {
  public readonly message: string
  public readonly statusCode: number
  //message type and default error status
  constructor(message: string, status = 400) {
    this.message = message
    this.statusCode = status
  }
}