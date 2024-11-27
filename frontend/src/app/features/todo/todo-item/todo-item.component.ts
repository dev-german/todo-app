import {Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {Todo} from '../../../core/models/todo/todo';
import {TodoUpdateRequest} from '../../../core/models/todo/todo-update-request';
import {DropdownModule} from 'primeng/dropdown';
import {Category} from '../../../core/models/todo/category';
import {Priority} from '../../../core/models/todo/priority';
import {Enum} from '../../../core/models/todo/enum';
import {EnumService} from '../../../core/services/enum/enum.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CheckboxModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    DataViewModule,
    ConfirmDialogModule, DropdownModule, ReactiveFormsModule
  ],
  providers: [ConfirmationService],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  confirmationService = inject(ConfirmationService);
  enumService = inject(EnumService)

  @ViewChild('todoName') todoName!: ElementRef;
  @Input() todo: Todo = {}
  @Input() first = false
  @Output() todoDeleted = new EventEmitter<Todo>()
  @Output() todoUpdated = new EventEmitter<TodoUpdateRequest>()
  @Output() todoIsCompleted = new EventEmitter<TodoUpdateRequest>()
  todoUpdateRequest: TodoUpdateRequest = {}
  editableTodo = false

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
}
