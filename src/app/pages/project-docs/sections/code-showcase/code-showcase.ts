import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  category: string;
  files: CodeFile[];
  duration?: string;
  views?: number;
  tags?: string[];
}

interface CodeFile {
  name: string;
  path: string;
  language: string;
  content: string;
  highlighted?: boolean;
  explanation?: string;
}


import 'prismjs/prism'; // Core de Prism
import 'prismjs/components/prism-typescript'; // For TypeScript
import 'prismjs/components/prism-javascript'; // For JavaScript
import 'prismjs/components/prism-json'; // For JSON
import 'prismjs/components/prism-css'; // For CSS
import 'prismjs/components/prism-scss'; // For SCSS
import 'prismjs/components/prism-markup'; // For HTML/XML
import 'prismjs/components/prism-bash'; // For Bash
import { IconComponent } from '../../../../shared/components/icon/icon';

// import 'prismjs/plugins/line-highlight/prism-line-highlight';
// import 'prismjs/plugins/line-numbers/prism-line-numbers';
// import 'prismjs/plugins/toolbar/prism-toolbar';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

declare var Prism: any; // For TypeScript

@Component({
  selector: 'app-code-showcase',
  imports: [CommonModule, IconComponent],
  templateUrl: './code-showcase.html',
})
export class CodeShowcase implements AfterViewInit {
  @ViewChild('codeBlock') codeBlock!: ElementRef;

  projectId: string = '';
  selectedExample: CodeExample | null = null;
  selectedFile: CodeFile | null = null;
  isBrowser: boolean = false;

  // Placeholder for code examples data
  codeExamples: CodeExample[] = [
    {
      id: 'authentication',
      title: 'JWT Authentication Middleware',
      description: 'Secure authentication system with JWT tokens, refresh tokens, and role-based access control.',
      category: 'Security',
      duration: '8 min',
      views: 245,
      tags: ['JWT', 'Middleware', 'Security', 'Express', 'Node.js'],
      files: [
        {
          name: 'auth.middleware.ts',
          path: 'src/middleware/auth.middleware.ts',
          language: 'typescript',
          content: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

interface AuthRequest extends Request {
  user?: User;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { userId: string };

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        error: 'Invalid token'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Insufficient permissions'
      });
    }
    next();
  };
};`,
          highlighted: true,
          explanation: 'This middleware handles JWT authentication and authorization. It extracts the token from the Authorization header, verifies it, and attaches the user object to the request for downstream middleware/routes.'
        },
        {
          name: 'token.service.ts',
          path: 'src/services/token.service.ts',
          language: 'typescript',
          content: `import jwt from 'jsonwebtoken';
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export class TokenService {
  static generateAccessToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.REFRESH_SECRET!,
      { expiresIn: '7d' }
    );
  }

  static async storeRefreshToken(
    userId: string,
    token: string
  ): Promise<void> {
    await redis.setex(
      \`refresh:\${userId}\`,
      7 * 24 * 60 * 60,
      token
    );
  }

  static async revokeRefreshToken(userId: string): Promise<void> {
    await redis.del(\`refresh:\${userId}\`);
  }
}`,
          explanation: 'Token service responsible for generating and managing JWT tokens. It uses Redis for storing refresh tokens with automatic expiration for better security and scalability.'
        },
      ],
    },
    {
      id: 'caching',
      title: 'Redis Caching Strategy',
      description: 'Distributed caching implementation with cache invalidation and TTL management.',
      category: 'Performance',
      duration: '6 min',
      views: 189,
      tags: ['Redis', 'Caching', 'Performance', 'Distributed'],
      files: [
        {
          name: 'cache.service.ts',
          path: 'src/services/cache.service.ts',
          language: 'typescript',
          content: `import { Redis } from 'ioredis';

export class CacheService {
  private redis: Redis;
  private readonly DEFAULT_TTL = 3600; // 1 hour

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => Math.min(times * 50, 2000)
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async set(
    key: string,
    value: any,
    ttl: number = this.DEFAULT_TTL
  ): Promise<void> {
    await this.redis.setex(
      key,
      ttl,
      JSON.stringify(value)
    );
  }

  async invalidate(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  async wrap<T>(
    key: string,
    fn: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cached = await this.get<T>(key);

    if (cached) {
      return cached;
    }

    const result = await fn();
    await this.set(key, result, ttl);
    return result;
  }
}`,
          highlighted: true,
          explanation: 'A comprehensive caching service using Redis. The wrap() method provides a cache-aside pattern, while invalidate() allows for cache busting using pattern matching.'
        },
      ],
    },
    {
      id: 'error-handling',
      title: 'Centralized Error Handler',
      description: 'Robust error handling with custom error types and logging integration.',
      category: 'Architecture',
      duration: '5 min',
      views: 156,
      tags: ['Error Handling', 'Logging', 'Middleware', 'Best Practices'],
      files: [
        {
          name: 'error.handler.ts',
          path: 'src/middleware/error.handler.ts',
          language: 'typescript',
          content: `import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.error({
      message: err.message,
      statusCode: err.statusCode,
      path: req.path,
      method: req.method
    });

    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // Unexpected errors
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};`,
          highlighted: true,
          explanation: 'Centralized error handling middleware that distinguishes between operational (expected) errors and unexpected errors. All errors are properly logged with context for debugging.'
        },
      ],
    },
    {
      id: 'database',
      title: 'TypeORM Entity Design',
      description: 'Database entity patterns with relationships, validation, and migrations.',
      category: 'ORM',
      duration: '10 min',
      views: 312,
      tags: ['TypeORM', 'PostgreSQL', 'Entities', 'Relations'],
      files: [
        {
          name: 'user.entity.ts',
          path: 'src/entities/user.entity.ts',
          language: 'typescript',
          content: `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Post } from './post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  get fullName(): string {
    return \`\${this.firstName} \${this.lastName}\`;
  }
}`,
          highlighted: true,
          explanation: 'User entity with TypeORM decorators for database mapping, class-validator for input validation, and computed properties. Demonstrates one-to-many relationship with posts.'
        },
      ],
    },
    {
      id: 'api-design',
      title: 'REST API Best Practices',
      description: 'Clean API design with proper status codes, versioning, and documentation.',
      category: 'API',
      duration: '7 min',
      views: 278,
      tags: ['REST', 'API Design', 'Swagger', 'Best Practices'],
      files: [
        {
          name: 'users.controller.ts',
          path: 'src/controllers/users.controller.ts',
          language: 'typescript',
          content: `import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of users' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ) {
    return this.userService.findAll({
      page,
      limit: limit > 100 ? 100 : limit,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}`,
          highlighted: true,
          explanation: 'NestJS controller demonstrating REST API best practices including proper HTTP status codes, versioning, pagination, and Swagger documentation decorators.'
        },
      ],
    },
    {
      id: 'business-logic',
      title: 'Order Processing Service',
      description: 'Domain-driven business logic with transaction management and validation.',
      category: 'Buisness Logic',
      duration: '12 min',
      views: 421,
      tags: ['DDD', 'Transactions', 'Business Rules', 'Validation'],
      files: [
        {
          name: 'order.service.ts',
          path: 'src/services/order.service.ts',
          language: 'typescript',
          content: `import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { CreateOrderDto, OrderItemDto } from '../dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private dataSource: DataSource
  ) {}

  async createOrder(
    userId: string,
    createOrderDto: CreateOrderDto
  ): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate products and calculate total
      const orderItems = await Promise.all(
        createOrderDto.items.map(async (item: OrderItemDto) => {
          const product = await this.productRepository.findOne({
            where: { id: item.productId, stock: { $gte: item.quantity } }
          });

          if (!product) {
            throw new ConflictException(
              \`Product \${item.productId} not available in requested quantity\`
            );
          }

          // Update stock
          product.stock -= item.quantity;
          await queryRunner.manager.save(product);

          return {
            product,
            quantity: item.quantity,
            price: product.price,
            subtotal: product.price * item.quantity
          };
        })
      );

      const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.subtotal,
        0
      );

      // Create order
      const order = this.orderRepository.create({
        user: { id: userId },
        items: orderItems.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount,
        status: 'pending',
        shippingAddress: createOrderDto.shippingAddress
      });

      const savedOrder = await queryRunner.manager.save(order);

      // Commit transaction
      await queryRunner.commitTransaction();

      return savedOrder;
    } catch (error) {
      // Rollback on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}`,
          highlighted: true,
          explanation: 'Business logic service for order processing. Demonstrates ACID transactions, stock validation, and proper error handling in a complex business scenario.'
        },
      ],
    },
  ];

  categories = [
    'All',
    'ORM',
    'Database',
    'Business Logic',
    'API',
    'Architecture',
    'Security',
    'Performance',
  ];

  selectedCategory: string | null = 'All';

constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.projectId = this.route.parent?.snapshot.params['projectId'] || '';

    if (this.codeExamples.length > 0) {
      this.selectExample(this.codeExamples[0]);
    }
  }

  get filteredExamples(): CodeExample[] {
    if (this.selectedCategory === 'All' || this.selectedCategory === null) {
      return this.codeExamples;
    }
    return this.codeExamples.filter((ex) => ex.category === this.selectedCategory);
  }

  get totalExamples(): number {
    return this.codeExamples.length;
  }

  selectCategory(category: string | null) {
    this.selectedCategory = category;
    // Clear selection when changing category
    if (this.selectedExample &&
        category !== 'All' &&
        this.selectedExample.category !== category) {
      this.selectedExample = null;
      this.selectedFile = null;
    }
  }

  selectExample(example: CodeExample) {
    this.selectedExample = example;
    this.selectedFile = example.files[0] || null;
  }

  copyCode() {
    if (this.selectedFile) {
      navigator.clipboard.writeText(this.selectedFile.content)
        .then(() => {
          // You could add a toast notification here
          console.log('Code copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy code: ', err);
        });
    }
  }

  // Prism.js highlighting after view init
  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.highlightCode();
      }, 100);
    }
  }

  selectFile(file: CodeFile) {
    this.selectedFile = file;
    setTimeout(() => {
      this.highlightCode();
    }, 0);
  }

  private highlightCode() {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }
}
