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

export interface Language {
  id: number;
  name: string;
  code: String;
  region: String;
  status: Boolean;
  createdDate: Date
}

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
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
export class LanguageComponent {
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

  languages: Language[] = [
    {
      id: 1,
  name: 'English',
  code: 'ENG',
  region: 'Around World',
  status: true,
  createdDate: new Date('2024-02-01')
    },
    {
      id: 2,
  name: 'Spain',
  code: 'SPA',
  region: 'Spanish',
  status: false,
  createdDate: new Date('2024-02-01')
    },
    {
      id: 3,
  name: 'Vietnamese',
  code: 'VN',
  region: 'Aisa',
  status: true,
  createdDate: new Date('2024-02-01')
    },
  ];

  get filteredLanguages(): Language[] {
    if (!this.searchQuery) return this.languages;
    const query = this.searchQuery.toLowerCase();
    return this.languages.filter(
      (language) =>
        language.name.toLowerCase().includes(query) ||
        language.region.toLowerCase().includes(query)
    );
  }

  onAddLanguage() {
    console.log('Add language clicked');
  }

  onExportList() {
    console.log('Export list clicked');
  }

  onView(language: Language) {
    console.log('View language:', language);
  }

  onEdit(language: Language) {
    console.log('Edit language:', language);
  }

  onDelete(language: Language) {
    console.log('Delete language:', language);
  }
}
