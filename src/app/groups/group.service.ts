import { Injectable } from '@angular/core';
import { Group } from './group.model';
import { Student } from '../students/student.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups: Group[] = [];

  createGroup(newGroup: Group) {
    this.groups.push(newGroup);
  }
  
  getGroups(): Group[] {
    return this.groups;
  }
  getGroupByNumber(groupNumber: string): Group | undefined {
    return this.groups.find((group) => group.number === groupNumber);
  }

  addStudentToGroup(groupNumber: string, student: Student): void {
    const group = this.groups.find(group => group.number === groupNumber);
  
    if (group) {
      if (!group.students) {
        group.students = [];
      }
  
      group.students.push(student);
      group.studentCount++;
      console.log(student)
    }
  }
  removeStudentFromGroup(groupNumber: string, studentId: number): void {
    const group = this.groups.find(g => g.number === groupNumber);
    if (group) {
      group.studentCount--;

      // Проверяем, есть ли у группы свойство students, и если нет, создаем пустой массив
      if (!group.students) {
        group.students = [];
      }

      // Теперь нужно найти студента внутри группы и удалить его
      const studentIndex = group.students.findIndex(s => s.id === studentId);
      if (studentIndex !== -1) {
        group.students.splice(studentIndex, 1);
        console.log(studentIndex)
      }
    }
  }
}
