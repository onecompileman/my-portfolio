import { Component, OnInit } from '@angular/core';
import { Banner } from '../shared/models/banner.model';
import { Talk } from '../shared/models/talk.model';
import { Talks } from '../shared/data/talks.data';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

@Component({
  selector: 'oc-talks',
  templateUrl: './talks.component.html',
  styleUrl: './talks.component.scss'
})
export class TalksComponent implements OnInit {
  banners: Banner[] = [
    {
      name: 'Home',
      route: ['/'],

    },
    {
      name: 'Talks',
      route: [],
      active: true
    }
  ];

  talks: Talk[] = Talks;
  
  ngOnInit(): void {
    setTimeout(() => {
      this.initLightbox();
    }, 100)
  }

  private initLightbox() {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '.oc-talks__talk-item',
      children: '.slide-item',
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();
  }
}
