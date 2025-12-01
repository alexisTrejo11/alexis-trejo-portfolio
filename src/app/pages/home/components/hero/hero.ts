import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
})
export class Hero implements OnInit {
  displayText = signal('');
  private fullText = ' Building scalable backend systems'; // Starts empty to be filled by typing effect
  private typingSpeed = 60;
  private initialDelay = 200;
  private router = inject(Router);

  ngOnInit(): void {
    this.startTypingEffect();
  }

  private startTypingEffect(): void {
    let index = 0;
    this.displayText.set('');

    const typeCharacter = () => {
      if (index < this.fullText.length) {
        this.displayText.update((current) => current + this.fullText.charAt(index));
        index++;
        setTimeout(typeCharacter, this.typingSpeed);
      }
    };

    setTimeout(typeCharacter, this.initialDelay);
  }

  scrollToProjects() {
    document.querySelector('#featured-projects')?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
