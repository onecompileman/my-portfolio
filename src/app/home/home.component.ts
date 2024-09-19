import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project.model';
import { FeaturedProjects, Projects } from '../shared/data/projects.data';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

@Component({
  selector: 'oc-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  projects: Project[] = FeaturedProjects;

  ngOnInit(): void {
    setTimeout(() => {
      this.initLightbox();
    }, 100);
  }

  private initLightbox() {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '.oc-home__carousel',
      children: '.slide-item',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
  }
}
