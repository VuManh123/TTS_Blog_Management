import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective, TextColorDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ButtonCloseDirective, PopoverDirective, ThemeDirective, TooltipDirective } from '@coreui/angular';
import { FormDirective, FormLabelDirective, FormControlDirective, FormSelectDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ToastersComponent } from 'src/app/views/notifications/toasters/toasters.component'
import { LanguageService } from 'src/app/services/language.service';
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

export interface Language {
  id: number;
  name: string;
  code: string;
  region: string;
  status: string;
  createdAt: Date
}

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [HttpClientModule,
    FormSelectDirective, ToastersComponent, FormDirective, FormLabelDirective, FormControlDirective, IconDirective, ReactiveFormsModule, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, CardHeaderComponent,
    TableDirective, NgFor, FormsModule, CommonModule, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ButtonCloseDirective, PopoverDirective, ThemeDirective, TooltipDirective
  ],
})
export class LanguageComponent implements OnInit {
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

  languages: Language[] = [];

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    // Gọi API khi component khởi tạo
    this.languageService.getLanguages().subscribe(
      (response) => {
        // Kiểm tra nếu 'data' trong response là mảng
        if (Array.isArray(response.data)) {
          this.languages = response.data; // Gán mảng data vào biến languages
        } else {
          console.error('Data is not an array', response);
          this.languages = []; // Gán mảng rỗng nếu không phải mảng
        }
      },
      (error) => {
        console.error('Error fetching languages:', error); // Xử lý lỗi nếu có
        this.languages = []; // Gán mảng rỗng trong trường hợp có lỗi
      }
    );
  }

  get filteredLanguages(): Language[] {
    if (!this.searchQuery) return this.languages;
    const query = this.searchQuery.toLowerCase();
    return this.languages.filter(
      (language) =>
        language.name.toLowerCase().includes(query) ||
        language.region.toLowerCase().includes(query)
    );
  }

  exportToExcel(): void {
    console.log('Exporting to Excel...');
    const worksheet = XLSX.utils.json_to_sheet(this.filteredLanguages);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Languages');

    XLSX.writeFile(workbook, 'languages.xlsx');
    console.log('File export completed');
    this.liveExportVisible = false;
  }

  newLanguage = {
    name: '',
    code: '',
    region: '',
    status: '',
  };

  // Hàm thêm danh mục mới
  addNewLanguage(): void {
    console.log('Clicked New Language!')
    if (!this.newLanguage.name || !this.newLanguage.code || !this.newLanguage.region || !this.newLanguage.status) {
      this.toastComponent.addToastWithParams('Error', 'You must fill all of infomations', 'danger', 'top-end', true);
      return;
    }

    // Tạo dữ liệu danh mục mới
    const newLanguageData = {
      ...this.newLanguage,
      createdDate: new Date(),
    };

    console.log('New Language:', newLanguageData);
    // Thực hiện logic thêm vào danh sách hoặc gọi API

    // Reset form sau khi thêm
    this.newLanguage = { name: '', code: '', region: '', status: '', };
    this.closeAddModal();
  }

  onEdit() {
    if (!this.newLanguage.name) {
      this.newLanguage.name = this.selectedLanguage?.name || '';
    }
    if (!this.newLanguage.code) {
      this.newLanguage.code = this.selectedLanguage?.code || '';
    }
    if (!this.newLanguage.region) {
      this.newLanguage.region = this.selectedLanguage?.region || '';
    }
    if (!this.newLanguage.status) {
      this.newLanguage.status = this.selectedLanguage?.status || '';
    }

    // Tạo dữ liệu danh mục mới
    const editedLanguageData = {
      ...this.originalLanguage, // Giữ lại giá trị ban đầu
      ...this.newLanguage, // Ghi đè các giá trị đã thay đổi
    };

    console.log('Edit Language:', editedLanguageData);
    // Thực hiện logic thêm vào danh sách hoặc gọi API

    // Reset form sau khi thêm
    this.newLanguage = { name: '', code: '', region: '', status: '', };
    this.closeEditModal();
  }



  selectedLanguage: Language | null = null;
  originalLanguage: Language | null = null;  // Lưu dữ liệu ban đầu
  viewModalVisible = false;
  editModalVisible = false;
  liveDeleteVisible = false;
  liveExportVisible = false;
  addModalVisible = false;

  // Modal edit
  editLanguage(language: any): void {
    this.selectedLanguage = language;
    this.originalLanguage = language;
    this.editModalVisible = true;
  }
  closeEditModal(): void {
    this.editModalVisible = false;
    this.selectedLanguage = null;
  }

  handleEditModalClose(event: any): void {
    this.editModalVisible = event;
  }

  //Modal delete
  toggleLiveDelete(language: any): void {
    this.selectedLanguage = language;
    this.liveDeleteVisible = !this.liveDeleteVisible;
  }
  closeDeleteModal(): void {
    this.liveDeleteVisible = false;
    this.selectedLanguage = null;
  }

  handleLiveDeleteChange(event: boolean) {
    this.liveDeleteVisible = event;
  }
  onDelete(language: Language | null) {
    if (!language) {
      console.error('No language selected for deletion');
      return;
    }
    console.log('Delete Language:', language);
    // Thêm logic xóa ở đây
    this.closeDeleteModal(); // Đóng modal sau khi xóa
  }

  //Modal export
  toggleLiveExport() {
    this.liveExportVisible = !this.liveExportVisible;
  }

  handleLiveExportChange(event: boolean) {
    this.liveExportVisible = event;
  }

  // Modal add
  addLanguage(): void {
    this.addModalVisible = true;
  }
  closeAddModal(): void {
    this.addModalVisible = false;
  }

  handleAddModalClose(event: any): void {
    this.addModalVisible = event;
  }
}
