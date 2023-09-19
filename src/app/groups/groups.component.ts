import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from './group.model';
import { GroupService } from './group.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GroupCountService } from '../groups/group-count.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../students/student.model';
import { StudentService } from '../students/student.service';
import { StudentDataService } from '../students/student-data.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];
  displayedColumns: string[] = ['number', 'studentCount', 'actions'];
  dataSource!: MatTableDataSource<Group>;
  studentDataSource!: MatTableDataSource<Student>;
  students: Student[] = []; // Источник данных для студентов

  newGroupNumber: string = '';

  constructor(
    private groupService: GroupService, 
    private router: Router, 
    private groupCountService: GroupCountService, 
    private route: ActivatedRoute,
    private studentService: StudentService,
    private studentDataService: StudentDataService // Добавляем сервис для студентов
  ) {}

  ngOnInit(): void {
    this.groups = this.groupService.getGroups();
    this.groups.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.dataSource = new MatTableDataSource(this.groups);

    // Создаем источник данных для студентов
    this.studentDataSource = new MatTableDataSource();

    this.route.paramMap.subscribe(params => {
      const groupNumber = params.get('number');
      if (groupNumber) {
        this.newGroupNumber = groupNumber;
  
          this.loadStudents();
        }
    });
  }

  loadStudents() {
    if (this.newGroupNumber) {
      // Используем сервис StudentService для загрузки студентов по номеру группы
      const students = this.studentService.getStudentsByGroup(this.newGroupNumber);

      // Обновляем данные в источнике данных MatTableDataSource для студентов
      this.studentDataSource.data = students;

      // Устанавливаем данные о студентах в сервисе
      this.studentDataService.setStudents(students);
    }
  }

  addNewGroup() {
    if (this.newGroupNumber.trim() === '') {
      return;
    }
  
    const newGroup: Group = {
      id: this.groups.length + 1,
      number: this.newGroupNumber,
      studentCount: 0,
      createdAt: new Date()
    };
  
    this.groups.push(newGroup);
    this.dataSource.data = this.groups;
  
    this.newGroupNumber = '';
    this.router.navigate(['/students', newGroup.number]);

    // Сохраняем данные о студентах в сервисе StudentDataService
    this.studentDataService.setStudents([]);
  }
  
  editGroup(group: Group) {
    // Получаем список студентов для выбранной группы
    const students = this.studentService.getStudentsByGroup(group.number);
  
    // Передаем список студентов в параметрах маршрута
    this.router.navigate(['/students', group.number], { state: { students } });
  }

  getStudentCount(groupNumber: string): number {
    return this.groupCountService.getGroupCount(groupNumber);
  }  
}
