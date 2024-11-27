import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Todo} from '../../models/todo/todo';
import {TodoRegistrationRequest} from '../../models/todo/todo-registration-request';
import {TodoUpdateRequest} from '../../models/todo/todo-update-request';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly todoUrl = `${environment.api.baseUrl}/${environment.api.todoUrl}`
  http = inject(HttpClient)

  findByEmail(email: string) {
    return this.http.get<Todo[]>(`${this.todoUrl}?email=${email}`);
  }

  save(todo: TodoRegistrationRequest){
    return this.http.post<Todo>(this.todoUrl, todo);
  }

  delete(id: number | undefined){
    return this.http.delete(`${this.todoUrl}/${id}`);
  }

  update(id: number |  undefined, todoUpdateRequest: TodoUpdateRequest){
    return this.http.put(`${this.todoUrl}/${id}`, todoUpdateRequest);
  }
}
