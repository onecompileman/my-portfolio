import { Component } from '@angular/core';
import { Banner } from '../shared/models/banner.model';

@Component({
  selector: 'oc-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  banners: Banner[] = [
    {
      name: 'Home',
      route: [],

    },
    {
      name: 'Services',
      route: [],
      active: true
    }
  ]
}
