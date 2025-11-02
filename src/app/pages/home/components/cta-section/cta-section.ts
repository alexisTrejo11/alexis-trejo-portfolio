import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cta-section',
  imports: [CommonModule],
  templateUrl: './cta-section.html',
})
export class CtaSection {
  email = 'marcoalexispt.02@gmail.com';
  linkedin = 'https://github.com/alexisTrejo11';
  github = 'https://github.com/alexisTrejo11';
}
