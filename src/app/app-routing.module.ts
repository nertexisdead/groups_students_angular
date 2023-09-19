import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: 'groups', component: GroupsComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'students/:id', component: StudentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
