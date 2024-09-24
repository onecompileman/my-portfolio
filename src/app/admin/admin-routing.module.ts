import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ContactInquiriesComponent } from './contact-inquiries/contact-inquiries.component';
import { NewslettersComponent } from './newsletters/newsletters.component';
import { BlogFormComponent } from './blogs/blog-form/blog-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'blogs',
        component: BlogsComponent
      },
      {
        path: 'blogs/new-blog',
        component: BlogFormComponent
      },
      {
        path: 'contact-inquiries',
        component: ContactInquiriesComponent
      },
      {
        path: 'newsletter',
        component: NewslettersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
