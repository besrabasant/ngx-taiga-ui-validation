import {Inject, Pipe, PipeTransform} from "@angular/core";
import {FORM_VALIDATION_ERRORS} from "./injection-tokens";

@Pipe({
  name: "errorMessagePipe",
  pure: false
})
export class DefaultMessagePipe implements PipeTransform {
  constructor(
    @Inject(FORM_VALIDATION_ERRORS)
    private errors: any
  ) {
  }

  transform(value: any, ...args: any): any {
    return this.errors[value]
  }
}
