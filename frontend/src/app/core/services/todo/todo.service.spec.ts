import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TodoService} from './todo.service';
import {Todo} from '../../models/todo/todo';
import {TodoRegistrationRequest} from '../../models/todo/todo-registration-request';
import {TodoUpdateRequest} from '../../models/todo/todo-update-request';
import {environment} from '../../../../environments/environment';
import {Category} from '../../models/todo/category';
import {Priority} from '../../models/todo/priority';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.api.baseUrl}/${environment.api.todoUrl}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findByEmail', () => {
    it('should return a list of todos', () => {
      const email = 'test@example.com';
      const mockTodos: Todo[] = [
        { id: 1, description: 'Test Todo 1', email, category: Category.HOME, priority: Priority.LOW, isCompleted: false, createdAt: new Date().toISOString() },
        { id: 2, description: 'Test Todo 2', email, category: Category.HOME, priority: Priority.LOW, isCompleted: false, createdAt: new Date().toISOString() },
      ];

      service.findByEmail(email).subscribe((todos) => {
        expect(todos.length).toBe(2);
        expect(todos).toEqual(mockTodos);
      });

      const req = httpMock.expectOne(`${apiUrl}?email=${email}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTodos);
    });
  });

  describe('save', () => {
    it('should create a new todo', () => {
      const todoRequest: TodoRegistrationRequest = { description: 'New Todo', email: 'test@example.com', category: Category.HOME, priority: Priority.LOW };
      const mockTodo: Todo = { id: 1, description: 'New Todo', email: 'test@example.com', category: Category.HOME, priority: Priority.LOW, isCompleted: false, createdAt: new Date().toISOString() };

      service.save(todoRequest).subscribe((todo) => {
        expect(todo).toEqual(jasmine.objectContaining({
          ...mockTodo,
          createdAt: jasmine.any(String)
        }));
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockTodo);
    });
  });

  describe('delete', () => {
    it('should delete a todo by ID', () => {
      const todoId = 1;

      service.delete(todoId).subscribe((response) => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${apiUrl}/${todoId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('update', () => {
    it('should update a todo', () => {
      const todoId = 1;
      const todoUpdateRequest: TodoUpdateRequest = { description: 'Updated Todo' };
      const updatedTodo: Todo = { id: 1, description: 'Updated Todo' };

      service.update(todoId, todoUpdateRequest).subscribe((todo) => {
        expect(todo).toEqual(updatedTodo);
      });

      const req = httpMock.expectOne(`${apiUrl}/${todoId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedTodo);
    });
  });
});
