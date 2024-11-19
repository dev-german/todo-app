import { Component, inject } from '@angular/core';
import { TodoFormComponent } from "../todo-form/todo-form.component";
import { TodoListComponent } from "../todo-list/todo-list.component";
import { Tarea } from '../../../models/tarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-todo-app',
  standalone: true,
  imports: [TodoFormComponent, TodoListComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.css'
})
export class TodoAppComponent {
  messageService = inject(MessageService);

  tareas: Tarea[] = [];

  agregarTarea(tarea: Tarea){
    this.tareas.push(tarea);
    this.messageService.add({
      severity: 'success',
      summary: 'Task created',
      detail: `Task ${tarea.nombre} saved successfully`,
    });
  }

  handleTareaEliminada(tarea: Tarea){
    this.tareas = this.tareas.filter(t => t.id !== tarea.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Task deleted',
      detail: `Task ${tarea.nombre} deleted successfully`,
    });
  }

  handleTareaModificada(tarea: Tarea){
    this.tareas.map(t => {
      if(t.id === tarea.id){
        t.nombre = tarea.nombre;
      }
    });
    console.log(this.tareas.find(t => t.id === tarea.id))
    this.messageService.add({
      severity: 'success',
      summary: 'Task updated',
      detail: `Task ${tarea.nombre} updated successfully`,
    });
  }

  handleTareaTerminada(tarea: Tarea){
    this.tareas.map(t => {
      if(t.id === tarea.id){
        console.log('tarea terminada', t.terminado)
      }
    });
  }
}
