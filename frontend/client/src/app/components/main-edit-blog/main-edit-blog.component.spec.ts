import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEditBlogComponent } from './main-edit-blog.component';

describe('MainEditBlogComponent', () => {
  let component: MainEditBlogComponent;
  let fixture: ComponentFixture<MainEditBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainEditBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainEditBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
