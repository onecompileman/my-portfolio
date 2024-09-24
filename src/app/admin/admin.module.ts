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


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    DashboardComponent,
    BlogsComponent,
    ContactInquiriesComponent,
    NewslettersComponent,
    BlogFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    QuillModule
  ]
})
export class AdminModule { }
