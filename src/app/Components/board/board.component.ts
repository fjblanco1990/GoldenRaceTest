import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HistoryObject } from 'src/app/Models/Histoty.model';
import { AlertasService } from 'src/app/Services/Generales/alertas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [AlertasService]
})
export class BoardComponent implements OnInit {
  public boardForm: any;
  public namePerson: any;
  public selectedNumber: number[] = [];
  public historyItem: any[] = [];
  public stakeValue: any;
  public totalWon: any;
  public NumberWon: any;
  public winer = false;
  public historyObject = new HistoryObject;
  public LsthistoryObject: HistoryObject[] = [];
  public AvailableMoney = 100000;
  public disbaleBet = false;
  public ShowOne = false;
  public ShowTwo = false;
  public ShowThree = false;
  public ShowFour = false;
  public ShowFive = false;
  public ShowSix = false;
  public ShowSeven = false;
  public ShowEitgh = false;
  public ShowNine = false;
  public ShowTen = false;
  public condition = true;
  
  public viewCard = false;

  constructor(private alertasService: AlertasService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('DataUser') === null) {
      this.alertasService.Advertencia("No se encontraron datos registrados");
      window.location.href = 'http://localhost:4200';
      
    }
    this.namePerson = sessionStorage.getItem('DataUser');
    this.validationBoard();
  }
  // method to exit the board
  LeavelBoard(): any {
    sessionStorage.clear();
    window.location.href = 'http://localhost:4200';
  }
  //method that validates the minimum bet value
  validationValue(): any {
    if (+this.boardForm.get('value').value < 5) {
      this.disbaleBet = false;
      this.alertasService.Advertencia("The entered value must be greater than 5 Euros.");
      this.boardForm.reset();
    } else if (+this.boardForm.get('value').value >= this.AvailableMoney ) {
      this.disbaleBet = false;
      this.alertasService.Advertencia("The value of the bet cannot be greater than the amount of money available.");
      this.boardForm.reset();
    } else {
      this.disbaleBet = true;
    }
  }
  //Method that saves the bet and validates that you do not select the same number
  SaveDataRegister(selected: number)  {
    if (this.selectedNumber.length >= 1) {
      this.alertasService.Advertencia("You can only select 1 option.");
      return false;
    } else {
      if (this.selectedNumber.length >= 1) {
        this.selectedNumber.forEach(element => {
          switch (element) {
            case selected:
              this.alertasService.Advertencia("You cannot select the same option.");
              this.condition = false;
              break;
          }
          });
          if (this.condition) {
            this.selectedNumber.push(selected);
            this.ShowSelection(this.selectedNumber);
          }
      } else {
        this.selectedNumber.push(selected);
        this.ShowSelection(this.selectedNumber);
        return true;
      }
    }
    this.condition = true;
    return true;
  }
  //Method that removes selected options
  RemoveSelection(value: any): any {
    if (this.selectedNumber[0] === value) {
      this.DeleteItem(0, value);
    }
    if (this.selectedNumber[1] === value) {
      this.DeleteItem(1, value);
    }
    if (this.selectedNumber[2] === value) {
      this.DeleteItem(2, value);
    }
  
  }
  //Private method to remove option from array
  private DeleteItem(value: any, number: any) {
    this.selectedNumber.splice(value, 1);
    this.HideRemoveSelection(number);
    // this.HideSelection();
  }
  //Method that generates the bet calculates the won value and displays the winning number
  GenerateBet(): any {
    if (this.selectedNumber.length <= 0) {
      this.alertasService.Advertencia("You must select options to be able to place the bet.");
    } 
    else {
      this.viewCard = true;
      this.stakeValue = this.boardForm.get('value').value;
      this.totalWon = (this.stakeValue * 1.5) / 100;
      var ramdon = this.getRandomArbitrary();
      console.log(ramdon);
      this.NumberWon = ramdon;

        Swal.fire({
        title: 'Generating result',
        html: '¡The winning number is <b></b> !',
        timerProgressBar: true,
        showDenyButton: false,
        confirmButtonText: 'Ok',
            didOpen: () => {
                Swal.showLoading();
                setInterval(() => {
                    this.ViewResult(this.NumberWon)
                  }, 3000)
            },
        }).then((result) => {
          if (result.isConfirmed) {
            this.SaveHistory();
          }
        })
    }
  }
  //Method that clears the values
  NewAttempt(): any {
    this.disbaleBet = false;
    this.selectedNumber = [] = [];
    this.viewCard = false;
    this.boardForm.reset();
    this.winer =  false;
    this.HideSelection();
  }
  //Method that saves the history of bets
  SaveHistory(): any {
    this.disbaleBet = false;
    this.boardForm.reset();
    this.historyObject = new HistoryObject;
    this.selectedNumber.forEach(element => {
      if (element == this.NumberWon) {
        this.winer = true;
      }
    });
    if (this.winer) {
      this.historyObject.status = 'Won';
      this.historyObject.totalWon =  this.totalWon;
      this.AvailableMoney = this.AvailableMoney + this.totalWon;
    } else {
      this.historyObject.status = 'Lost';
      this.totalWon = 0;
      this.historyObject.totalWon = this.totalWon;
      this.AvailableMoney = this.AvailableMoney - this.stakeValue;
    }
    this.historyObject.WonNumber = this.NumberWon;
    this.historyObject.selectedNumber =  this.selectedNumber.toString();
    this.historyObject.stakeValue = this.stakeValue;
    
    this.LsthistoryObject.push(this.historyObject);
    this.winer = false;
  }
  //Method that hides selected options
  HideSelection(): any {
    this.ShowOne = false;
    this.ShowTwo = false;
    this.ShowThree = false;
    this.ShowFour = false;
    this.ShowFive = false;
    this.ShowSix = false;
    this.ShowSeven = false;
    this.ShowEitgh = false;
    this.ShowNine = false;
    this.ShowTen = false;
  }
  //Method that generates the winning random number
  getRandomArbitrary() {
    return Math.floor(Math.random() * (10 - 1)) + 1;
  }
  //Method that hides the loading
  private ViewResult(won: any) {
    const content = Swal.getContent();
    if (content) {
        content.querySelector('b')!.textContent = won;
        Swal.hideLoading();
    }
 }
 //Method showing selected options
 private ShowSelection(selected: number[]): any {
  selected.forEach(select => {
    switch (select) {
      case 1:
        this.ShowOne = true;
        break;
      case 2:
        this.ShowTwo = true;
        break;
      case 3:
        this.ShowThree = true;
        break;
      case 4:
        this.ShowFour = true;
        break;
      case 5:
        this.ShowFive = true;
        break;
      case 6:
        this.ShowSix = true;
        break;
      case 7:
        this.ShowSeven = true;
        break;
      case 8:
        this.ShowEitgh = true;
        break;
      case 9:
        this.ShowNine = true;
        break;
      case 10:
        this.ShowTen = true;
        break;
      default:
        break;
    }
  });
 }
 //Method that hides selected options
 private HideRemoveSelection(select: any): any {
    switch (select) {
      case 1:
        this.ShowOne = false;
        break;
      case 2:
        this.ShowTwo = false;
        break;
      case 3:
        this.ShowThree = false;
        break;
      case 4:
        this.ShowFour = false;
        break;
      case 5:
        this.ShowFive = false;
        break;
      case 6:
        this.ShowSix = false;
        break;
      case 7:
        this.ShowSeven = false;
        break;
      case 8:
        this.ShowEitgh = false;
        break;
      case 9:
        this.ShowNine = false;
        break;
      case 10:
        this.ShowTen = false;
        break;
      default:
        break;

        this.selectedNumber

    }
 }
 //Method that initializes the form
  validationBoard(): any {
    this.boardForm = new FormGroup({
      value: new FormControl('', [Validators.required])
    });
  }


}
