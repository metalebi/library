import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicGridMasterDetailRendererComponent } from './magic-grid-master-detail-renderer.component';

describe('MagicGridMasterDetailRendererComponent', () => {
  let component: MagicGridMasterDetailRendererComponent;
  let fixture: ComponentFixture<MagicGridMasterDetailRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagicGridMasterDetailRendererComponent]
    });
    fixture = TestBed.createComponent(MagicGridMasterDetailRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
