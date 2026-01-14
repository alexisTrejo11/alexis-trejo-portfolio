import { Component, Input } from '@angular/core';
import { ApiResponse } from '../../api-explorer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-response-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-viewer.html',
  styleUrls: ['./response-viewer.scss'],
})
export class ResponseViewer {
  @Input({ required: true }) responses: ApiResponse[] = [];
  selectedResponse: ApiResponse | null = null;

  ngOnInit() {
    if (this.responses && this.responses.length > 0) {
      this.selectedResponse = this.responses[0];
    }
  }

  selectResponse(response: ApiResponse) {
    this.selectedResponse = response;
  }

  getStatusColor(status: number): string {
    if (status >= 200 && status < 300) return 'badge-success';
    if (status >= 300 && status < 400) return 'badge-primary';
    if (status >= 400 && status < 500) return 'badge-warning';
    return 'badge-error';
  }
}
