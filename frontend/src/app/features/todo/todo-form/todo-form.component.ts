import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { Tarea } from '../../../core/models/tarea/tarea';
import { v4 as uuid } from 'uuid';

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
  @ViewChild('inputNuevaTarea') inputNuevaTarea!: ElementRef;
  @Output() tareaCreada = new EventEmitter<Tarea>();
  focoEnTarea = false;
  placeholderTarea = 'Agrega una tarea...'
  nuevaTarea: Tarea | null = null

  tareaForm = new FormGroup({
    tarea: new FormControl('', Validators.required)
  });


  agregarTarea(){
    this.nuevaTarea = {
      id: uuid(),
      nombre: this.tareaForm.value.tarea!,
      terminado: false,
      fechaCreacion: new Date()
    }
    console.log(this.nuevaTarea)
    this.tareaCreada.emit(this.nuevaTarea);
    this.nuevaTarea = {}
    this.tareaForm.setValue({tarea: ''})
    this.inputNuevaTarea.nativeElement.focus();
  }
}
