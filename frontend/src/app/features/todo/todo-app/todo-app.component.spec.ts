import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoAppComponent} from './todo-app.component';
import {TodoService} from '../../../core/services/todo/todo.service';
import {MessageService} from 'primeng/api';
import {of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Category} from '../../../core/models/todo/category';
import {Priority} from '../../../core/models/todo/priority';
import {Router} from '@angular/router';

class AngularFireAuthMock {
  signInWithEmailAndPassword() {
    return of({ user: { getIdToken: () => 'mock-token' } });
  }
  signOut() {
    return of(null);
  }
  createUserWithEmailAndPassword() {
    return of({ user: { getIdToken: () => 'mock-token' } });
  }
}


describe('TodoAppComponent', () => {
  let component: TodoAppComponent;
  let todoServiceMock: jasmine.SpyObj<TodoService>;
  let messageServiceMock:  jasmine.SpyObj<MessageService>;
  let routerMock: jasmine.SpyObj<Router>;  // Mock Router

  beforeEach(async () => {

    todoServiceMock = jasmine.createSpyObj('TodoService', ['findByEmail']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);  // Mock navigate method

    todoServiceMock.findByEmail.and.returnValue(of([
      { id: 1, description: 'Test Todo 1', email: 'test@example.com', isCompleted: false, category: Category.WORK, priority: Priority.HIGH },
      { id: 2, description: 'Test Todo 2', email: 'test@example.com', isCompleted: true, category: Category.PERSONAL, priority: Priority.LOW }
    ]));

    TestBed.configureTestingModule({
      providers: [
        TodoAppComponent,
        { provide: TodoService, useValue: todoServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: Router, useValue: routerMock }
      ],
    });

    component = TestBed.inject(TodoAppComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
