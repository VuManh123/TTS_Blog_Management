import { Component, ViewChild  } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective, TextColorDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ButtonCloseDirective, PopoverDirective, ThemeDirective, TooltipDirective } from '@coreui/angular';
import { FormDirective, FormLabelDirective, FormControlDirective, FormSelectDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {ToastersComponent} from 'src/app/views/notifications/toasters/toasters.component'
import {
  cilList,
  cilShieldAlt,
  cilPlus,
  cilVerticalAlignBottom,
  cilZoom,
  cilPencil,
  cilTrash,
} from '@coreui/icons';

export interface User {
  id: number;
  name: string;
  image: string;
  email: string;
  role: string;
  createdDate: Date;
  updatedDate: Date;
  status: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [
    ToastersComponent, FormDirective, FormLabelDirective, FormControlDirective,IconDirective, ReactiveFormsModule,TextColorDirective,CardComponent,CardBodyComponent,RowComponent,ColComponent,ButtonDirective,CardHeaderComponent,
    FormSelectDirective, TableDirective,NgFor,FormsModule,CommonModule,ModalBodyComponent,ModalComponent,ModalFooterComponent,ModalHeaderComponent,ModalTitleDirective,ModalToggleDirective,ButtonCloseDirective,PopoverDirective,ThemeDirective,TooltipDirective
  ],
})
export class UserComponent {
  @ViewChild(ToastersComponent) toastComponent!: ToastersComponent;
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
      image: 'assets/images/avatars/1.jpg',
      email: 'roman@gmail.com',
      role: 'Admin',
      createdDate: new Date('2024-02-01'),
      updatedDate: new Date('2024-02-01'),
      status: 'Active',
    },
    {
      id: 2,
      name: 'Hi Local',
      image: 'assets/images/avatars/2.jpg',
      email: 'local@gmail.com',
      role: 'User',
      createdDate: new Date('2024-02-01'),
      updatedDate: new Date('2024-02-01'),
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Dev Gang',
      image: 'assets/images/avatars/3.jpg',
      email: 'devgang@gmail.com',
      role: 'User',
      createdDate: new Date('2024-02-01'),
      updatedDate: new Date('2024-02-01'),
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

  exportToExcel(): void {
    console.log('Exporting to Excel...');
    const worksheet = XLSX.utils.json_to_sheet(this.filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    XLSX.writeFile(workbook, 'users.xlsx');
    console.log('File export completed');
    this.liveExportVisible = false;
  }

  editUser = {
    status: ''
  };

  onEdit(user: User) {
    if (!this.editUser.status) {
      this.editUser.status = this.selectedUser?.status || '';
    }

    // Tạo dữ liệu danh mục mới
    const editedUserData = {
      ...this.originalUser, // Giữ lại giá trị ban đầu
      ...this.editUser, // Ghi đè các giá trị đã thay đổi
      updatedDate: new Date(),
    };

    console.log('Edit User:', editedUserData);
    // Thực hiện logic thêm vào danh sách hoặc gọi API
    // Reset form sau khi thêm
    this.editUser = { status: ''};
    this.closeEditModal();
  }

  selectedUser: User | null = null;
  originalUser: User | null = null;  // Lưu dữ liệu ban đầu
  viewModalVisible = false;
  editModalVisible = false;
  liveExportVisible = false;

  // Modal view
  viewUser(user: any): void {
    this.selectedUser = user;
    this.viewModalVisible = true;
  }

  closeModal(): void {
    this.viewModalVisible = false;
    this.selectedUser = null;
  }

  handleModalClose(event: any): void {
    this.viewModalVisible = event;
  }

  // Modal edit
  editUserModal(user: any): void {
    this.selectedUser = user;
    this.originalUser = user;
    this.editModalVisible = true;
  }
  closeEditModal(): void {
    this.editModalVisible = false;
    this.selectedUser = null;
  }

  handleEditModalClose(event: any): void {
    this.editModalVisible = event;
  }

  //Modal export
  toggleLiveExport() {
    this.liveExportVisible = !this.liveExportVisible;
  }

  handleLiveExportChange(event: boolean) {
    this.liveExportVisible = event;
  }
}
