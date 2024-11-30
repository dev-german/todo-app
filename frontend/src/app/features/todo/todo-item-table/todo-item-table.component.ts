import {Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Todo} from '../../../core/models/todo/todo';
import { TableModule } from 'primeng/table'; // Import TableModule
import { MultiSelectModule } from 'primeng/multiselect'; // Import MultiSelectModule
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
    ConfirmDialogModule, DropdownModule, ReactiveFormsModule,
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
  first = false
  @Output() todoDeleted = new EventEmitter<Todo>()
  @Output() todoUpdated = new EventEmitter<TodoUpdateRequest>()
  @Output() todoIsCompleted = new EventEmitter<TodoUpdateRequest>()
  todoUpdateRequest: TodoUpdateRequest = {}
  editableTodo = false
 
  @Input() pagedTodos: Todo[] = []; 
  @Input() todos: Todo[] = [];
  @Input() todos2: { label: string; value: string }[] = [{ label: "HOME", value: "HOME" },{ label: "PERSONAL", value: "PERSONAL" },{ label: "WORK", value: "WORK" }];
 
 

  categories: Enum [] = [];
  priorities: Enum [] = [];

  constructor() {
    this.categories = this.enumService.getValuesFromEnum(Category)
    this.priorities = this.enumService.getValuesFromEnum(Priority)
  }

  markAsDone() {
    this.todoUpdateRequest.id = this.todo.id
    this.todoUpdateRequest.isCompleted = this.todo.isCompleted
    this.todoIsCompleted.emit(this.todoUpdateRequest);
    this.todoUpdateRequest = {}
  }

  markAsEditable() {
    this.editableTodo = true
    const div = this.todoName.nativeElement;
    div.focus();

    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(div);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  updateTask(todoDescription?: string) {
    this.todoUpdateRequest.id = this.todo.id
    this.todoUpdateRequest.description = todoDescription
    this.todoUpdateRequest.category = this.todo.category
    this.todoUpdateRequest.priority = this.todo.priority
    this.editableTodo = false
    this.todoName.nativeElement.blur();
    this.todoUpdated.emit(this.todoUpdateRequest);
    this.todoUpdateRequest = {}
  }

  cancelModify() {
    this.editableTodo = false
    this.todoName.nativeElement.blur();
  }

  deleteTask() {
    this.confirmationService.confirm({
      header: 'Delete task',
      message: `Are you sure you want to delete <strong>${this.todo.description}</strong>?`,
      accept: () => {
        this.todoDeleted.emit(this.todo);
      }
    });
  }

  applyCategoryFilter(selectedCategories: any[]): void {
    if (selectedCategories.length) {
      const labelCategories = selectedCategories.map(category => category.label)
      this.pagedTodos = this.todos.filter(todo =>
        labelCategories.includes(todo.category ?? '')
      );
    } else {
      this.pagedTodos = this.todos;
    }
  
  }

  

}
