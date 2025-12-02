import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Host, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

interface NavLink {
  label: string;
  path: string;
  icon?: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styles: [
    `
      header {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid transparent;

        &.scrolled {
          background: rgba(255, 255, 255, 0.95);
          border-bottom-color: rgba(229, 231, 235, 1);
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
      }

      :host-context(.dark) header {
        background: rgba(3, 7, 18, 0.8);

        &.scrolled {
          background: rgba(3, 7, 18, 0.95);
          border-bottom-color: rgba(31, 41, 55, 1);
        }
      }
    `,
  ],
})
export class Header {
  isScrolled = false;
  isMobileMenuOpen = false;
  isDarkMode = false;
  currentPath = '';

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPath = event.urlAfterRedirects;
        this.isMobileMenuOpen = false; // Close mobile menu on navigation
      });

    if (this.isBrowser) {
      this.isDarkMode =
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      this.applyTheme();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  isActiveLink(path: string): boolean {
    return this.currentPath.startsWith(path);
  }

  scrollToContactCTA() {
    if (this.isBrowser) {
      const contactCTA = document.getElementById('contact-cta');
      if (contactCTA) {
        contactCTA.scrollIntoView({ behavior: 'smooth' });
      }
    }

    console.log('Scroll to Contact CTA');
  }
}
