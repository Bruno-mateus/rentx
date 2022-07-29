import { container } from "tsyringe";
import { DayjsDateProvider } from '../provider/dateProvider/implementations/DayjsDateProvider'
import { IDateProvider } from "./IDateProvider";
import { IMailProvider } from "./emailProvider/IMailProvider";
import { EtherealMailProvider } from "./emailProvider/implementations/EtherealMailProvider";
container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
)
// usamos o registerInstance porque o EtherealMalProvider precisa ser injetado assim que o app é iniciado
container.registerInstance<IMailProvider>(
  "EtherealMalProvider",
  new EtherealMailProvider()
)