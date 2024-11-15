import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';

export interface Category {
  id: number;
  name: string;
  description: String;
  createdDate: Date;
  updatedDate: Date
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
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
export class CategoryComponent {
  constructor(private datePipe: DatePipe) {}
  displayedColumns: string[] = ['name', 'description', 'createdDate', 'updatedDate', 'actions'];
  categories: Category[] = [
    {
      id: 1,
      name: 'Web Development',
      description: 'Courses related to web development, including front-end and back-end technologies.',
      createdDate: new Date('2024-01-15T08:30:00Z'),
      updatedDate: new Date('2024-10-30T10:00:00Z')
    },
    {
      id: 2,
      name: 'Data Science',
      description: 'Courses focused on data analysis, machine learning, and artificial intelligence.',
      createdDate: new Date('2024-02-20T09:00:00Z'),
      updatedDate: new Date('2024-10-25T09:30:00Z')
    },
    {
      id: 3,
      name: 'Mobile Development',
      description: 'Courses for developing mobile applications for Android and iOS platforms.',
      createdDate: new Date('2024-03-10T11:00:00Z'),
      updatedDate: new Date('2024-11-01T08:00:00Z')
    },
    {
      id: 4,
      name: 'Cloud Computing',
      description: 'Courses on cloud infrastructure, services, and deployment practices.',
      createdDate: new Date('2024-04-05T14:00:00Z'),
      updatedDate: new Date('2024-10-28T12:00:00Z')
    },
    {
      id: 5,
      name: 'Cybersecurity',
      description: 'Courses on security practices, ethical hacking, and network defense techniques.',
      createdDate: new Date('2024-05-25T16:00:00Z'),
      updatedDate: new Date('2024-10-20T15:30:00Z')
    }
  ]
  dataSource = new MatTableDataSource(this.categories);

  addCategory() {
    // Logic để thêm category mới
  }

  editCategory(category: Category) {
    // Logic để chỉnh sửa category
  }

  deleteCategory(id: number) {
    this.categories = this.categories.filter(cat => cat.id !== id);
    this.dataSource.data = this.categories;
  }

  exportCategories() {
    // Logic để xuất dữ liệu
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  viewCategory(category: Category) {
    // Logic để xem chi tiết category
    console.log('Viewing category:', category);
  }
}
