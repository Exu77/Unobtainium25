import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageMembersComponent } from './main-page-members.component';

describe('MainPageMembersComponent', () => {
  let component: MainPageMembersComponent;
  let fixture: ComponentFixture<MainPageMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
