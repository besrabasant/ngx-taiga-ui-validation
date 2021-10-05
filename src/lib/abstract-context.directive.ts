import {
  ContentChildren,
  Directive,
  Input,
  QueryList
} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FieldErrorComponent} from "./field-error/field-error.component";

@Directive()
export abstract class AbstractContextDirective {

  @ContentChildren(FieldErrorComponent, {descendants: true})
  fieldErrorComponents: QueryList<FieldErrorComponent>;

  @Input()
  useFieldContext: boolean = true;

  @Input()
  formGroup: FormGroup;
}
