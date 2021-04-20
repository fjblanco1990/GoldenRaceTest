import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { BoardComponent } from '../Components/board/board.component';
import { RegisterDataComponent } from '../Components/register-data/register-data.component';

const appRoutes: Routes = [
    { path: '', component: RegisterDataComponent  },
    { path: 'DashBoard', component: BoardComponent },
    { path: '*', component: AppComponent  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders =  RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });
