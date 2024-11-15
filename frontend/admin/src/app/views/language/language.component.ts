import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';

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
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class LanguageComponent {
  constructor(private datePipe: DatePipe) {}
  displayedColumns: string[] = ['id', 'name', 'code', 'region', 'status', 'createdDate', 'actions'];
  languages: Language[] = [
    {
      id: 1,
      name: 'English',
      code: 'EN',
      region: 'Worldwide',
      status: true,
      createdDate: new Date('2024-01-15T08:30:00Z')
    },
    {
      id: 2,
      name: 'Spanish',
      code: 'ES',
      region: 'Spain, Latin America',
      status: true,
      createdDate: new Date('2024-01-15T08:30:00Z')
    }
  ]
  dataSource = new MatTableDataSource(this.languages);

  addLanguage() {
    
  }

  editLanguage(language: Language) {
    
  }

  deleteLanguage(id: number) {
    this.languages = this.languages.filter(cat => cat.id !== id);
    this.dataSource.data = this.languages;
  }

  exportLanguages() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  viewLanguage(language: Language) {
    
    console.log('Viewing language:', language);
  }
}
