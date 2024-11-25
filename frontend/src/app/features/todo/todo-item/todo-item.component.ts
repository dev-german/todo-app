import {Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {Todo} from '../../../core/models/todo/todo';
import {TodoUpdateRequest} from '../../../core/models/todo/todo-update-request';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CheckboxModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    DataViewModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  confirmationService = inject(ConfirmationService);
  @ViewChild('todoName') todoName!: ElementRef;
  @Input() todo: Todo = {}
  @Input() first = false
  @Output() todoDeleted = new EventEmitter<Todo>()
  @Output() todoUpdated = new EventEmitter<TodoUpdateRequest>()
  @Output() todoIsCompleted = new EventEmitter<TodoUpdateRequest>()
  todoUpdateRequest: TodoUpdateRequest = {}
  editableTodo = false

  markAsDone(){
    this.todoUpdateRequest.id = this.todo.id
    this.todoUpdateRequest.isCompleted = this.todo.isCompleted
    this.todoIsCompleted.emit(this.todoUpdateRequest);
    this.todoUpdateRequest = {}
  }

  markAsEditable(){
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

  updateTask(event?: any){
    this.todoUpdateRequest.id = this.todo.id
    this.todoUpdateRequest.description = event.target.innerText
    this.todoUpdateRequest.category = this.todo.category
    this.todoUpdateRequest.priority = this.todo.priority
    this.editableTodo = false
    this.todoName.nativeElement.blur();
    this.todoUpdated.emit(this.todoUpdateRequest);
    this.todoUpdateRequest = {}
  }

  cancelModify(){
    this.editableTodo = false
    this.todoName.nativeElement.blur();
  }

  deleteTask(){
    this.confirmationService.confirm({
      header: 'Delete task',
      message: `Are you sure you want to delete <strong>${this.todo.description}</strong>?`,
      accept: () => {
        this.todoDeleted.emit(this.todo);
      }
    });
  }
}
