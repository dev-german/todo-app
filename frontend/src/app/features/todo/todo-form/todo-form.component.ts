import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {StyleClassModule} from 'primeng/styleclass';
import {Category} from '../../../core/models/todo/category';
import {Priority} from '../../../core/models/todo/priority';
import {TodoRegistrationRequest} from '../../../core/models/todo/todo-registration-request';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    StyleClassModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  @ViewChild('inputNewTodo') inputNewTodo!: ElementRef;
  @Output() todoCreated = new EventEmitter<TodoRegistrationRequest>();
  newTodo: TodoRegistrationRequest | null = null

  todoForm = new FormGroup({
    todo: new FormControl('', Validators.required)
  });


  newTask(){
    this.newTodo = {
      description: this.todoForm.value.todo!,
      category: Category.HOME,
      priority: Priority.MEDIUM
    }

    this.todoCreated.emit(this.newTodo);
    this.newTodo = {}
    this.todoForm.setValue({todo: ''})
    this.inputNewTodo.nativeElement.focus();
  }
}
