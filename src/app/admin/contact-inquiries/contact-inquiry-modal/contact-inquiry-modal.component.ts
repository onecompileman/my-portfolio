import { Component } from '@angular/core';
import { Contact } from '../../../shared/models/contact.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'oc-contact-inquiry-modal',
  templateUrl: './contact-inquiry-modal.component.html',
  styleUrl: './contact-inquiry-modal.component.scss',
})
export class ContactInquiryModalComponent {
  contact: Contact;

  constructor(public modalRef: BsModalRef) {}
}
