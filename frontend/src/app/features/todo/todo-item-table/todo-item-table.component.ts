import {Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Todo} from '../../../core/models/todo/todo';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TodoUpdateRequest } from '../../../core/models/todo/todo-update-request';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { Enum } from '../../../core/models/todo/enum';
import { Category } from '../../../core/models/todo/category';
import { Priority } from '../../../core/models/todo/priority';
import { EnumService } from '../../../core/services/enum/enum.service';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-todo-item-table',
  standalone: true,
  imports: [TableModule,
    MultiSelectModule,
    TagModule,
    CheckboxModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    DataViewModule,
    ConfirmDialogModule,
    DropdownModule,
    ReactiveFormsModule,
    HighlightDirective
  ],
  providers: [ConfirmationService],
  templateUrl: './todo-item-table.component.html',
  styleUrl: './todo-item-table.component.css'
})
export class TodoItemTableComponent {

  confirmationService = inject(ConfirmationService);
  enumService = inject(EnumService)

  @ViewChild('todoName') todoName!: ElementRef;
  @Input() todo: Todo = {}
  @Output() todoDeleted = new EventEmitter<Todo>()
  @Output() todoUpdated = new EventEmitter<TodoUpdateRequest>()
  @Output() todoIsCompleted = new EventEmitter<TodoUpdateRequest>()
  todoUpdateRequest: TodoUpdateRequest = {}
  editableTodo = false
  editingTodoId: number | undefined | null = null;

  @Input() pagedTodos: Todo[] = [];
  @Input() todos: Todo[] = [];

  categories: Enum [] = [];
  priorities: Enum [] = [];

  constructor() {
    this.categories = this.enumService.getValuesFromEnum(Category)
    this.priorities = this.enumService.getValuesFromEnum(Priority)
  }

  markAsDone(todo: Todo) {
    this.todoUpdateRequest.id = todo.id
    this.todoUpdateRequest.isCompleted = todo.isCompleted
    this.todoIsCompleted.emit(this.todoUpdateRequest);
    this.todoUpdateRequest = {}
  }

  markAsEditable(todo: Todo, ) {
    this.editingTodoId = todo.id;

    const todoElement = document.getElementById(this.generateTodoName(todo.id!)); // Get the element by ID
    if (todoElement) {
      todoElement.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(todoElement);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  updateTask(todo: Todo,todoDescription?: string) {
    this.todoUpdateRequest.id = todo.id
    this.todoUpdateRequest.description = todoDescription
    this.todoUpdateRequest.category = todo.category
    this.todoUpdateRequest.priority = todo.priority
    this.editableTodo = false
    this.todoName.nativeElement.blur();
    this.todoUpdated.emit(this.todoUpdateRequest);
    this.todoUpdateRequest = {}
    this.editingTodoId = null;
  }

  cancelModify(todo: Todo) {
    this.editingTodoId = null;
    const todoElement = document.getElementById(this.generateTodoName(todo.id!)); // Get the element by ID
    if (todoElement) {
      todoElement.blur();
    }
  }

  deleteTask(todo: Todo) {
    this.confirmationService.confirm({
      header: 'Delete task',
      message: `Are you sure you want to delete <strong>${todo.description}</strong>?`,
      accept: () => {
        this.todoDeleted.emit(todo);
      }
    });
  }

  applyCategoryFilter(selectedCategories: any[]): void {
    if (selectedCategories.length) {
      const labelCategories = selectedCategories.map(category => category.label.toUpperCase());
      this.pagedTodos = this.todos.filter(todo =>
        labelCategories.includes(todo.category ?? '')
      );
    } else {
      this.pagedTodos = this.todos;
    }
  }

  generateTodoName(id: number): string {
    return `todoName-${id}`;
  }

}
