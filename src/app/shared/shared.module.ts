import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbBannerComponent } from './components/breadcrumb-banner/breadcrumb-banner.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    BreadcrumbBannerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    BreadcrumbBannerComponent
  ]
})
export class SharedModule { }
