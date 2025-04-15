import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSongsComponent } from './about-songs.component';

describe('AboutSongsComponent', () => {
  let component: AboutSongsComponent;
  let fixture: ComponentFixture<AboutSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSongsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
