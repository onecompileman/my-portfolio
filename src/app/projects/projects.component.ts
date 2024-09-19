import { Component, OnInit } from '@angular/core';
import { Banner } from '../shared/models/banner.model';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

@Component({
  selector: 'oc-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  banners: Banner[] = [
    {
      name: 'Home',
      route: ['/'],

    },
    {
      name: 'Projects',
      route: [],
      active: true
    }
  ]

  ngOnInit(): void {
    this.initLightbox();
  }

  private initLightbox() {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '.oc-projects__carousel',
      children: '.slide-item',
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();
  }
}
