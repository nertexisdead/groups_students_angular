import { Student } from "../students/student.model";

export interface Group {
  id: number;
  number: string; 
  studentCount: number;
  students?: Student[];
  createdAt: Date;
}
  