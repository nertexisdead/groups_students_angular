import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Student } from './student.model';
import { StudentService } from './student.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from '../groups/group.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from './event.service';
import { StudentDataService } from './student-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  displayedColumns: string[] = ['dateOfAdmission', 'fullName', 'actions'];
  dataSource!: MatTableDataSource<Student>;
  private studentDeletedSubscription: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  newGroupNumber: string = '';
  newGroupName: string = '';

  newStudent: Student = {
    id: 0,
    dateOfAdmission: '',
    fullName: '',
    groupNumber: '',
  };

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private cdr: ChangeDetectorRef,
    private eventService: EventService,
    private studentDataService: StudentDataService,
    private datePipe: DatePipe) {
    this.studentDeletedSubscription = this.eventService.studentDeleted$.subscribe(() => {
      this.loadStudents();
    });
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    // Получаем переданный список студентов из параметров маршрута
    this.route.paramMap.subscribe((params) => {
      const groupNumber = params.get('number');
      const state = window.history.state;

      if (state.students) {
        this.students = state.students;
        
        // Сохраняем данные студентов в сервисе StudentDataService
        this.studentDataService.students = this.students;
      }
    });
    this.dataSource = new MatTableDataSource<Student>(this.students);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.route.paramMap.subscribe((params) => {
      const groupId = params.get('id');
      if (groupId) {
        this.newGroupNumber = groupId;
      }
    });
  }

  ngOnDestroy() {
    this.studentDeletedSubscription.unsubscribe();
  }

  nextStudentId: number = 1;

  addNewStudent() {
    if (this.newStudent.fullName.trim() === '') {
      return;
    }
    const formattedDate = this.datePipe.transform(new Date(), 'dd.MM.yyyy');
    const newStudent: Student = {
      id: this.students.length + 1,
      dateOfAdmission: formattedDate,
      fullName: this.newStudent.fullName,
      groupNumber: this.newGroupNumber,
    };
    

    this.studentService.addStudent(newStudent);
    this.students.push(newStudent);
    this.dataSource.data = this.students;
    this.groupService.addStudentToGroup(this.newGroupNumber, newStudent);
    this.newStudent.fullName = '';

    this.studentDataService.students = this.students;

  }
  sortByNameAscending() {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      return a.fullName.localeCompare(b.fullName);
    });
  }

  loadStudents() {
    if (this.newGroupNumber) {
      this.students = this.studentService.getStudentsByGroup(this.newGroupNumber);
      this.dataSource.data = this.students;

      // Получаем имя группы из сервиса GroupService и установите его в свойство newGroupName
      const group = this.groupService.getGroupByNumber(this.newGroupNumber);
      if (group) {
        this.newGroupName = group.number;
      } else {
        this.newGroupName = '';
      }
    }
  }

  deleteStudent(student: Student) {
    if (!student.groupNumber) {
      return;
    }
  
    // Уменьшаем количество студентов в группе
    this.groupService.removeStudentFromGroup(student.groupNumber, student.id);
  
    // Вызываем сервис для удаления студента
    this.studentService.deleteStudent(student);
  
    // Удаляем студента из массива
    const index = this.students.findIndex((s) => s.id === student.id);
    if (index !== -1) {
      this.students.splice(index, 1);
  
      // Обновляем данные в источнике данных MatTableDataSource
      this.dataSource.data = this.students;
      this.cdr.detectChanges();
    }
  }
  
  goToGroups() {
    this.dataSource.data = this.students;
    this.router.navigate(['/groups']);
  }
}
