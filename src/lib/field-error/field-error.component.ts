import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  FormArrayName,
  FormGroupDirective,
  FormGroupName,
  NgControl,
} from '@angular/forms';
import {tuiDefaultProp, tuiPure, TuiValidationError} from '@taiga-ui/cdk';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {EMPTY, merge, Observable} from 'rxjs';
import {
  ERROR_MESSAGES_PROVIDER,
  FORM_VALIDATION_ERRORS,
  VALIDATION_ERROR_CONFIG
} from "../injection-tokens";
import {TranslatePipe} from "@ngx-translate/core";
import {getFieldControlName} from "../utils";
import {ErrorMessagesProviderService} from "../error-messages-provider.service";
import {ValidationErrorConfig} from "../validation-error.config";

const EMPTY_RECORD = {};


@Component({
  selector: 'tui-field-error',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
  providers: [
    TranslatePipe
  ]
})
export class FieldErrorComponent {
  @Input()
  @tuiDefaultProp()
  order: readonly string[] = [];

  private validationContext: string;

  private useFieldContext: boolean = true;

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    private readonly ngControl: NgControl | null,
    @Optional()
    @Self()
    @Inject(FormArrayName)
    private readonly formArrayName: FormArrayName | null,
    @Optional()
    @Self()
    @Inject(FormGroupName)
    private readonly formGroupName: FormGroupName | null,
    @Optional()
    @Self()
    @Inject(FormGroupDirective)
    private readonly formGroup: FormGroupDirective | null,
    @Inject(VALIDATION_ERROR_CONFIG)
    private config: ValidationErrorConfig,
    @Inject(FORM_VALIDATION_ERRORS)
    private readonly validationErrors: Record<string, PolymorpheusContent>,
    @Inject(ERROR_MESSAGES_PROVIDER)
    private messagesProvider: ErrorMessagesProviderService,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.validationContext = config.defaultValidationContext
  }

  @tuiPure
  get change$(): Observable<unknown> {
    return merge(
      this.control?.valueChanges || EMPTY,
      this.control?.statusChanges || EMPTY,
    );
  }

  get computedError(): TuiValidationError | null {
    return (this.invalid && this.touched && this.error) || null;
  }

  public setValidationContext(context: string): void {
    this.validationContext = context;
  }

  public setUsefieldContext(context: boolean): void {
    this.useFieldContext = context;
  }

  registerOnChange() {
  }

  registerOnTouched() {
  }

  setDisabledState() {
  }

  writeValue() {
  }

  private get error(): TuiValidationError | null {
    const {errorId} = this;

    if (!errorId) {
      return null;
    }

    return this.getError(errorId);
  }

  private get invalid(): boolean {
    return !!this.control && this.control.invalid;
  }

  private get touched(): boolean {
    return !!this.control && this.control.touched;
  }

  private get control(): AbstractControl | null {
    if (this.ngControl) {
      return this.ngControl.control;
    }

    if (this.formArrayName) {
      return this.formArrayName.control;
    }

    if (this.formGroupName) {
      return this.formGroupName.control;
    }

    if (this.formGroup) {
      return this.formGroup.control;
    }

    return null;
  }

  private get errorId(): string {
    return this.getErrorId(this.order, this.controlErrors);
  }

  private get controlName(): string {
    return getFieldControlName(this.control)
  }

  private get controlErrors(): Record<string, any> {
    return (this.control && this.control.errors) || EMPTY_RECORD;
  }

  @tuiPure
  private getErrorId(
    order: readonly string[],
    controlErrors: Record<string, any>,
  ): string {
    const id = order && order.find(errorId => controlErrors[errorId]);
    const fallback = Object.keys(controlErrors)[0];
    let errorId = id || fallback
    return errorId ?
      this.useFieldContext ?
        `${this.validationContext}.${this.controlName}.${errorId}` : `${this.validationContext}.${errorId}` : '';
  }

  @tuiPure
  private getError(
    errorId: any,
  ): TuiValidationError | null {

    const errorContent: any = this.validationErrors[errorId]

    if (errorContent !== undefined && errorContent instanceof TuiValidationError) {
      return <TuiValidationError>errorContent
    }

    return new TuiValidationError(this.messagesProvider.get(errorId))
  }
}
