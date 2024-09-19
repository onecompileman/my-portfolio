import { Component } from '@angular/core';
import { Banner } from '../shared/models/banner.model';

@Component({
  selector: 'oc-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent {
  banners: Banner[] = [
    {
      name: 'Home',
      route: ['/'],

    },
    {
      name: 'Contact Me',
      route: [],
      active: true
    }
  ];
}
