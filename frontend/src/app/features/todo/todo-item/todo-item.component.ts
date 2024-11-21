import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Tarea } from '../../../core/models/tarea/tarea';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

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
  @ViewChild('nombreTarea') nombreTarea!: ElementRef;
  @Input() tarea: Tarea = {}
  @Input() first = false
  @Output() tareaEliminada = new EventEmitter<Tarea>()
  @Output() tareaModificada = new EventEmitter<Tarea>()
  @Output() tareaTerminada = new EventEmitter<Tarea>()
  tareaEditable = false

  marcaTerminado(id: string){
    console.log(this.tarea)
    this.tareaTerminada.emit(this.tarea);
  }

  marcaEditable(id: string){
    this.tareaEditable = true
    const div = this.nombreTarea.nativeElement;
    div.focus();

    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(div);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  modificarTarea(id: string, event?: any){
    console.log('evento', event.target.innerText)
    this.tarea.nombre = event.target.innerText
    this.tareaEditable = false
    this.nombreTarea.nativeElement.blur();
    this.tareaModificada.emit(this.tarea);
  }


  cancelarModificacion(){
    this.tareaEditable = false
    this.nombreTarea.nativeElement.blur();
    console.log('cancela edicion')
  }

  eliminarTarea(){
    this.confirmationService.confirm({
      header: 'Delete task',
      message: `Are you sure you want to delete <strong>${this.tarea.nombre}</strong>?`,
      accept: () => {
        console.log('eliminando tarea', this.tarea.nombre)
        this.tareaEliminada.emit(this.tarea);
        // this.customerService.delete(customer.id).subscribe({
        //   next: () => {
        //     this.findAllCustomers();
        //     this.messageService.add({
        //       severity: 'error',
        //       summary: 'Customer deleted',
        //       detail: `Customer ${customer.name} was successfully deleted`,
        //     });
        //   },
        // });
      }
    });
  }
}
