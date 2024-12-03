import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Create mock objects
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    authServiceMock = jasmine.createSpyObj('AuthService', [ 'logout']);

    // Set up TestBed
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should redirect to login if there is no token in localStorage', () => {
    // Mock localStorage.getItem to return null (no token)
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const canActivate = authGuard.canActivate({} as any, {} as any);

    // Expect the router to navigate to the login page
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    // Expect the guard to return false, blocking access
    expect(canActivate).toBe(false);
  });

  it('should allow navigation if token exists in localStorage', () => {
    // Mock localStorage.getItem to return a token
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');

    const canActivate = authGuard.canActivate({} as any, {} as any);

    // Expect canActivate to return true, allowing navigation
    expect(canActivate).toBe(true);
  });
});
