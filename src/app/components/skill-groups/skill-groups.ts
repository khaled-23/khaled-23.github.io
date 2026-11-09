import { Component, input } from '@angular/core';
import { SkillGroup } from '../../models/profile';

/** Skills shown as labelled rows: group name on the left, skills on the right. */
@Component({
  selector: 'app-skill-groups',
  templateUrl: './skill-groups.html',
  styleUrl: './skill-groups.css',
})
export class SkillGroups {
  readonly groups = input.required<SkillGroup[]>();
}
