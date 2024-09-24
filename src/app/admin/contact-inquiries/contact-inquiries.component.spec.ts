import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInquiriesComponent } from './contact-inquiries.component';

describe('ContactInquiriesComponent', () => {
  let component: ContactInquiriesComponent;
  let fixture: ComponentFixture<ContactInquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactInquiriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
