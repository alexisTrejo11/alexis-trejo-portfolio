import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  category: string;
  files: CodeFile[];
}

interface CodeFile {
  name: string;
  path: string;
  language: string;
  content: string;
  highlighted?: boolean;
}

@Component({
  selector: 'app-code-showcase',
  imports: [CommonModule],
  templateUrl: './code-showcase.html',
  styleUrl: './code-showcase.scss',
})
export class CodeShowcase {
  projectId: string = '';
  selectedExample: CodeExample | null = null;
  selectedFile: CodeFile | null = null;

  // Placeholder for code examples data
  codeExamples: CodeExample[] = [
    {
      id: 'authentication',
      title: 'JWT Authentication Middleware',
      description:
        'Secure authentication system with JWT tokens, refresh tokens, and role-based access control.',
      category: 'Security',
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
        },
      ],
    },
    {
      id: 'caching',
      title: 'Redis Caching Strategy',
      description: 'Distributed caching implementation with cache invalidation and TTL management.',
      category: 'Performance',
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
        },
      ],
    },
    {
      id: 'error-handling',
      title: 'Centralized Error Handler',
      description: 'Robust error handling with custom error types and logging integration.',
      category: 'Architecture',
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
        },
      ],
    },
  ];

  categories = [
    'All',
    'ORM',
    'Database',
    'Buisness Logic',
    'API',
    'Architecture',
    'Security',
    'Performance',
  ];

  selectedCategory = 'All';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.route.parent?.snapshot.params['projectId'] || '';

    if (this.codeExamples.length > 0) {
      this.selectExample(this.codeExamples[0]);
    }
  }

  get filteredExamples(): CodeExample[] {
    if (this.selectedCategory === 'All') {
      return this.codeExamples;
    }
    return this.codeExamples.filter((ex) => ex.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  selectExample(example: CodeExample) {
    this.selectedExample = example;
    this.selectedFile = example.files[0] || null;
  }

  selectFile(file: CodeFile) {
    this.selectedFile = file;
  }
}
