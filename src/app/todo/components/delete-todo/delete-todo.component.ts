import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../../../../common/types/todo.type';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-todo',
  imports: [MatDialogModule, MatButtonModule, MatChipsModule, CommonModule],
  templateUrl: './delete-todo.component.html',
  styleUrl: './delete-todo.component.scss'
})
export class DeleteTodoComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public aTodo: Todo,
  ) {}

  public cancel(): void {
    this.dialogRef.close();
  }
}
