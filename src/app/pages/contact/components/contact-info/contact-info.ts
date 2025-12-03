import { Component } from '@angular/core';

interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  link: string;
  description: string;
}

@Component({
  selector: 'app-contact-info',
  imports: [],
  template: `<div class="space-y-8">
    <!-- Contact Methods -->
    <div class="card p-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Other Ways to Reach Me</h2>

      <div class="space-y-4">
        @for(method of contactMethods; track $index) {

        <a
          [href]="method.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-start gap-4 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-800 hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-300 group"
        >
          <div class="text-4xl transform group-hover:scale-110 transition-transform">
            {{ method.icon }}
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-gray-900 dark:text-white mb-1">
              {{ method.title }}
            </h3>
            <p class="text-blue-600 dark:text-blue-400 font-mono text-sm mb-1">
              {{ method.value }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ method.description }}
            </p>
          </div>
          <svg
            class="w-5 h-5 text-gray-400 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
        }
      </div>
    </div>

    <!-- Availability Card -->
    <div
      class="card p-8 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-2 border-green-200 dark:border-green-800"
    >
      <div class="flex items-start gap-4">
        <div class="text-4xl">✅</div>
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Currently Available</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            I'm open to new opportunities and projects. Whether you need a backend engineer for your
            team or help with a specific project, let's chat!
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="badge badge-success">Backend Development</span>
            <span class="badge badge-success">API Design</span>
            <span class="badge badge-success">Cloud Infrastructure</span>
            <span class="badge badge-success">Consulting</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Location & Timezone -->
    <div class="card p-8">
      <h3 class="font-bold text-gray-900 dark:text-white mb-4">📍 Location & Availability</h3>
      <div class="space-y-3 text-gray-600 dark:text-gray-400">
        <p class="flex items-center gap-2">
          <span class="font-semibold">Based in:</span>
          Mexico City, Mexico
        </p>
        <p class="flex items-center gap-2">
          <span class="font-semibold">Timezone:</span>
          CST (UTC-6)
        </p>
        <p class="flex items-center gap-2">
          <span class="font-semibold">Remote:</span>
          Available worldwide
        </p>
      </div>
    </div>
  </div>`,
})
export class ContactInfo {
  contactMethods: ContactMethod[] = [
    {
      icon: '📧',
      title: 'Email',
      value: 'marcoalexispt.02@gmail.com',
      link: 'mailto:marcoalexispt.02@gmail.com',
      description: 'Best for detailed project discussions',
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: '/in/alexis-trejo-079494298',
      link: 'https://linkedin.com/in/alexis-trejo-079494298',
      description: "Let's connect professionally",
    },
    {
      icon: '💻',
      title: 'GitHub',
      value: '@alexisTrejo11',
      link: 'https://github.com/alexisTrejo11',
      description: 'Check out my open source work',
    },
    {
      icon: '📱',
      title: 'X',
      value: '@TReyna5079',
      link: 'https://x.com/TReyna50792',
      description: 'Follow for tech insights',
    },
  ];
}
