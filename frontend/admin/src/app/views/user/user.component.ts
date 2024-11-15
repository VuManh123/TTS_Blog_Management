import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';

export interface User {
  id: number;
  name: string;
  email: String;
  role: String;
  createdDate: Date;
  status: Boolean
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class UserComponent {
  constructor(private datePipe: DatePipe) {}
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'createdDate', 'status', 'actions'];
  users: User[] = [
    {
      id: 1,
      name: 'Dev Nguyen',
      email: 'devnguyen@gmail.com',
      role: 'user',
      createdDate: new Date('2024-01-15T08:30:00Z'),
      status: true
    },
    {
      id: 2,
      name: 'Roman Ciel',
      email: 'romanciel@gmail.com',
      role: 'admin',
      createdDate: new Date('2024-01-15T08:30:00Z'),
      status: true
    }
  ]
  dataSource = new MatTableDataSource(this.users);

  editUser(user: User) {
  }


  exportUsers() {
    // Logic để xuất dữ liệu
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  viewUser(user: User) {
    console.log('Viewing user:', user);
  }
}
