import { Component, OnInit } from '@angular/core';
import { Contact } from '../../shared/models/contact.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactDataService } from '../../core/data-services/contact.data-service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, startWith } from 'rxjs';
import { ResponseBodyList } from '../../shared/models/response-body-list.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ContactInquiryModalComponent } from './contact-inquiry-modal/contact-inquiry-modal.component';

@Component({
  selector: 'oc-contact-inquiries',
  templateUrl: './contact-inquiries.component.html',
  styleUrl: './contact-inquiries.component.scss',
})
export class ContactInquiriesComponent implements OnInit {
  contacts: Contact[];

  totalCount: number;
  pages: number[] = [];
  paginationForm: FormGroup;

  constructor(
    private contactDataService: ContactDataService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getContactList();
  }

  viewContact(contact: Contact) {
    this.modalService.show(ContactInquiryModalComponent, {
      initialState: { contact },
    });
  }

  private getContactList() {
    this.paginationForm.valueChanges
      .pipe(
        startWith({
          page: 0,
          limit: 10,
          query: '',
        }),
        debounceTime(200)
      )
      .subscribe(({ page, limit, query }) => {
        this.contactDataService
          .getAllContacts(page * limit, limit, query)
          .subscribe((blogResponse: ResponseBodyList<Contact>) => {
            this.contacts = blogResponse.data;
            this.totalCount = blogResponse.count;
            console.log(Math.ceil(blogResponse.count / limit));
            this.pages = Array(Math.ceil(blogResponse.count / limit)).fill(0).map(
              (n, i) => i + 1
            );
          });
      });
  }

  private initForm() {
    this.paginationForm = this.formBuilder.group({
      page: [0],
      limit: [10],
      query: [''],
    });
  }
}
