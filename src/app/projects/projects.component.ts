import { Component, OnInit } from '@angular/core';
import { Banner } from '../shared/models/banner.model';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { Project } from '../shared/models/project.model';
import { Projects } from '../shared/data/projects.data';

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
  ];
  projects: Project[] = Projects;

  ngOnInit(): void {
    setTimeout(() => {
      this.initLightbox();
    }, 100)
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
