import dayjs from "dayjs";
import { IDateProvider } from "../../IDateProvider";
import utc from 'dayjs/plugin/utc'

//use local UTC to compare dates
dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {

  dateNow() {
    return dayjs().toDate()
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }
  compareInHours(startDate: Date, endDate: Date): number {
    //convert return date in UTC
    const startDateUTC = this.convertToUTC(startDate)
    const endDateUTC = this.convertToUTC(endDate)

    return dayjs(endDateUTC).diff(startDateUTC, 'hours')
  }
  compareInDay(startDay: Date, endDay: Date): number {
    //convert return date in UTC
    const startDateUTC = this.convertToUTC(startDay)
    const endDateUTC = this.convertToUTC(endDay)

    return dayjs(endDateUTC).diff(startDateUTC, 'days')
  }
}