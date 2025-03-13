import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSongLinkComponent } from './delete-song-link.component';

describe('DeleteSongLinkComponent', () => {
  let component: DeleteSongLinkComponent;
  let fixture: ComponentFixture<DeleteSongLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSongLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSongLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
