import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInquiryModalComponent } from './contact-inquiry-modal.component';

describe('ContactInquiryModalComponent', () => {
  let component: ContactInquiryModalComponent;
  let fixture: ComponentFixture<ContactInquiryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactInquiryModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInquiryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
