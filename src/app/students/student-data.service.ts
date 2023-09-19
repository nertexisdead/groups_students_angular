import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentDataService {
  students: Student[] = [];

  setStudents(students: Student[]) {
    this.students = students;
  }

  getStudents(): Student[] {
    return this.students;
  }
}
