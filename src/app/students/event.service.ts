import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private studentDeletedSource = new Subject<void>();

  studentDeleted$ = this.studentDeletedSource.asObservable();

  announceStudentDeleted() {
    this.studentDeletedSource.next();
  }
}
