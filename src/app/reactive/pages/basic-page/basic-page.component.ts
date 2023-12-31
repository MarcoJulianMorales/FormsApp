import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  stock: 3
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{
  public myForm: FormGroup = this.formBuilder.group({
    name:  ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private formBuilder: FormBuilder, private validatorsService: ValidatorsService){
    
  }

  ngOnInit(): void {
    //this.myForm.reset(rtx5090);
  }

  isValidField(field: string): boolean | null{
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null{
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          return 'This field is required'
        case 'minlength':
          return `Minimum ${errors['minlength'].requiredLength} characters`
      }
    }

    return null;
  }

  onSave(): void{
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };

    console.log(this.myForm.value)

    this.myForm.reset({ price: 10, stock: 10 });
  }
}