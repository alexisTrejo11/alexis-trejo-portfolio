import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

type BadgeType = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray' | 'info';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  template: `
    <span [class]="getClasses()">
      <ng-content></ng-content>
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class Badge {
  type = input<BadgeType>('primary');
  size = input<BadgeSize>('md');
  rounded = input<boolean>(true);
  outlined = input<boolean>(false);

  getClasses(): string {
    const base = 'inline-flex items-center font-medium';
    const roundedClass = this.rounded() ? 'rounded-full' : 'rounded';

    const sizes = {
      xs: 'px-2 py-0.5 text-xs',
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-sm',
    };

    const types = {
      primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      secondary: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    };

    const outlinedTypes = {
      primary: 'border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300',
      secondary:
        'border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300',
      success: 'border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300',
      warning:
        'border border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300',
      error: 'border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300',
      gray: 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300',
      info: 'border border-cyan-300 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300',
    };

    const colorClasses = this.outlined() ? outlinedTypes[this.type()] : types[this.type()];

    return `${base} ${roundedClass} ${sizes[this.size()]} ${colorClasses}`;
  }
}
