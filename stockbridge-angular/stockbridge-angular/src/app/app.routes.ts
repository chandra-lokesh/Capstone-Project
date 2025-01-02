
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBudgetModalComponent } from './add-budget-modal/add-budget-modal.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LearnComponent } from './learn/learn.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { StockCardComponent } from './stock-card/stock-card.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'learn', component: LearnComponent, canActivate: [authGuard]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'search-page', component: SearchPageComponent, canActivate: [authGuard] },
    { path: 'user-details', component: UserDetailsComponent },
    { path: 'home-page', component: HomePageComponent },
    { path: 'add-budget', component: AddBudgetModalComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'stock-card', component: StockCardComponent },
    // { path: 'stock-details', component: StockDetailsComponent },
    // { path: 'stock/:symbol', component: StockCardComponent }
    { path: 'stock-details/:symbol', component: StockDetailsComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent }
   
   
];


