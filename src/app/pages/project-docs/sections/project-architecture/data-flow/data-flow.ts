import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FlowStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-data-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-flow.html',
})
export class DataFlow {
  requestFlow: FlowStep[] = [
    {
      number: 1,
      title: 'Client Request',
      description:
        'User initiates action from web/mobile app. Request includes JWT token for authentication.',
      icon: '📱',
    },
    {
      number: 2,
      title: 'API Gateway',
      description:
        'Gateway validates token, checks rate limits, and routes to appropriate microservice.',
      icon: '🚪',
    },
    {
      number: 3,
      title: 'Service Layer',
      description:
        'Microservice processes business logic, validates data, and checks cache for existing data.',
      icon: '⚙️',
    },
    {
      number: 4,
      title: 'Data Access',
      description: 'Query database if cache miss. Update cache with fresh data (TTL: 15min).',
      icon: '🗄️',
    },
    {
      number: 5,
      title: 'Event Publishing',
      description:
        'For state-changing operations, publish event to message queue for async processing.',
      icon: '📮',
    },
    {
      number: 6,
      title: 'Response',
      description:
        'Return formatted response through gateway. Includes pagination, metadata, and links.',
      icon: '✅',
    },
  ];

  eventFlow: FlowStep[] = [
    {
      number: 1,
      title: 'Event Trigger',
      description: 'Service publishes event to RabbitMQ (e.g., "OrderPlaced", "UserRegistered").',
      icon: '🔔',
    },
    {
      number: 2,
      title: 'Event Routing',
      description: 'Message broker routes event to all subscribed services based on routing keys.',
      icon: '🔀',
    },
    {
      number: 3,
      title: 'Consumer Processing',
      description:
        'Each subscriber processes event independently (notifications, analytics, inventory update).',
      icon: '⚡',
    },
    {
      number: 4,
      title: 'Retry & DLQ',
      description:
        'Failed messages retry 3x with exponential backoff, then move to Dead Letter Queue.',
      icon: '🔄',
    },
  ];
}
