import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/services/email-validator.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
//import * as custValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
    userName: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]]
  },
  {
    validators: [this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidatorService
    ){

    }

  isValidField(field: string): boolean | null{
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit(): void{
    // if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
    // }
  }
}