import {Component, ElementRef, EventEmitter, inject, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {StyleClassModule} from 'primeng/styleclass';
import {Category} from '../../../core/models/todo/category';
import {Priority} from '../../../core/models/todo/priority';
import {TodoRegistrationRequest} from '../../../core/models/todo/todo-registration-request';
import {DropdownModule} from 'primeng/dropdown';
import {AutoFocusModule} from 'primeng/autofocus';
import {NgIf, TitleCasePipe} from '@angular/common';
import {EnumService} from '../../../core/services/enum/enum.service';
import {collectionGroup} from '@angular/fire/firestore';
import {Enum} from '../../../core/models/todo/enum';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    StyleClassModule,
    DropdownModule,
    AutoFocusModule,
    NgIf,
    DialogModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  @ViewChild('inputNewTodo') inputNewTodo!: ElementRef;
  @Output() todoCreated = new EventEmitter<TodoRegistrationRequest>();
  newTodo: TodoRegistrationRequest | null = null
  enumService = inject(EnumService)

  categories: Enum [] = [];
  priorities: Enum [] = [];
  visibleTodoForm: boolean = false

  constructor() {
    this.categories = this.enumService.getValuesFromEnum(Category)
    this.priorities = this.enumService.getValuesFromEnum(Priority)
  }

  todoForm = new FormGroup({
    todo: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    priority: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });

  newTask() {
    if (this.todoForm.valid) {
      this.newTodo = {
        description: this.todoForm.value.todo!,
        category: Category[this.todoForm.value.category as keyof typeof Category],
        priority: Priority[this.todoForm.value.priority as keyof typeof Priority]
      }

      this.todoCreated.emit(this.newTodo);
      this.newTodo = {}
      this.todoForm.setValue({todo: '', priority: null, category: null})
      this.todoForm.markAsPristine()
      this.todoForm.markAsUntouched()
      this.inputNewTodo.nativeElement.focus()

      this.visibleTodoForm = false

    }
  }

  callTodoForm(){
    this.newTodo = {}
    this.visibleTodoForm = true
  }
}
