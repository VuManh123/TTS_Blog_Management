import { Component } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective, TextColorDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ButtonCloseDirective, PopoverDirective, ThemeDirective, TooltipDirective } from '@coreui/angular';
import { FormDirective, FormLabelDirective, FormControlDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  cilList,
  cilShieldAlt,
  cilPlus,
  cilVerticalAlignBottom,
  cilZoom,
  cilPencil,
  cilTrash,
} from '@coreui/icons';

export interface Category {
  id: number;
  image: string;
  name: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [
    FormDirective, FormLabelDirective, FormControlDirective,IconDirective, ReactiveFormsModule,TextColorDirective,CardComponent,CardBodyComponent,RowComponent,ColComponent,ButtonDirective,CardHeaderComponent,
    TableDirective,NgFor,FormsModule,CommonModule,ModalBodyComponent,ModalComponent,ModalFooterComponent,ModalHeaderComponent,ModalTitleDirective,ModalToggleDirective,ButtonCloseDirective,PopoverDirective,ThemeDirective,TooltipDirective
  ],
})
export class CategoryComponent {
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

  categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      image: 'assets/images/angular.jpg',
      description: 'This is the first category',
      createdDate: new Date('2022-01-01'),
      updatedDate: new Date('2022-01-15'),
    },
    {
      id: 2,
      name: 'Category 2',
      image: 'assets/images/react.jpg',
      description: 'This is the second category',
      createdDate: new Date('2022-02-01'),
      updatedDate: new Date('2022-02-10'),
    },
    {
      id: 3,
      name: 'Category 3',
      image: 'assets/images/vue.jpg',
      description: 'This is the third category',
      createdDate: new Date('2022-03-01'),
      updatedDate: new Date('2022-03-10'),
    },
  ];

  exportToExcel(): void {
    console.log('Exporting to Excel...');
    const worksheet = XLSX.utils.json_to_sheet(this.filteredCategories);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Categories');

    XLSX.writeFile(workbook, 'categories.xlsx');
    console.log('File export completed');
    this.liveExportVisible = false;
  }

  get filteredCategories(): Category[] {
    if (!this.searchQuery) return this.categories;
    const query = this.searchQuery.toLowerCase();
    return this.categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
    );
  }

  newCategory = {
    name: '',
    description: '',
    image: '', // Chỉ lưu tên ảnh
  };

  // Biến để lưu dữ liệu file đã chọn
  selectedFile: File | null = null;
  // Hàm xử lý khi chọn file
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Lưu tên file và tạo đường dẫn tương đối
      this.newCategory.image = `assets/images/${file.name}`;
    }
  }

  // Hàm thêm danh mục mới
  addNewCategory(): void {
    if (!this.newCategory.name || !this.newCategory.description || !this.newCategory.image) {
      alert('Please fill out all fields and select an image.');
      return;
    }

    // Tạo dữ liệu danh mục mới
    const newCategoryData = {
      ...this.newCategory,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    console.log('New Category:', newCategoryData);
    // Thực hiện logic thêm vào danh sách hoặc gọi API

    // Reset form sau khi thêm
    this.newCategory = { name: '', description: '', image: '' };
    this.selectedFile = null;
    this.closeAddModal();
  }

  onEdit(category: Category) {
    console.log('Edit category:', category);
  }

  onDelete(category: Category) {
    console.log('Delete category:', category);
  }

  selectedCategory: any = null;
  viewModalVisible = false;
  editModalVisible = false;
  liveDeleteVisible = false;
  liveExportVisible = false;
  addModalVisible = false;

  // Modal view
  viewCategory(category: any): void {
    this.selectedCategory = category;
    this.viewModalVisible = true;
  }

  closeModal(): void {
    this.viewModalVisible = false;
    this.selectedCategory = null;
  }

  handleModalClose(event: any): void {
    this.viewModalVisible = event;
  }

  // Modal edit
  editCategory(category: any): void {
    this.selectedCategory = category;
    this.editModalVisible = true;
  }
  closeEditModal(): void {
    this.editModalVisible = false;
    this.selectedCategory = null;
  }

  handleEditModalClose(event: any): void {
    this.editModalVisible = event;
  }

  //Modal delete
  toggleLiveDelete() {
    this.liveDeleteVisible = !this.liveDeleteVisible;
  }

  handleLiveDeleteChange(event: boolean) {
    this.liveDeleteVisible = event;
  }

  //Modal export
  toggleLiveExport() {
    this.liveExportVisible = !this.liveExportVisible;
  }

  handleLiveExportChange(event: boolean) {
    this.liveExportVisible = event;
  }

  // Modal add
  addCategory(): void {
    this.addModalVisible = true;
  }
  closeAddModal(): void {
    this.addModalVisible = false;
  }

  handleAddModalClose(event: any): void {
    this.addModalVisible = event;
  }
}
