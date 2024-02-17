import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicLibComponent } from './magic-lib.component';

describe('MagicLibComponent', () => {
  let component: MagicLibComponent;
  let fixture: ComponentFixture<MagicLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagicLibComponent]
    });
    fixture = TestBed.createComponent(MagicLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
