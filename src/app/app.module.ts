import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { StudentsComponent } from './students/students.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GroupCountService } from './groups/group-count.service';
import { EventService } from './students/event.service';
import { HttpClientModule } from '@angular/common/http';
import { DataUpdateService } from './groups/data-update.service';
import { StudentDataService } from './students/student-data.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [
    GroupCountService,
    EventService,
    DataUpdateService,
    StudentDataService,
    DatePipe 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
