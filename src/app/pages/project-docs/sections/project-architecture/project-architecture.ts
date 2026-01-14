import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFlow } from './data-flow/data-flow';
import { ArchitectureDiagram } from './architecture-diagram/architecture-diagram';
import { TechDecisions } from './tech-decisions/tech-decisions';
import { CommonModule } from '@angular/common';

interface ArchitectureLayer {
  name: string;
  description: string;
  components: string[];
  color: string;
  expanded?: boolean;
  responsibilities?: string[];
  technologies?: string[];
}

interface DesignPattern {
  title: string;
  emoji: string;
  description: string;
  category: string;
  badge: string;
}

interface StrategyItem {
  title: string;
  description: string;
}

interface CacheStrategy {
  name: string;
  description: string;
  ttl: string;
  coverage: string;
}

interface ArchitectureFeature {
  title: string;
  emoji: string;
  description: string;
}

@Component({
  selector: 'app-project-architecture',
  imports: [DataFlow, ArchitectureDiagram, TechDecisions, CommonModule],
  templateUrl: './project-architecture.html',
})
export class ProjectArchitecture implements OnInit {
  projectId: string = '';

  architectureFeatures: ArchitectureFeature[] = [
    {
      title: 'Domain-Driven',
      emoji: '🎯',
      description: 'Services by domain',
    },
    {
      title: 'Event-Driven',
      emoji: '🔄',
      description: 'Async communication',
    },
    {
      title: 'Auto-Scaling',
      emoji: '📈',
      description: 'Based on traffic',
    },
  ];

  architectureLayers: ArchitectureLayer[] = [
    {
      name: 'Client Layer',
      description: 'Frontend applications and mobile clients consuming our APIs',
      components: ['Web App (React)', 'Mobile App (React Native)', 'Admin Dashboard', 'PWA'],
      color: 'from-blue-500 to-cyan-500',
      expanded: false,
      responsibilities: [
        'Render user interfaces',
        'Handle user input and interactions',
        'Client-side validation',
        'Manage local state and caching',
        'API communication and error handling',
      ],
      technologies: ['Angular 17', 'React 18', 'Vue 3', 'Tailwind CSS', 'RxJS', 'React Query'],
    },
    {
      name: 'API Gateway',
      description: 'Entry point handling authentication, rate limiting, and request routing',
      components: [
        'Kong Gateway',
        'OAuth2 Service',
        'Rate Limiter',
        'Load Balancer',
        'API Gateway',
      ],
      color: 'from-purple-500 to-pink-500',
      expanded: false,
      responsibilities: [
        'Request routing and composition',
        'Authentication and authorization',
        'Rate limiting and throttling',
        'Request/response transformation',
        'Caching and logging',
      ],
      technologies: ['Kong', 'Apache APISIX', 'OAuth 2.0', 'JWT', 'OpenID Connect'],
    },
    {
      name: 'Microservices',
      description: 'Domain-driven services handling business logic with bounded contexts',
      components: [
        'User Service',
        'Product Service',
        'Order Service',
        'Payment Service',
        'Notification Service',
        'Inventory Service',
        'Analytics Service',
      ],
      color: 'from-emerald-500 to-teal-500',
      expanded: false,
      responsibilities: [
        'Domain business logic implementation',
        'Data persistence and management',
        'Inter-service communication',
        'Event publishing and consumption',
        'Health checks and monitoring',
      ],
      technologies: ['NestJS', 'Spring Boot', 'Go', 'gRPC', 'GraphQL', 'RabbitMQ', 'Kafka'],
    },
    {
      name: 'Data Layer',
      description: 'Polyglot persistent storage and distributed caching systems',
      components: [
        'PostgreSQL (Primary)',
        'MongoDB (Catalog)',
        'Redis (Cache)',
        'S3 (Files)',
        'Elasticsearch',
      ],
      color: 'from-orange-500 to-amber-500',
      expanded: false,
      responsibilities: [
        'Relational data storage and transactions',
        'Document storage for flexible schemas',
        'In-memory caching for performance',
        'File and blob storage',
        'Search indexing and queries',
      ],
      technologies: [
        'PostgreSQL 15',
        'MongoDB 7',
        'Redis 7',
        'AWS S3',
        'Elasticsearch 8',
        'TimescaleDB',
      ],
    },
    {
      name: 'Infrastructure',
      description: 'Cloud-native DevOps, orchestration, and observability platform',
      components: [
        'Kubernetes',
        'Docker',
        'Prometheus',
        'Grafana',
        'ELK Stack',
        'CI/CD Pipeline',
        'Service Mesh',
      ],
      color: 'from-rose-500 to-fuchsia-500',
      expanded: false,
      responsibilities: [
        'Container orchestration and scaling',
        'Monitoring and alerting',
        'Log aggregation and analysis',
        'Continuous integration/deployment',
        'Service discovery and networking',
      ],
      technologies: ['Kubernetes', 'Docker', 'Helm', 'Prometheus', 'Grafana', 'Istio', 'GitLab CI'],
    },
  ];

  designPatterns: DesignPattern[] = [
    {
      title: 'API Gateway Pattern',
      emoji: '🎯',
      description:
        'Single entry point for all client requests, handling cross-cutting concerns like authentication and rate limiting.',
      category: 'Integration',
      badge: 'Kong Gateway',
    },
    {
      title: 'Database per Service',
      emoji: '🗄️',
      description:
        'Each microservice owns its database, ensuring loose coupling and independent scalability.',
      category: 'Persistence',
      badge: 'Polyglot Persistence',
    },
    {
      title: 'Event Sourcing',
      emoji: '🔄',
      description:
        'Critical operations stored as immutable events, enabling audit trails and temporal queries.',
      category: 'Event-Driven',
      badge: 'Event Store',
    },
    {
      title: 'Circuit Breaker',
      emoji: '🛡️',
      description:
        'Prevents cascading failures by detecting and isolating failing services automatically.',
      category: 'Resilience',
      badge: 'Fault Tolerance',
    },
    {
      title: 'CQRS Pattern',
      emoji: '📦',
      description:
        'Separates read and write operations for optimized query performance and scalability.',
      category: 'Query',
      badge: 'Read/Write Separation',
    },
    {
      title: 'Saga Pattern',
      emoji: '🔐',
      description:
        'Manages distributed transactions across microservices with compensating actions.',
      category: 'Transaction',
      badge: 'Distributed Transactions',
    },
    {
      title: 'Sidecar Pattern',
      emoji: '🚗',
      description: 'Deploy helper components alongside main service for cross-cutting concerns.',
      category: 'Deployment',
      badge: 'Service Mesh',
    },
    {
      title: 'BFF Pattern',
      emoji: '👥',
      description:
        'Backend for Frontend - specialized APIs per client type for optimal data delivery.',
      category: 'API Design',
      badge: 'Client-Specific APIs',
    },
  ];

  scalingStrategies: StrategyItem[] = [
    {
      title: 'Auto-scaling',
      description: 'Based on CPU (70% threshold) and memory metrics with predictive scaling',
    },
    {
      title: 'Load Balancing',
      description: 'Round-robin, least connections, and IP hash algorithms across instances',
    },
    {
      title: 'Stateless Design',
      description: 'All services stateless for easy horizontal replication and scaling',
    },
    {
      title: 'Read Replicas',
      description: 'Database read replicas for high-volume query workloads',
    },
  ];

  // Estrategias de caching
  cachingStrategies: CacheStrategy[] = [
    {
      name: 'Redis Cache',
      description: 'Distributed in-memory cache for frequently accessed data and session storage',
      ttl: '15min - 24h',
      coverage: '80%',
    },
    {
      name: 'CDN Edge Cache',
      description: 'Global CDN for static assets, images, and media with edge locations',
      ttl: '1h - 1y',
      coverage: '95%',
    },
    {
      name: 'Database Query Cache',
      description: 'Optimized query caching with intelligent invalidation strategies',
      ttl: '5min - 1h',
      coverage: '60%',
    },
    {
      name: 'Browser Cache',
      description: 'HTTP caching headers for client-side caching of static resources',
      ttl: '1h - 7d',
      coverage: '90%',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.route.parent?.snapshot.params['projectId'] || '';
    console.log('Loaded architecture for project:', this.projectId);
  }

  // Método para expandir/contraer capas
  toggleLayer(index: number): void {
    this.architectureLayers[index].expanded = !this.architectureLayers[index].expanded;
  }

  getBadgeColor(category: string): string {
    const colors: { [key: string]: string } = {
      Integration: 'badge-primary',
      Persistence: 'badge-success',
      'Event-Driven': 'badge-warning',
      Resilience: 'badge-error',
      Query: 'badge-primary',
      Transaction: 'badge-success',
      Deployment: 'badge-warning',
      'API Design': 'badge-error',
    };
    return colors[category] || 'badge-gray';
  }

  calculateMetrics() {
    return {
      totalServices: this.architectureLayers[2].components.length,
      totalComponents: this.architectureLayers.reduce(
        (sum, layer) => sum + layer.components.length,
        0
      ),
      dataStores: this.architectureLayers[3].components.length,
      infrastructureComponents: this.architectureLayers[4].components.length,
    };
  }

  // Agrega estos métodos a tu clase:

  // Expandir/contraer todas las capas
  expandAllLayers(expand: boolean): void {
    this.architectureLayers.forEach((layer) => {
      layer.expanded = expand;
    });
  }

  // Método para manejar clics en componentes
  onComponentClick(component: string, layerName: string): void {
    console.log(`Clicked on ${component} in ${layerName}`);
    // Aquí puedes implementar lógica para mostrar detalles, navegar, etc.
  }

  // Método para obtener estadísticas
  getArchitectureStats(): any {
    return {
      totalLayers: this.architectureLayers.length,
      totalComponents: this.architectureLayers.reduce(
        (sum, layer) => sum + layer.components.length,
        0
      ),
      totalServices: this.architectureLayers[2].components.length,
      totalPatterns: this.designPatterns.length,
      scalingStrategies: this.scalingStrategies.length,
      cachingLayers: this.cachingStrategies.length,
    };
  }
}
