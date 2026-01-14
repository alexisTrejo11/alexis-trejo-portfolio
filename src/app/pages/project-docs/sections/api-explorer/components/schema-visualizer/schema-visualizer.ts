import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schema-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schema-visualizer.html',
})
export class SchemaVisualizer {
  @Input() schema: any;
  title: string = 'Schema';

  getPropertyKeys(): string[] {
    return Object.keys(this.schema?.properties || {});
  }

  getPropertyType(key: string): string {
    return this.schema?.properties[key]?.type || 'any';
  }

  isRequired(key: string): boolean {
    return this.schema?.required?.includes(key) || false;
  }

  getPropertyDescription(key: string): string {
    const prop = this.schema?.properties[key];
    const parts = [];

    if (prop?.format) parts.push(`Format: ${prop.format}`);
    if (prop?.minLength) parts.push(`Min length: ${prop.minLength}`);
    if (prop?.maxLength) parts.push(`Max length: ${prop.maxLength}`);
    if (prop?.minimum) parts.push(`Min: ${prop.minimum}`);
    if (prop?.maximum) parts.push(`Max: ${prop.maximum}`);

    return parts.join(', ');
  }
}
