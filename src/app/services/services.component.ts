import { Component } from '@angular/core';
import { Banner } from '../shared/models/banner.model';
import { SkillGroup } from '../shared/models/skill.model';
import { SkillGroups } from '../shared/data/skills.data';

@Component({
  selector: 'oc-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  banners: Banner[] = [
    {
      name: 'Home',
      route: ['/'],

    },
    {
      name: 'Services',
      route: [],
      active: true
    }
  ]
  
  skillGroups: SkillGroup[] = SkillGroups;
}
