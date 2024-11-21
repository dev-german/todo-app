import { Routes } from '@angular/router';
import { SignupComponent } from './features/user/signup/signup.component';
import { LoginComponent } from './features/user/login/login.component';
import { TodoAppComponent } from './features/todo/todo-app/todo-app.component';

export const routes: Routes = [
    { path: 'todo', component: TodoAppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: 'todo', pathMatch: 'full' }

];
