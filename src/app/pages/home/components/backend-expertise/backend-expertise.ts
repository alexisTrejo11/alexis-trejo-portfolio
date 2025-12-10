import { Component } from '@angular/core';
import { Expertise } from '../../../../core/models/hero';

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
      iconName: 'backend/api',
      skills: ['REST', 'GraphQL', 'OpenAPI', 'Rate Limiting'],
    },
    {
      title: 'Database Design',
      description:
        'Optimized schemas, indexing strategies, and query performance for both SQL and NoSQL databases.',
      iconName: 'backend/database',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Optimization'],
    },
    {
      title: 'Microservices',
      description:
        'Distributed systems with service mesh, event-driven architecture, and inter-service communication.',
      iconName: 'backend/microservices',
      skills: ['Docker', 'Message Queues', 'Service Mesh'],
    },
    {
      title: 'Cloud Infrastructure',
      description:
        'Scalable deployments on AWS/Azure with CI/CD pipelines, monitoring, and auto-scaling.',
      iconName: 'backend/cloud',
      skills: ['AWS', 'Azure', 'Terraform', 'CI/CD'],
    },
    {
      title: 'Security',
      description:
        'Authentication, authorization, encryption, and security best practices for backend systems.',
      iconName: 'backend/security',
      skills: ['OAuth2', 'JWT', 'Encryption', 'OWASP'],
    },
    {
      title: 'Performance',
      description:
        'Optimization techniques including caching strategies, load balancing, and database tuning.',
      iconName: 'backend/performance',
      skills: ['Caching', 'Load Balancing', 'CDN', 'Monitoring'],
    },
  ];
}
