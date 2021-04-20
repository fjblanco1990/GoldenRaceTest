import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routing } from 'src/app/Routes/app-routing.module';

@Component({
  selector: 'app-register-data',
  templateUrl: './register-data.component.html',
  styleUrls: ['./register-data.component.css']
})
export class RegisterDataComponent implements OnInit {
  public registrationForm: any;
  constructor() { }

  ngOnInit(): void {
    this.validationRegister();
  }

  SaveDataRegister(): any {
    if (this.registrationForm.valid) {
      sessionStorage.setItem("DataUser", this.registrationForm.get('NameCompleted').value);
      window.location.href = 'http://localhost:4200/DashBoard';
    } else {
      this.ValidarErrorForm(this.registrationForm);
    }
  }

  ValidarErrorForm(formulario: any): any {
    Object.keys(formulario.controls).forEach(field => { // {1}
      const control = formulario.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }

  validationRegister(): any {
    this.registrationForm = new FormGroup({
      NameCompleted: new FormControl('', [Validators.required])
    });
  }

}
