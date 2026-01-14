import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DiagramNode {
  id: string;
  label: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'queue' | 'monitoring';
  x: number;
  y: number;
  connections?: string[];
  status?: 'healthy' | 'warning' | 'error';
  traffic?: number; // simulated traffic
}

interface DiagramConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
  protocol?: string;
  isActive?: boolean;
}

interface LegendItem {
  type: string;
  label: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-architecture-diagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './architecture-diagram.html',
})
export class ArchitectureDiagram implements OnInit {
  selectedNode: DiagramNode | null = null;
  hoveredConnection: string | null = null;
  viewBox: string = '0 0 100 100';
  isPanning: boolean = false;
  panStart: { x: number; y: number } = { x: 0, y: 0 };
  scale: number = 1;
  offset: { x: number; y: number } = { x: 0, y: 0 };
  simulationActive: boolean = true;

  legendItems: LegendItem[] = [
    {
      type: 'client',
      label: 'Client Applications',
      color: 'from-blue-500 to-cyan-500',
      icon: '💻',
    },
    { type: 'gateway', label: 'API Gateway', color: 'from-purple-500 to-pink-500', icon: '🚪' },
    { type: 'service', label: 'Microservices', color: 'from-emerald-500 to-teal-500', icon: '⚙️' },
    { type: 'database', label: 'Databases', color: 'from-amber-500 to-orange-500', icon: '🗄️' },
    { type: 'queue', label: 'Message Queue', color: 'from-rose-500 to-fuchsia-500', icon: '📮' },
    { type: 'monitoring', label: 'Monitoring', color: 'from-indigo-500 to-violet-500', icon: '📊' },
  ];

  nodes: DiagramNode[] = [
    // Client Layer
    { id: 'web', label: 'Web App', type: 'client', x: 15, y: 10, status: 'healthy', traffic: 85 },
    {
      id: 'mobile',
      label: 'Mobile App',
      type: 'client',
      x: 35,
      y: 10,
      status: 'healthy',
      traffic: 75,
    },
    {
      id: 'admin',
      label: 'Admin Panel',
      type: 'client',
      x: 55,
      y: 10,
      status: 'healthy',
      traffic: 40,
    },

    // API Gateway Layer
    {
      id: 'gateway',
      label: 'API Gateway',
      type: 'gateway',
      x: 35,
      y: 25,
      status: 'healthy',
      traffic: 95,
    },

    // Services Layer
    {
      id: 'auth',
      label: 'Auth Service',
      type: 'service',
      x: 10,
      y: 45,
      status: 'healthy',
      traffic: 65,
    },
    {
      id: 'users',
      label: 'Users Service',
      type: 'service',
      x: 25,
      y: 45,
      status: 'healthy',
      traffic: 70,
    },
    {
      id: 'products',
      label: 'Products Service',
      type: 'service',
      x: 40,
      y: 45,
      status: 'warning',
      traffic: 85,
    },
    {
      id: 'orders',
      label: 'Orders Service',
      type: 'service',
      x: 55,
      y: 45,
      status: 'healthy',
      traffic: 90,
    },
    {
      id: 'payments',
      label: 'Payments Service',
      type: 'service',
      x: 70,
      y: 45,
      status: 'healthy',
      traffic: 80,
    },

    // Message Queue
    {
      id: 'queue',
      label: 'Message Queue',
      type: 'queue',
      x: 85,
      y: 35,
      status: 'healthy',
      traffic: 60,
    },

    // Data Layer
    {
      id: 'postgres',
      label: 'PostgreSQL',
      type: 'database',
      x: 15,
      y: 70,
      status: 'healthy',
      traffic: 55,
    },
    {
      id: 'mongo',
      label: 'MongoDB',
      type: 'database',
      x: 35,
      y: 70,
      status: 'healthy',
      traffic: 45,
    },
    {
      id: 'redis',
      label: 'Redis Cache',
      type: 'database',
      x: 55,
      y: 70,
      status: 'healthy',
      traffic: 90,
    },

    // Monitoring
    {
      id: 'monitoring',
      label: 'Monitoring',
      type: 'monitoring',
      x: 85,
      y: 65,
      status: 'healthy',
      traffic: 25,
    },
  ];

  connections: DiagramConnection[] = [
    // Client to Gateway
    {
      id: 'web-gateway',
      from: 'web',
      to: 'gateway',
      label: 'HTTPS',
      protocol: 'REST',
      isActive: true,
    },
    {
      id: 'mobile-gateway',
      from: 'mobile',
      to: 'gateway',
      label: 'HTTPS',
      protocol: 'REST',
      isActive: true,
    },
    {
      id: 'admin-gateway',
      from: 'admin',
      to: 'gateway',
      label: 'HTTPS',
      protocol: 'REST',
      isActive: true,
    },

    // Gateway to Services
    {
      id: 'gateway-auth',
      from: 'gateway',
      to: 'auth',
      label: 'JWT Auth',
      protocol: 'gRPC',
      isActive: true,
    },
    {
      id: 'gateway-users',
      from: 'gateway',
      to: 'users',
      label: 'User Data',
      protocol: 'REST',
      isActive: true,
    },
    {
      id: 'gateway-products',
      from: 'gateway',
      to: 'products',
      label: 'Products',
      protocol: 'GraphQL',
      isActive: true,
    },
    {
      id: 'gateway-orders',
      from: 'gateway',
      to: 'orders',
      label: 'Orders',
      protocol: 'REST',
      isActive: true,
    },
    {
      id: 'gateway-payments',
      from: 'gateway',
      to: 'payments',
      label: 'Payments',
      protocol: 'gRPC',
      isActive: true,
    },

    // Service to Service
    {
      id: 'users-auth',
      from: 'users',
      to: 'auth',
      label: 'Auth Check',
      protocol: 'gRPC',
      isActive: true,
    },
    {
      id: 'orders-products',
      from: 'orders',
      to: 'products',
      label: 'Stock Check',
      protocol: 'REST',
      isActive: true,
    },
    {
      id: 'orders-payments',
      from: 'orders',
      to: 'payments',
      label: 'Process Payment',
      protocol: 'gRPC',
      isActive: true,
    },

    // Service to Queue
    {
      id: 'orders-queue',
      from: 'orders',
      to: 'queue',
      label: 'Order Events',
      protocol: 'AMQP',
      isActive: true,
    },
    {
      id: 'products-queue',
      from: 'products',
      to: 'queue',
      label: 'Inventory Events',
      protocol: 'AMQP',
      isActive: true,
    },

    // Service to Database
    {
      id: 'users-postgres',
      from: 'users',
      to: 'postgres',
      label: 'User Data',
      protocol: 'SQL',
      isActive: true,
    },
    {
      id: 'products-mongo',
      from: 'products',
      to: 'mongo',
      label: 'Product Catalog',
      protocol: 'NoSQL',
      isActive: true,
    },
    {
      id: 'orders-postgres',
      from: 'orders',
      to: 'postgres',
      label: 'Order Data',
      protocol: 'SQL',
      isActive: true,
    },
    {
      id: 'payments-postgres',
      from: 'payments',
      to: 'postgres',
      label: 'Transaction Log',
      protocol: 'SQL',
      isActive: true,
    },
    {
      id: 'auth-redis',
      from: 'auth',
      to: 'redis',
      label: 'Session Cache',
      protocol: 'Redis',
      isActive: true,
    },
    {
      id: 'products-redis',
      from: 'products',
      to: 'redis',
      label: 'Product Cache',
      protocol: 'Redis',
      isActive: true,
    },
    {
      id: 'products-s3',
      from: 'products',
      to: 's3',
      label: 'Product Images',
      protocol: 'HTTP',
      isActive: true,
    },

    // Monitoring
    {
      id: 'monitoring-all',
      from: 'monitoring',
      to: 'gateway',
      label: 'Metrics',
      protocol: 'Prometheus',
      isActive: true,
    },
  ];

  ngOnInit() {
    // Simular tráfico en las conexiones
    if (this.simulationActive) {
      setInterval(() => this.updateTrafficSimulation(), 2000);
    }
  }

  getNodeColor(type: string): string {
    const colors: Record<string, string> = {
      client: 'from-blue-500 to-cyan-500',
      gateway: 'from-purple-500 to-pink-500',
      service: 'from-emerald-500 to-teal-500',
      database: 'from-amber-500 to-orange-500',
      queue: 'from-rose-500 to-fuchsia-500',
      monitoring: 'from-indigo-500 to-violet-500',
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  }

  getNodeIcon(type: string): string {
    const icons: Record<string, string> = {
      client: '💻',
      gateway: '🚪',
      service: '⚙️',
      database: '🗄️',
      queue: '📮',
      monitoring: '📊',
    };
    return icons[type] || '📦';
  }

  getStatusColor(status?: string): string {
    const colors: Record<string, string> = {
      healthy: 'text-emerald-500 bg-emerald-500/10',
      warning: 'text-amber-500 bg-amber-500/10',
      error: 'text-rose-500 bg-rose-500/10',
    };
    return colors[status || 'healthy'] || colors['healthy'];
  }

  getProtocolColor(protocol: string): string {
    const colors: Record<string, string> = {
      REST: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
      GraphQL: 'bg-pink-500/20 text-pink-600 dark:text-pink-400',
      gRPC: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      SQL: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
      NoSQL: 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
      Redis: 'bg-red-500/20 text-red-600 dark:text-red-400',
      AMQP: 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
      Prometheus: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
      HTTP: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
    };
    return colors[protocol] || 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
  }

  selectNode(node: DiagramNode) {
    this.selectedNode = this.selectedNode?.id === node.id ? null : node;
  }

  getNodeConnections(nodeId: string): DiagramConnection[] {
    return this.connections.filter((conn) => conn.from === nodeId || conn.to === nodeId);
  }

  getNodeDescription(node: DiagramNode): string {
    const descriptions: Record<string, string> = {
      web: 'React-based progressive web application served via CloudFront CDN',
      mobile: 'Cross-platform React Native app supporting iOS and Android',
      admin: 'Angular-based admin dashboard for internal operations',
      gateway: 'Kong API Gateway with OAuth2, rate limiting, and request routing',
      auth: 'Authentication and authorization service using JWT tokens',
      users: 'User profile management, preferences, and account settings',
      products: 'Product catalog with search, filtering, and inventory management',
      orders: 'Order processing, fulfillment, and status tracking',
      payments: 'Payment processing integration with Stripe and PayPal',
      queue: 'RabbitMQ message broker for async event processing',
      postgres: 'PostgreSQL relational database for transactional data',
      mongo: 'MongoDB document store for flexible product catalog',
      redis: 'Redis in-memory cache for sessions and frequent queries',
      s3: 'Amazon S3 for product images and file storage',
      monitoring: 'Prometheus + Grafana for metrics, logging, and alerts',
    };
    return descriptions[node.id] || 'System component';
  }

  updateTrafficSimulation() {
    if (!this.simulationActive) return;

    // Simular cambios aleatorios de tráfico
    this.nodes.forEach((node) => {
      if (Math.random() > 0.7) {
        const change = Math.random() * 20 - 10; // -10 to +10
        node.traffic = Math.max(0, Math.min(100, (node.traffic || 50) + change));
      }
    });
  }

  toggleSimulation() {
    this.simulationActive = !this.simulationActive;
  }

  resetView() {
    this.scale = 1;
    this.offset = { x: 0, y: 0 };
    this.viewBox = '0 0 100 100';
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    this.scale = Math.max(0.5, Math.min(2, this.scale + delta));
  }

  onPanStart(event: MouseEvent) {
    this.isPanning = true;
    this.panStart = { x: event.clientX, y: event.clientY };
  }

  onPanMove(event: MouseEvent) {
    if (!this.isPanning) return;

    const dx = event.clientX - this.panStart.x;
    const dy = event.clientY - this.panStart.y;

    this.offset.x += dx * 0.1;
    this.offset.y += dy * 0.1;

    this.panStart = { x: event.clientX, y: event.clientY };
  }

  onPanEnd() {
    this.isPanning = false;
  }

  getConnectionMidpoint(conn: DiagramConnection, axis: 'x' | 'y'): number {
    const fromNode = this.nodes.find((n) => n.id === conn.from);
    const toNode = this.nodes.find((n) => n.id === conn.to);
    if (!fromNode || !toNode) return 0;

    return axis === 'x' ? (fromNode.x + toNode.x) / 2 : (fromNode.y + toNode.y) / 2;
  }

  getNodeX(nodeId: string): number {
    const node = this.nodes.find((n) => n.id === nodeId);
    return node ? node.x : 0;
  }

  getNodeY(nodeId: string): number {
    const node = this.nodes.find((n) => n.id === nodeId);
    return node ? node.y : 0;
  }
}
