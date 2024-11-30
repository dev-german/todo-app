import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import {Todo} from '../../../core/models/todo/todo';
import {TodoUpdateRequest} from '../../../core/models/todo/todo-update-request';
import {PaginatorModule} from 'primeng/paginator';
import { TodoItemTableComponent } from '../todo-item-table/todo-item-table.component';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoItemComponent,
    CommonModule,
    ButtonModule,
    DataViewModule,
    TagModule,
    PaginatorModule,
    TodoItemTableComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnChanges {

  @Input() todos: Todo[] = [];
  @Output() notifyTodoDeleted = new EventEmitter<Todo>();
  @Output() notifyTodoUpdated = new EventEmitter<TodoUpdateRequest>();
  @Output() notifyTodoIsCompleted = new EventEmitter<TodoUpdateRequest>();

  pagedTodos: Todo[] = []
  totalRecords = 0
  rows = 5
  currentPage = 0

  onPageChange(event: any) {
    this.currentPage = event.page
    this.rows = event.rows
    this.updatePageData()
  }

  updatePageData(): void {
    const startIndex = this.currentPage * this.rows;
    const endIndex = startIndex + this.rows;
    this.pagedTodos = this.todos.slice(startIndex, endIndex);
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes['todos']) {
      this.totalRecords = this.todos.length
      this.updatePageData();
    }
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
