export interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
  compareInDay(startDay: Date, endDay: Date): number
  addDay(days: number): Date
  addHour(hour: number): Date
  compareIfBefore(start_date: Date, end_date: Date): Boolean
}