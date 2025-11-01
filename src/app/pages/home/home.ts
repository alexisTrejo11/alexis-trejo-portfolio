import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { TechStack } from './components/tech-stack/tech-stack';
import { FeaturedProjects } from './components/featured-projects/featured-projects';
import { BackendExpertise } from './components/backend-expertise/backend-expertise';
import { QuickStats } from './components/quick-stats/quick-stats';
import { CtaSection } from './components/cta-section/cta-section';

@Component({
  selector: 'app-home',
  imports: [Hero, TechStack, FeaturedProjects, BackendExpertise, QuickStats, CtaSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
