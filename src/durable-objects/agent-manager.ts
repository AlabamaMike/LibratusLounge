/**
 * AgentManager Durable Object
 * Manages AI agent lifecycle and state
 */

import type { Env } from '../types/env';

export class AgentManager implements DurableObject {
  constructor(private state: DurableObjectState, private env: Env) {}

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const method = request.method;

    try {
      switch (method) {
        case 'GET':
          if (url.pathname === '/agents') {
            return this.listAgents();
          }
          break;

        case 'POST':
          if (url.pathname === '/agents') {
            return this.createAgent(request);
          }
          break;

        default:
          return new Response('Method not allowed', { status: 405 });
      }

      return new Response('Not found', { status: 404 });
    } catch (error) {
      console.error('AgentManager error:', error);
      return new Response(
        JSON.stringify({
          error: 'Internal error',
          message: error instanceof Error ? error.message : 'Unknown error',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

  private listAgents(): Response {
    // TODO: Implement agent listing
    return new Response(
      JSON.stringify({
        agents: [],
        total: 0,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  private async createAgent(request: Request): Promise<Response> {
    // TODO: Implement agent creation
    const config = await request.json();
    
    return new Response(
      JSON.stringify({
        agentId: `agent_${Date.now()}`,
        status: 'created',
        config,
        createdAt: new Date().toISOString(),
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}