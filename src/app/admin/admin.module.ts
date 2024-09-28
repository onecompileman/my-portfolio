import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ContactInquiriesComponent } from './contact-inquiries/contact-inquiries.component';
import { NewslettersComponent } from './newsletters/newsletters.component';
import { BlogFormComponent } from './blogs/blog-form/blog-form.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ContactInquiryModalComponent } from './contact-inquiries/contact-inquiry-modal/contact-inquiry-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    DashboardComponent,
    BlogsComponent,
    ContactInquiriesComponent,
    NewslettersComponent,
    BlogFormComponent,
    ContactInquiryModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    QuillModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class AdminModule { }
