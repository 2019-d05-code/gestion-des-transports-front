import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPhotoUrlValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PhotoUrlValidatorDirective, multi: true }]
})
export class PhotoUrlValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    let photoUrl = control.value;
    if(photoUrl && (!photoUrl.startsWith('http') || photoUrl.length < 8)) {
      return {urlError : `L'URL de la photo doit commencer par http(s)://`};
    }

    return null;
  }

}
