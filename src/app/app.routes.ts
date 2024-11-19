import { Routes } from '@angular/router';
import { SignupComponent } from './components/user/signup/signup.component';
import { LoginComponent } from './components/user/login/login.component';
import { TodoAppComponent } from './components/todo/todo-app/todo-app.component';

export const routes: Routes = [
    { path: 'todo', component: TodoAppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: 'todo', pathMatch: 'full' }
    
];
