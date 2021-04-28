import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";

import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './Routes/app-routing.module';
import { BoardComponent } from './Components/board/board.component';
import { RegisterDataComponent } from './Components/register-data/register-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "€ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    RegisterDataComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    appRoutingProviders
],
  bootstrap: [AppComponent]
})
export class AppModule { }
