import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {StyleClassModule} from 'primeng/styleclass';
import {Category} from '../../../core/models/todo/category';
import {Priority} from '../../../core/models/todo/priority';
import {TodoRegistrationRequest} from '../../../core/models/todo/todo-registration-request';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    StyleClassModule,
    DropdownModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  @ViewChild('inputNewTodo') inputNewTodo!: ElementRef;
  @Output() todoCreated = new EventEmitter<TodoRegistrationRequest>();
  newTodo: TodoRegistrationRequest | null = null

  categories = [
    { value: Category.HOME, label: 'HOME' },
    { value: Category.PERSONAL, label: 'PERSONAL' },
    { value: Category.WORK, label: 'WORK' }
  ];

  categorySelected: any = null;

  priorities = [
    { value: Priority.HIGH, label: "HIGH" },
    { value: Priority.MEDIUM, label: "MEDIUM" },
    { value: Priority.LOW, label: "LOW" }
  ];

  prioritySelected: any;

  todoForm = new FormGroup({
    todo: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });


  newTask(){
    this.newTodo = {
      description: this.todoForm.value.todo!,
      category: this.categorySelected,
      priority: this.prioritySelected
    }

    this.todoCreated.emit(this.newTodo);
    this.newTodo = {}
    this.todoForm.setValue({todo: '', priority: null, category: null})
    this.inputNewTodo.nativeElement.focus();
  }
}
