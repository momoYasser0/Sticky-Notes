import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Notes } from 'src/app/Core/Interfaces/notes';
import { FilterPipe } from 'src/app/Core/Pipes/filter.pipe';
import { NoteService } from 'src/app/Core/Services/note.service';
import { SharedModule } from 'src/app/Core/Shared/shared/shared.module';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, FilterPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchValue: string = ''
  constructor(public dialog: MatDialog, private _NoteService: NoteService, private _Router: Router) { }
  allNotes: Notes[] = []


  ngOnInit(): void {
    this._NoteService.getUserNotes().subscribe({
      next: (Response) => {
        if (Response.msg == 'done') {
          this.allNotes = Response.notes
        }

      }, error: (err) => {
        if (err.error.msg == 'user not found') {
          this._Router.navigate(['/login'])
        }

      }
    })
  }

  updateNote(note: Notes): void {

    this.openDialog({ title: note.title, content: note.content, _id: note._id })

  }
  deleteNote(deletedNote: string, noteIndex: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(() => this._NoteService.deleteNote(deletedNote).subscribe({
          next: (Response) => {
            if (Response.msg == 'done') {
              this.allNotes.splice(noteIndex, 1);
              this.ngOnInit()
            }

          }
        })
        );
      }
    });

  }



  openDialog(noteData?: Notes): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: { title: noteData?.title, content: noteData?.content, _id: noteData?._id },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
}
