import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {
  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Far cry 3', [Validators.required]],
      ['Red Dead Redemption 2', [Validators.required]]
    ])
  });

  constructor(private formBuilder: FormBuilder){

  }

  get favoriteGames(): FormArray{
    return this.myForm.get('favoriteGames') as FormArray
  }

  isValidField(field: string): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  isValidFieldInArray(formArray: FormArray, index: number){
    return formArray.controls[index].errors && formArray.controls[index].touched
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

  onAddFavorite(): void{
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.formBuilder.control(newGame, [Validators.required])
    )
    this.newFavorite.reset('');
  }

  onDelete(index: number): void{
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void{
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return ;
    }

    (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);
    this.myForm.reset();
  }
}