import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertasService } from 'src/app/Services/Generales/alertas.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [AlertasService]
})
export class BoardComponent implements OnInit {
  public boardForm: any;
  public namePerson: any;
  public SelectedNumber: any[] = [];
  public viewCard = false;
  public statusBet = 'En espera';
  constructor(private alertasService: AlertasService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('DataUser') === null) {
      this.alertasService.Advertencia("No se encontraron datos registrados");
      window.location.href = 'http://localhost:4200';
      
    }
    this.namePerson = sessionStorage.getItem('DataUser');
    this.validationBoard();
  }

  LeavelBoard(): any {
    sessionStorage.clear();
    window.location.href = 'http://localhost:4200';
  }
  
  validationValue(): any {
    if (+this.boardForm.get('value').value < 5) {
      this.alertasService.Advertencia("El valor ingresado debe ser mayor a 5 Euros");
      this.boardForm.reset();
    }
  }

  SaveDataRegister(selected: any)  {
    if (this.SelectedNumber.length >= 3) {
      this.alertasService.Advertencia("Solo puede seleccionar 3 opciones.");
      
    } else {
    this.SelectedNumber.push(selected);
    }
  }

  GenerateBet(): any {
    this.viewCard = true;
    var ramdon = this.getRandomArbitrary();
    console.log(ramdon)
  }

  NewAttempt(): any {
    this.SelectedNumber = [];
    this.viewCard = false;
  }

  getRandomArbitrary() {
    return Math.floor(Math.random() * (10 - 1)) + 1;
  }

  validationBoard(): any {
    this.boardForm = new FormGroup({
      value: new FormControl('', [Validators.required])
    });
  }


}
