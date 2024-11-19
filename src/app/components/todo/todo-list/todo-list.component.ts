import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { Tarea } from '../../../models/tarea';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

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

  @Input() tareas: Tarea[] = [];
  @Output() notifyTareaEliminada = new EventEmitter<Tarea>();
  @Output() notifyTareaModificada = new EventEmitter<Tarea>();
  @Output() notifyTareaTerminada = new EventEmitter<Tarea>();

  constructor(){
    
  }

  handleNotifyTareaEliminada(tarea: Tarea) {
    this.notifyTareaEliminada.emit(tarea);
  }

  handleNotifyTareaModificada(tarea: Tarea) {
    this.notifyTareaModificada.emit(tarea);
  }

  handleNotifyTareaTerminada(tarea: Tarea) {
    this.notifyTareaTerminada.emit(tarea);
  }
}
