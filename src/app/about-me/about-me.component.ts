import { Component, OnInit } from '@angular/core';
import { Banner } from '../shared/models/banner.model';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { Experience } from '../shared/models/experience.model';
import { Experiences } from '../shared/data/experiences.data';
@Component({
  selector: 'oc-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit {
  banners: Banner[] = [
    {
      name: 'Home',
      route: ['/'],

    },
    {
      name: 'About Me',
      route: [],
      active: true
    }
  ];

  experiences: Experience[] = Experiences;

  ngOnInit(): void {
    this.initLightbox();
  }

  private initLightbox() {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '.oc-about-me__carousel',
      children: '.slide-item',
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();
  }
}
