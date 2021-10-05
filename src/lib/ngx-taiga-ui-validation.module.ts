import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiErrorModule} from '@taiga-ui/core';
import {FieldErrorComponent} from './field-error/field-error.component';
import {ValidationContextDirective} from "./validation-context.directive";
import {
  ERROR_MESSAGES_PROVIDER,
  FORM_VALIDATION_ERRORS,
  MESSAGES_PIPE_TRANSFORM,
  VALIDATION_ERROR_CONFIG, VALIDATION_ERROR_CONFIG_PARAMS
} from "./injection-tokens";
import {ErrorMessagesProviderService} from "./error-messages-provider.service";
import {DefaultMessagePipe} from "./default-message.pipe";
import {DefaultConfig, ValidationErrorConfig, ValidationErrorConfigParams} from "./validation-error.config";
import {UseFieldContextDirective} from "./use-field-context.directive";

@NgModule({
  imports: [
    CommonModule,
    TuiErrorModule
  ],
  declarations: [
    ValidationContextDirective,
    UseFieldContextDirective,
    FieldErrorComponent,
    DefaultMessagePipe
  ],
  exports: [
    ValidationContextDirective,
    UseFieldContextDirective,
    FieldErrorComponent,
    TuiErrorModule
  ],
})
export class NgxTaigaUiValidationModule {
  public static forRoot(errorsConfig: ValidationErrorConfigParams = {}) {
    return {
      ngModule: NgxTaigaUiValidationModule,
      providers: [
        {
          provide: DefaultConfig,
          useValue: DefaultConfig
        },
        {
          provide: VALIDATION_ERROR_CONFIG_PARAMS,
          useValue: errorsConfig,
        },
        {
          provide: VALIDATION_ERROR_CONFIG,
          useFactory: function (defaultConfig: ValidationErrorConfig, errorsConfig: ValidationErrorConfigParams) {
            return {...defaultConfig, ...errorsConfig}
          },
          deps: [DefaultConfig, VALIDATION_ERROR_CONFIG_PARAMS]
        },
        {
          provide: MESSAGES_PIPE_TRANSFORM,
          useClass: DefaultMessagePipe
        },
        {
          provide: ERROR_MESSAGES_PROVIDER,
          useClass: ErrorMessagesProviderService,
          deps: [MESSAGES_PIPE_TRANSFORM]
        },
        {
          provide: FORM_VALIDATION_ERRORS,
          useValue: {}
        }
      ]
    }
  }

  public static forChild(errorsConfig: ValidationErrorConfigParams = {}) {
    return {
      ngModule: NgxTaigaUiValidationModule,
      providers: [
        {
          provide: DefaultConfig,
          useValue: DefaultConfig
        },
        {
          provide: VALIDATION_ERROR_CONFIG_PARAMS,
          useValue: errorsConfig,
        },
        {
          provide: VALIDATION_ERROR_CONFIG,
          useFactory: function (defaultConfig: ValidationErrorConfig, errorsConfig: ValidationErrorConfigParams) {
            return {...defaultConfig, ...errorsConfig}
          },
          deps: [DefaultConfig, VALIDATION_ERROR_CONFIG_PARAMS]
        },
        {
          provide: MESSAGES_PIPE_TRANSFORM,
          useClass: DefaultMessagePipe
        },
        {
          provide: ERROR_MESSAGES_PROVIDER,
          useClass: ErrorMessagesProviderService,
          deps: [MESSAGES_PIPE_TRANSFORM]
        },
        {
          provide: FORM_VALIDATION_ERRORS,
          useValue: {}
        }
      ]
    }
  }
}
