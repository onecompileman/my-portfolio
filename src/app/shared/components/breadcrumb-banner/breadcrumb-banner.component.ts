import { Component, Input } from '@angular/core';
import { Banner } from '../../models/banner.model';

@Component({
  selector: 'oc-breadcrumb-banner',
  templateUrl: './breadcrumb-banner.component.html',
  styleUrl: './breadcrumb-banner.component.scss'
})
export class BreadcrumbBannerComponent {
  @Input() title: string = '';
  @Input() banners: Banner[] = [];
}
