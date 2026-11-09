import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkillGroups } from '../../components/skill-groups/skill-groups';
import { Reveal } from '../../directives/reveal';
import { PROFILE, SKILL_GROUPS } from '../../data/profile.data';

@Component({
  selector: 'app-about',
  imports: [RouterLink, SkillGroups, Reveal],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly profile = PROFILE;
  protected readonly skillGroups = SKILL_GROUPS;
}
