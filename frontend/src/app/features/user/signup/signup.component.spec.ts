import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {MessageService} from 'primeng/api';

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

describe('SignupComponent', () => {
  let component: SignupComponent;
  let messageServiceMock:  jasmine.SpyObj<MessageService>;

  beforeEach(async () => {

    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [
        SignupComponent,
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    })

    component = TestBed.inject(SignupComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
