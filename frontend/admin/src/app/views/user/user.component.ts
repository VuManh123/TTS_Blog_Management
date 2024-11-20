import { Component } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { NgFor } from '@angular/common'; // Import NgFor cho *ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule cho [(ngModel)]
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import {
  cilList,
  cilShieldAlt,
  cilPlus,
  cilVerticalAlignBottom,
  cilZoom,
  cilPencil,
  cilTrash
} from '@coreui/icons';

export interface User {
  id: number;
  name: string;
  email: String;
  role: String;
  createdDate: Date;
  status: String
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [
    IconDirective,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    CardHeaderComponent,
    TableDirective,
    NgFor,
    FormsModule,
    CommonModule
  ],
})
export class UserComponent {
  icons = {
    cilList,
    cilShieldAlt,
    cilPlus,
    cilVerticalAlignBottom,
    cilZoom,
    cilPencil,
    cilTrash,
  };

  searchQuery: string = '';

  users: User[] = [
    {
      id: 1,
      name: 'Roman Civic',
      email: 'roman@gmail.com',
      role: 'Admin',
      createdDate: new Date('2024-02-01'),
      status: 'Active',
    },
    {
      id: 2,
      name: 'Hi Local',
      email: 'local@gmail.com',
      role: 'User',
      createdDate: new Date('2024-02-01'),
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Dev Gang',
      email: 'devgang@gmail.com',
      role: 'User',
      createdDate: new Date('2024-02-01'),
      status: 'Banned',
    }
  ];

  get filteredUsers(): User[] {
    if (!this.searchQuery) return this.users;
    const query = this.searchQuery.toLowerCase();
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  onAddUser() {
    console.log('Add user clicked');
  }

  onExportList() {
    console.log('Export list clicked');
  }

  onView(user: User) {
    console.log('View user:', user);
  }

  onEdit(user: User) {
    console.log('Edit user:', user);
  }

  onDelete(user: User) {
    console.log('Delete user:', user);
  }
}
