import { container } from "tsyringe";
import { DayjsDateProvider } from '../provider/dateProvider/implementations/DayjsDateProvider'
import { IDateProvider } from "./IDateProvider";

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
)