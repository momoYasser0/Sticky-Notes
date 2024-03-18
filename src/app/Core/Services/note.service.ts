import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/base-url';
import { Notes } from '../Interfaces/notes';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient: HttpClient) { }

  addNote(newNote: Notes): Observable<any> {
    return this._HttpClient.post(environment.noteURl, newNote)
  }
  getUserNotes(): Observable<any> {
    return this._HttpClient.get(environment.noteURl)
  }
  updateNote(id: any, userNote: object): Observable<any> {
    return this._HttpClient.put(environment.noteURl + `${id}`, userNote)
  }
  deleteNote(NoteId: any): Observable<any> {
    return this._HttpClient.delete(environment.noteURl + `${NoteId}`)
  }
}
