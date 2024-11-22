import { Component, ViewChild, OnInit  } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective, TextColorDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ButtonCloseDirective, PopoverDirective, ThemeDirective, TooltipDirective } from '@coreui/angular';
import { FormDirective, FormLabelDirective, FormControlDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {ToastersComponent} from 'src/app/views/notifications/toasters/toasters.component'
import { CategoryService } from 'src/app/services/category.service';
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

export interface Category {
  id: number;
  image: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [ HttpClientModule,
    ToastersComponent, FormDirective, FormLabelDirective, FormControlDirective,IconDirective, ReactiveFormsModule,TextColorDirective,CardComponent,CardBodyComponent,RowComponent,ColComponent,ButtonDirective,CardHeaderComponent,
    TableDirective,NgFor,FormsModule,CommonModule,ModalBodyComponent,ModalComponent,ModalFooterComponent,ModalHeaderComponent,ModalTitleDirective,ModalToggleDirective,ButtonCloseDirective,PopoverDirective,ThemeDirective,TooltipDirective
  ],
})
export class CategoryComponent implements OnInit{
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

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    // Gọi API khi component khởi tạo
    this.categoryService.getCategories().subscribe(
      (response) => {
        // Kiểm tra nếu 'data' trong response là mảng
        if (Array.isArray(response.data)) {
          this.categories = response.data; // Gán mảng data vào biến languages
        } else {
          console.error('Data is not an array', response);
          this.categories = []; // Gán mảng rỗng nếu không phải mảng
        }
      },
      (error) => {
        console.error('Error fetching languages:', error); // Xử lý lỗi nếu có
        this.categories = []; // Gán mảng rỗng trong trường hợp có lỗi
      }
    );
  }

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
      this.toastComponent.addToastWithParams('Error', 'You must fill all of infomations', 'danger', 'top-end', true);
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

  onEdit() {
    if (!this.newCategory.image) {
      this.newCategory.image = this.selectedCategory?.image || '';
    }
    if (!this.newCategory.name) {
      this.newCategory.name = this.selectedCategory?.name || '';
    }
    if (!this.newCategory.description) {
      this.newCategory.description = this.selectedCategory?.description || '';
    }

    // Tạo dữ liệu danh mục mới
    const editedCategoryData = {
      ...this.originalCategory, // Giữ lại giá trị ban đầu
      ...this.newCategory, // Ghi đè các giá trị đã thay đổi
      updatedDate: new Date(),
    };

    console.log('Edit Category:', editedCategoryData);
    // Thực hiện logic thêm vào danh sách hoặc gọi API

    // Reset form sau khi thêm
    this.newCategory = { name: '', description: '', image: '' };
    this.selectedFile = null;
    this.closeEditModal();
  }


  selectedCategory: Category | null = null;
  originalCategory: Category | null = null;  // Lưu dữ liệu ban đầu
  viewModalVisible = false;
  editModalVisible = false;
  liveDeleteVisible = false;
  liveExportVisible = false;
  addModalVisible = false;

  onDelete(category: Category | null) {
    if (!category) {
      console.error('No language selected for deletion');
      return;
    }
    console.log('Delete Language:', category);
    // Thêm logic xóa ở đây
    this.toggleLiveDelete(); // Đóng modal sau khi xóa
  }

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
    this.originalCategory = category;
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
