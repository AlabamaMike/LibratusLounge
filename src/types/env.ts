/**
 * Environment bindings for Cloudflare Workers
 */

export interface Env {
  // Environment variables
  ENVIRONMENT: 'development' | 'staging' | 'production';
  DEBUG_MODE: string;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';

  // Secrets (set via wrangler secret)
  PRIMO_POKER_API_KEY: string;
  ANTHROPIC_API_KEY?: string;
  OPENAI_API_KEY?: string;
  WEBHOOK_SECRET?: string;

  // KV Namespaces
  DECISION_CACHE: KVNamespace;

  // Durable Objects
  AGENT_MANAGER: DurableObjectNamespace;

  // D1 Database
  DB: D1Database;

  // Analytics Engine
  ANALYTICS: AnalyticsEngineDataset;

  // Workers AI
  AI: Ai;

  // Rate Limiter
  RATE_LIMITER?: RateLimiter;
}

// Additional types for Cloudflare APIs
export interface RateLimiter {
  limit(key: string): Promise<RateLimitResult>;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export interface Ai {
  run(model: string, inputs: unknown): Promise<unknown>;
}