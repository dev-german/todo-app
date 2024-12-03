import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import {LoginComponent} from '../login/login.component';
import {AuthService} from '../../../core/services/auth/auth.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';

describe('LogoutComponent', () => {

  let fixture: ComponentFixture<LogoutComponent>;
  let logOutComponent: LogoutComponent;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let confirmationServiceMock:  jasmine.SpyObj<ConfirmationService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', [ 'logout', 'login' ]);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        LogoutComponent,
        { provide: AuthService, useValue: authServiceMock },
        { provide: ConfirmationService, useValue: confirmationServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })

    fixture = TestBed.createComponent(LogoutComponent);
    logOutComponent = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    spyOn(localStorage, 'getItem').and.returnValue('testUser');
    const fixture = TestBed.createComponent(LogoutComponent);
    const logOutComponent = fixture.componentInstance;

    // Check that the component is created and usuario is correctly set
    expect(logOutComponent).toBeTruthy();
    expect(logOutComponent.usuario).toBe('testUser');
  });
});
