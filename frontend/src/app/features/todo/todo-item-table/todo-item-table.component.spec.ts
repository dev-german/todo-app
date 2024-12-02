import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemTableComponent } from './todo-item-table.component';

describe('TodoItemTableComponent', () => {
  let component: TodoItemTableComponent;
  let fixture: ComponentFixture<TodoItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
