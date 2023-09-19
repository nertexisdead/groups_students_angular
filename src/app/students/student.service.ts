import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [];

  listStudents(): Student[] {
    return this.students;
  }

  getStudentsByGroup(groupNumber: string): Student[] {
    return this.students.filter(student => student.groupNumber === groupNumber);
  }
  sortStudentsByNameAscending(): void {
    this.students.sort((a, b) => a.fullName.localeCompare(b.fullName));
  }
  addStudent(student: Student): void {
    student.id = this.students.length + 1;
    this.students.push(student);
    this.sortStudentsByNameAscending();
  }

  deleteStudent(student: Student) {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
  }
}
