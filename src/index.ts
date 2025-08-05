/**
 * LibratusLounge - AI Poker Agents for Cloudflare Workers
 * Main entry point for the Worker
 */

import type { Env } from './types/env';

export default {
  fetch(request: Request, env: Env, _ctx: ExecutionContext): Response {
    const url = new URL(request.url);

    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route requests
      switch (url.pathname) {
        case '/':
          return new Response(
            JSON.stringify({
              name: 'LibratusLounge',
              version: '0.1.0',
              status: 'ready',
              message: 'AI Poker Agents API',
            }),
            {
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );

        case '/health':
          return new Response(
            JSON.stringify({
              status: 'healthy',
              timestamp: new Date().toISOString(),
              environment: env.ENVIRONMENT || 'development',
            }),
            {
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );

        default:
          return new Response(
            JSON.stringify({
              error: 'Not Found',
              message: `Route ${url.pathname} not found`,
            }),
            {
              status: 404,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
      }
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({
          error: 'Internal Server Error',
          message: error instanceof Error ? error.message : 'Unknown error',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
  },
};

// Export Durable Object classes
export { AgentManager } from './durable-objects/agent-manager';