import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PremiereComponent } from './premiere.component';

describe('PremiereComponent', () => {
  let component: PremiereComponent;
  let fixture: ComponentFixture<PremiereComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PremiereComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PremiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
