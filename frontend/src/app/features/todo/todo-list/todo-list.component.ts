import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import {Todo} from '../../../core/models/todo/todo';
import {TodoUpdateRequest} from '../../../core/models/todo/todo-update-request';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoItemComponent,
    CommonModule,
    ButtonModule,
    DataViewModule,
    TagModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  @Input() todos: Todo[] = [];
  @Output() notifyTodoDeleted = new EventEmitter<Todo>();
  @Output() notifyTodoUpdated = new EventEmitter<TodoUpdateRequest>();
  @Output() notifyTodoIsCompleted = new EventEmitter<TodoUpdateRequest>();

  constructor(){
  }

  handleNotifyTodoDeleted(todo: Todo) {
    this.notifyTodoDeleted.emit(todo);
  }

  handleNotifyTodoUpdated(todoUpdateRequest: TodoUpdateRequest) {
    this.notifyTodoUpdated.emit(todoUpdateRequest);
  }

  handleNotifyTodoIsCompleted(todoUpdateRequest: TodoUpdateRequest) {
    this.notifyTodoIsCompleted.emit(todoUpdateRequest);
  }
}
