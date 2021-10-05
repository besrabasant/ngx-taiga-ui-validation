import {Inject, Injectable} from "@angular/core";
import {MESSAGES_PIPE_TRANSFORM} from "./injection-tokens";

@Injectable()
export class ErrorMessagesProviderService {
  constructor(
    @Inject(MESSAGES_PIPE_TRANSFORM)
    private messagePipe: any
  ) {
  }

  get(key: string, ...args: any[]): any {
    return this.messagePipe.transform(key, ...args)
  }
}
