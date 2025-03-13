import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongLevelComponent } from './song-level.component';

describe('SongLevelComponent', () => {
  let component: SongLevelComponent;
  let fixture: ComponentFixture<SongLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
