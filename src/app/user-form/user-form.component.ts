import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateHeaderName } from 'http';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {


  userForm!: FormGroup;
  ngOnInit(): void {

    this.userForm  = new FormGroup(
      {
        email:new FormControl('',[Validators.required,Validators.email]),
        city: new FormControl('',Validators.required)
      }
    )
  }

  addUser(){
    console.log(this.userForm.value)
  }

}
