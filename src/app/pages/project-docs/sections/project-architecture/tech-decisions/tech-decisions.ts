import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TechDecisionModel {
  title: string;
  problem: string;
  solution: string;
  alternatives: string[];
  outcome: string;
  icon: string;
}

@Component({
  selector: 'app-tech-decisions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-decisions.html',
})
export class TechDecisions {
  selectedDecision: TechDecisionModel | null = null;

  decisions: TechDecisionModel[] = [
    {
      title: 'Why Microservices over Monolith?',
      problem: 'Need for independent scaling and team autonomy as the system grows',
      solution: 'Adopted microservices architecture with domain-driven design principles',
      alternatives: ['Monolithic architecture', 'Modular monolith', 'Serverless functions'],
      outcome:
        'Services can be scaled independently, deployed separately, and teams work autonomously. 99.9% uptime achieved.',
      icon: '🏗️',
    },
    {
      title: 'PostgreSQL for Transactional Data',
      problem: 'Required ACID compliance and complex relational queries for orders and users',
      solution: 'PostgreSQL with read replicas for horizontal read scaling',
      alternatives: ['MySQL', 'MongoDB', 'CockroachDB'],
      outcome:
        'Strong consistency guarantees, excellent query performance with proper indexing. Handles 10K+ queries/sec.',
      icon: '🐘',
    },
    {
      title: 'Redis for Distributed Caching',
      problem: 'Database load was high due to repeated queries for frequently accessed data',
      solution: 'Implemented Redis with TTL-based cache invalidation strategy',
      alternatives: ['Memcached', 'Application-level caching', 'Database query cache'],
      outcome: 'Reduced database load by 70%, improved API response time from 200ms to <50ms.',
      icon: '⚡',
    },
    {
      title: 'RabbitMQ for Message Queue',
      problem: 'Need for reliable async communication between services with retry logic',
      solution: 'RabbitMQ with topic exchanges and dead letter queues',
      alternatives: ['Apache Kafka', 'AWS SQS', 'Redis Pub/Sub'],
      outcome:
        'Reliable message delivery with automatic retries. Handles 100K+ messages/day with zero data loss.',
      icon: '📮',
    },
    {
      title: 'Kubernetes for Orchestration',
      problem: 'Managing deployments across 12+ services with auto-scaling requirements',
      solution: 'Kubernetes with Helm charts and horizontal pod autoscaling',
      alternatives: ['Docker Swarm', 'AWS ECS', 'Nomad'],
      outcome:
        'Zero-downtime deployments, automatic scaling based on metrics, self-healing capabilities.',
      icon: '☸️',
    },
    {
      title: 'Kong as API Gateway',
      problem: 'Cross-cutting concerns (auth, rate limiting) repeated across services',
      solution: 'Kong Gateway with OAuth2 plugin and rate limiting policies',
      alternatives: ['AWS API Gateway', 'NGINX Plus', 'Traefik'],
      outcome:
        'Centralized auth and rate limiting. Reduced service complexity and improved security posture.',
      icon: '🚪',
    },
  ];

  selectDecision(decision: TechDecisionModel) {
    this.selectedDecision = this.selectedDecision === decision ? null : decision;
  }
}
