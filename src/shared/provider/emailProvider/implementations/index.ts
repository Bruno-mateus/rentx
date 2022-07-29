import { container } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import { EtherealMailProvider } from "./EtherealMailProvider";


container.registerSingleton<IMailProvider>(
  "EtherealMalProvider",
  EtherealMailProvider
)