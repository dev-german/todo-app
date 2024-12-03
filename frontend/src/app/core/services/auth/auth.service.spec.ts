import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let afAuthMock: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    afAuthMock = jasmine.createSpyObj('AngularFireAuth', [
      'signInWithEmailAndPassword',
      'signOut',
      'createUserWithEmailAndPassword',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: afAuthMock },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  describe('login', () => {
    it('should return a token on successful login', async () => {
      const mockCredentials = {
        user: {
          getIdToken: jasmine.createSpy('getIdToken').and.returnValue(Promise.resolve('mock-token')),
        },
      };

      afAuthMock.signInWithEmailAndPassword.and.returnValue(Promise.resolve(mockCredentials as any));

      const result = await service.login('test@example.com', 'password123');
      expect(result).toEqual({ state: true, token: 'mock-token' });
      expect(afAuthMock.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('should return an error on failed login', async () => {
      const mockError = new Error('Login failed');
      afAuthMock.signInWithEmailAndPassword.and.returnValue(Promise.reject(mockError));

      const result = await service.login('test@example.com', 'wrongpassword');
      expect(result).toEqual({ state: false, error: mockError.toString() });
      expect(afAuthMock.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    });
  });

  describe('signUp', () => {
    it('should return an empty string on successful signup', async () => {
      const mockCredentials = {};
      afAuthMock.createUserWithEmailAndPassword.and.returnValue(Promise.resolve(mockCredentials as any));

      const result = await service.signUp('newuser@example.com', 'newpassword');
      expect(result).toBe('');
      expect(afAuthMock.createUserWithEmailAndPassword).toHaveBeenCalledWith('newuser@example.com', 'newpassword');
    });

    it('should return an error string on failed signup', async () => {
      const mockError = new Error('Signup failed');
      afAuthMock.createUserWithEmailAndPassword.and.returnValue(Promise.reject(mockError));

      const result = await service.signUp('newuser@example.com', 'weakpassword');
      expect(result).toBe(mockError.toString());
      expect(afAuthMock.createUserWithEmailAndPassword).toHaveBeenCalledWith('newuser@example.com', 'weakpassword');
    });
  });
});
