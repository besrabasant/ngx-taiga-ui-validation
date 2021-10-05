import {AbstractControl} from "@angular/forms";
import {isArray} from "rxjs/internal-compatibility";

export type AbstractControlMap = { [key: string]: AbstractControl }
export type AbstractControlArray = AbstractControl[]

export function getFieldControlName(control: AbstractControl | null, controlName: string = ''): string {

  if (control == null) {
    return controlName
  }

  const formGroup: AbstractControlArray | AbstractControlMap | undefined = control?.parent?.controls;

  if (formGroup == undefined) {
    return controlName;
  }

  if (isArray(formGroup) && formGroup.length > 0) {
    let parentName: any = isArray(formGroup) && formGroup.length > 0 ? getFieldControlName(formGroup[0].parent, controlName) : ''

    if (parentName.length > 0) {
      controlName = `${parentName}.*`
    }
  } else {
    controlName = <string>Object.keys(formGroup).find((name: string) => control === (formGroup as any)[name] || '');
  }
  return controlName
}
