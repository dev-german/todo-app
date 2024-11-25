import {Component, inject, OnInit} from '@angular/core';
import { TodoFormComponent } from "../todo-form/todo-form.component";
import { TodoListComponent } from "../todo-list/todo-list.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {TodoService} from '../../../core/services/todo/todo.service';
import {Todo} from '../../../core/models/todo/todo';
import {TodoRegistrationRequest} from '../../../core/models/todo/todo-registration-request';
import {TodoUpdateRequest} from '../../../core/models/todo/todo-update-request';

@Component({
  selector: 'app-todo-app',
  standalone: true,
  imports: [TodoFormComponent, TodoListComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.css'
})
export class TodoAppComponent implements OnInit {
  messageService = inject(MessageService);
  todoService = inject(TodoService);
  todos: Todo[] = []
  email = 'mateo@granados.com'

  ngOnInit(): void {
    this.findTodosByEmail(this.email);
  }

  private findTodosByEmail(email: string){
    this.todoService.findByEmail(email).subscribe(
      todos => {
        this.todos = todos
      });
  }

  addTodo(todoRegistrationRequest: TodoRegistrationRequest){
    todoRegistrationRequest.email = this.email
    this.todoService.save(todoRegistrationRequest).subscribe({
      next: (createdTodo) => {
        this.todos.push(createdTodo)
        this.messageService.add({
          severity: 'success',
          summary: 'Task created',
          detail: `Task ${todoRegistrationRequest.description} saved successfully`,
        });
      }
    })
  }

  handleTodoDeleted(todo: Todo){
    this.todoService.delete(todo.id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== todo.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Task deleted',
          detail: `Task ${todo.description} deleted successfully`,
        });
      }
    })
  }

  handleTodoUpdated(todoUpdateRequest: TodoUpdateRequest){
    this.todoService.update(todoUpdateRequest.id, todoUpdateRequest).subscribe({
      next: () => {
        this.todos.map(t => {
          if(t.id === todoUpdateRequest.id){
            t.priority = todoUpdateRequest.priority
            t.category = todoUpdateRequest.category
            t.description = todoUpdateRequest.description
          }
        });

        this.messageService.add({
          severity: 'success',
          summary: 'Task updated',
          detail: `Task ${todoUpdateRequest.description} updated successfully`,
        });
      }
    })
  }

  handleTodoIsCompleted(todoUpdateRequest: TodoUpdateRequest){
    this.todoService.update(todoUpdateRequest.id,  todoUpdateRequest).subscribe({
      next: () => {
        this.todos.map(t => {
          if(t.id === todoUpdateRequest.id){
            t.isCompleted = todoUpdateRequest.isCompleted
          }
        });
      }
    })

  }
}
