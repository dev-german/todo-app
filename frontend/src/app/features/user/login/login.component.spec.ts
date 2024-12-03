import { TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthService} from '../../../core/services/auth/auth.service';
import {MessageService} from 'primeng/api';

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let messageServiceMock:  jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', [ 'logout', 'login' ]);

    TestBed.configureTestingModule({
      providers: [
        LoginComponent,
        { provide: AuthService, useValue: authServiceMock },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    })

    loginComponent = TestBed.inject(LoginComponent);

  });

  it('should create', () => {
    expect(loginComponent).toBeTruthy();
  });
});
