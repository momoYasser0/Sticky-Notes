import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notes } from 'src/app/Core/Interfaces/notes';
import { NoteService } from 'src/app/Core/Services/note.service';
import { SharedModule } from 'src/app/Core/Shared/shared/shared.module';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notes,
    private _NoteService: NoteService,
  ) { }

  noteForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.title ? this.data.title : ''),
    content: new FormControl(this.data.content ? this.data.content : '')
  })

  handleUserAction(form: FormGroup) {
    if (!this.data.title && !this.data.content) {
      this.addNewNote(form.value)
    } else {
      this.updateNote(form.value)
    }
  }

  addNewNote(newNote: Notes) {
    this._NoteService.addNote(newNote).subscribe({
      next: (res) => {
        if (res.msg === "done") {
          this.dialogRef.close()
        }
      }
    })
  }
  updateNote(newNote: Notes) {
    this._NoteService.updateNote(this.data._id, newNote).subscribe({
      next: (res) => {
        if (res.msg === "done") {
          this.dialogRef.close()
        }
      }
    })
  }
}
