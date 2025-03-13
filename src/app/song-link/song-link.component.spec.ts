import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongLinkComponent } from './song-link.component';

describe('SongLinkComponent', () => {
  let component: SongLinkComponent;
  let fixture: ComponentFixture<SongLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
