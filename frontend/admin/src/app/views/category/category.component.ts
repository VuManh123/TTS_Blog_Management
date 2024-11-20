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
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  ButtonCloseDirective,
  PopoverDirective,
  ThemeDirective,
  TooltipDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
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
    CommonModule,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalToggleDirective,
    ButtonCloseDirective,
    PopoverDirective,
    ThemeDirective,
    TooltipDirective
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
      description: 'This is the first category',
      createdDate: new Date('2022-01-01'),
      updatedDate: new Date('2022-01-15'),
    },
    {
      id: 2,
      name: 'Category 2',
      description: 'This is the second category',
      createdDate: new Date('2022-02-01'),
      updatedDate: new Date('2022-02-10'),
    },
    {
      id: 3,
      name: 'Category 3',
      description: 'This is the third category',
      createdDate: new Date('2022-03-01'),
      updatedDate: new Date('2022-03-10'),
    },
  ];

  get filteredCategories(): Category[] {
    if (!this.searchQuery) return this.categories;
    const query = this.searchQuery.toLowerCase();
    return this.categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
    );
  }

  onAddCategory() {
    console.log('Add category clicked');
  }

  onExportList() {
    console.log('Export list clicked');
  }

  onView(category: Category) {
    console.log('View category:', category);
  }

  onEdit(category: Category) {
    console.log('Edit category:', category);
  }

  onDelete(category: Category) {
    console.log('Delete category:', category);
  }
  // Handle View and Edit
  public liveInfoVisible = false;

  toggleLiveInfo() {
    this.liveInfoVisible = !this.liveInfoVisible;
  }

  handleLiveInfoChange(event: boolean) {
    this.liveInfoVisible = event;
  }
  //Handle delete
  public liveDeleteVisible = false;

  toggleLiveDelete() {
    this.liveDeleteVisible = !this.liveDeleteVisible;
  }

  handleLiveDeleteChange(event: boolean) {
    this.liveDeleteVisible = event;
  }
}
