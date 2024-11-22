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
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';
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
  username: string;
  image: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  active: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [HttpClientModule,
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

  users: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Gọi API khi component khởi tạo
    this.userService.getUsers().subscribe(
      (response) => {
        // Kiểm tra nếu 'data' trong response là mảng
        if (Array.isArray(response.data)) {
          this.users = response.data; // Gán mảng data vào biến users
        } else {
          console.error('Data is not an array', response);
          this.users = []; // Gán mảng rỗng nếu không phải mảng
        }
      },
      (error) => {
        console.error('Error fetching users:', error); // Xử lý lỗi nếu có
        this.users = []; // Gán mảng rỗng trong trường hợp có lỗi
      }
    );
  }

  get filteredUsers(): User[] {
    if (!this.searchQuery) return this.users;
    const query = this.searchQuery.toLowerCase();
    return this.users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
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
    active: ''
  };

  onEdit() {
    if (!this.editUser.active) {
      this.editUser.active = this.selectedUser?.active || '';
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
    this.editUser = { active: ''};
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
  editUserModal(user: any) {
    this.selectedUser = user;
    this.originalUser = user;
    this.editModalVisible = !this.editModalVisible;
  }
  closeEditModal() {
    this.selectedUser = null;
    this.editModalVisible = !this.editModalVisible;
  }

  handleEditModalClose(event: boolean) {
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
