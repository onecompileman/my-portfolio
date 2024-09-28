import { Component, OnInit } from '@angular/core';
import { Banner } from '../shared/models/banner.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactDataService } from '../core/data-services/contact.data-service';
import { Contact } from '../shared/models/contact.model';

@Component({
  selector: 'oc-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
})
export class ContactMeComponent implements OnInit {
  banners: Banner[] = [
    {
      name: 'Home',
      route: ['/'],
    },
    {
      name: 'Contact Me',
      route: [],
      active: true,
    },
  ];

  isSending: boolean;

  successSend: boolean;
  errorSend: boolean;

  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactDataService: ContactDataService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  sendContact() {
    this.contactForm.markAllAsTouched();

    if (this.contactForm.valid && !this.isSending) {
      this.isSending = true;
      this.successSend = false;
      this.errorSend = false;

      this.contactDataService.insertContact(this.contactForm.value).subscribe(
        (contact: Contact) => {
          this.contactForm.reset();
          this.successSend = true;
          this.isSending = false;
        },
        () => {
          this.errorSend = true;
          this.isSending = false;
        }
      );
    }
  }

  private initForm() {
    this.contactForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      subject: [null],
      email: [null, [Validators.required, Validators.email]],
      message: [null, [Validators.required]],
    });
  }
}
