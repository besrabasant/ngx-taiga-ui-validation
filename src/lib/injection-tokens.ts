import {InjectionToken} from "@angular/core";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";

export const VALIDATION_ERROR_CONFIG = new InjectionToken("Validation Error Config")
export const VALIDATION_ERROR_CONFIG_PARAMS = new InjectionToken("Validation Error Config Params")

export const FORM_VALIDATION_ERRORS = new InjectionToken<Record<string, PolymorpheusContent>>('Form Validation Errors', {
  factory: () => ({})
})

export const ERROR_MESSAGES_PROVIDER = new InjectionToken('Error Messages Provider');
export const MESSAGES_PIPE_TRANSFORM = new InjectionToken('Error Messages Pipe Transform');
