export interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
  compareInDay(startDay: Date, endDay: Date): number
}