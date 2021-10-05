import {
  AfterContentChecked,
  AfterContentInit, ChangeDetectorRef,
  Directive,
  Input,
  OnInit,
} from '@angular/core';
import {AbstractContextDirective} from "./abstract-context.directive";


@Directive({
  selector: '[validationContext]',
})
export class ValidationContextDirective extends AbstractContextDirective implements OnInit, AfterContentInit, AfterContentChecked {

  @Input()
  validationContext: string = '';

  constructor(
    protected cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  private attachValidationContexts(): void {
    if (this.fieldErrorComponents) {
      this.fieldErrorComponents.forEach(i => {
        i.setValidationContext(this.validationContext);
      });
    }
  }

  ngOnInit(): void {
    if(!this.useFieldContext) {
      throw new Error(`value of 'useFieldContext' cannot be false when used together with 'validationContext'`)
    }
  }

  ngAfterContentInit(): void {
    this.attachValidationContexts()
  }

  public clear(): void {
    this.cdRef.markForCheck()
  }

  ngAfterContentChecked(): void {
    this.attachValidationContexts()
    this.cdRef.markForCheck()
  }
}
