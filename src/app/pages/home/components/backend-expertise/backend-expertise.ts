import { Component } from '@angular/core';
import { Expertise } from '../../../../models/models';

@Component({
  selector: 'app-backend-expertise',
  imports: [],
  templateUrl: './backend-expertise.html',
})
export class BackendExpertise {
  expertiseAreas: Expertise[] = [
    {
      title: 'API Development',
      description:
        'RESTful and GraphQL APIs with comprehensive documentation, versioning, and rate limiting.',
      icon: '🔌',
      skills: ['REST', 'GraphQL', 'OpenAPI', 'Rate Limiting'],
    },
    {
      title: 'Database Design',
      description:
        'Optimized schemas, indexing strategies, and query performance for both SQL and NoSQL databases.',
      icon: '🗄️',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Optimization'],
    },
    {
      title: 'Microservices',
      description:
        'Distributed systems with service mesh, event-driven architecture, and inter-service communication.',
      icon: '🔗',
      skills: ['Docker', 'Message Queues', 'Service Mesh'],
    },
    {
      title: 'Cloud Infrastructure',
      description:
        'Scalable deployments on AWS/Azure with CI/CD pipelines, monitoring, and auto-scaling.',
      icon: '☁️',
      skills: ['AWS', 'Azure', 'Terraform', 'CI/CD'],
    },
    {
      title: 'Security',
      description:
        'Authentication, authorization, encryption, and security best practices for backend systems.',
      icon: '🔒',
      skills: ['OAuth2', 'JWT', 'Encryption', 'OWASP'],
    },
    {
      title: 'Performance',
      description:
        'Optimization techniques including caching strategies, load balancing, and database tuning.',
      icon: '⚡',
      skills: ['Caching', 'Load Balancing', 'CDN', 'Monitoring'],
    },
  ];
}
