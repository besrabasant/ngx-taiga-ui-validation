import {
  AfterContentChecked,
  AfterContentInit, ChangeDetectorRef,
  Directive,
  OnInit,
} from '@angular/core';
import {AbstractContextDirective} from "./abstract-context.directive";


@Directive({
  selector: '[useFieldContext]',
})
export class UseFieldContextDirective extends AbstractContextDirective implements OnInit, AfterContentInit, AfterContentChecked {

  constructor(
    private cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  private attachValidationContexts(): void {
    if (this.fieldErrorComponents) {
      this.fieldErrorComponents.forEach(i => {
        i.setUsefieldContext(this.useFieldContext);
      });
    }
  }

  ngOnInit(): void {
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
