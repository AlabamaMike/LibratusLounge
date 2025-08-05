# LibratusLounge Quick Start Guide

This guide will get you up and running with LibratusLounge in under 10 minutes.

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A Cloudflare account
- Basic knowledge of TypeScript and poker

## 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/LibratusLounge.git
cd LibratusLounge

# Install dependencies
npm install

# Install Wrangler CLI globally
npm install -g wrangler
```

## 2. Configure Environment

Create a `.env` file in the project root:

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Required: Primo Poker credentials
PRIMO_POKER_API_URL=wss://api.primo.poker
PRIMO_POKER_API_KEY=your-api-key-here

# Optional: LLM configuration (for advanced agents)
LLM_PROVIDER=workers-ai  # or 'anthropic' or 'openai'
ANTHROPIC_API_KEY=your-anthropic-key  # if using Anthropic
OPENAI_API_KEY=your-openai-key        # if using OpenAI

# Agent settings
MAX_AGENTS_PER_GAME=5
AGENT_DECISION_TIMEOUT=5000
```

## 3. Local Development

Start the development server:

```bash
npm run dev
```

You should see:
```
⎔ Starting local server...
╭────────────────────────────────────────────╮
│ [b] open a browser, [d] open devtools,     │
│ [l] turn off local mode, [c] clear console │
╰────────────────────────────────────────────╯
```

## 4. Create Your First Agent

Make a POST request to create an agent:

```bash
curl -X POST http://localhost:8787/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "skillLevel": "intermediate",
    "personality": "balanced-bob",
    "enableLLM": false,
    "bankroll": 1000
  }'
```

Response:
```json
{
  "agentId": "agent_1234567890",
  "status": "created",
  "config": {
    "skillLevel": "intermediate",
    "personality": "balanced-bob",
    "enableLLM": false,
    "bankroll": 1000
  }
}
```

## 5. Test Agent Decision Making

Send a game state to get a decision:

```bash
curl -X POST http://localhost:8787/api/agents/agent_1234567890/decision \
  -H "Content-Type: application/json" \
  -d '{
    "gameState": {
      "hand": ["As", "Kd"],
      "communityCards": [],
      "pot": 150,
      "toCall": 100,
      "position": "BTN",
      "stackSize": 1000,
      "blindLevel": {"small": 25, "big": 50}
    }
  }'
```

Response:
```json
{
  "decision": {
    "action": "raise",
    "amount": 300,
    "confidence": 0.85,
    "reasoning": "Strong hand in position",
    "thinkingTime": 125
  },
  "agentId": "agent_1234567890",
  "processingTime": 145
}
```

## 6. Run Simulations

Test your agents with the simulation tool:

```bash
# Run a quick 100-hand simulation
npm run simulate -- --hands 100 --agents 4

# Run a heads-up match between two agents
npm run simulate -- --mode heads-up --hands 1000 \
  --agent1 beginner --agent2 advanced
```

## 7. Deploy to Cloudflare

### First-time setup:

```bash
# Login to Cloudflare
wrangler login

# Create KV namespace for caching
wrangler kv:namespace create "DECISION_CACHE"

# Create Durable Objects namespace
wrangler publish --dry-run
```

### Deploy:

```bash
# Deploy to production
npm run deploy

# Or deploy to staging first
npm run deploy:staging
```

## 8. Monitor Your Agents

View real-time metrics:

```bash
# Tail production logs
wrangler tail

# View metrics dashboard (after deployment)
open https://your-worker-name.workers.dev/metrics
```

## Common Commands

```bash
# Development
npm run dev          # Start local server
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run typecheck    # Type check
npm run lint         # Lint code

# Simulation
npm run simulate     # Run default simulation
npm run benchmark    # Performance benchmarks

# Deployment
npm run deploy:staging    # Deploy to staging
npm run deploy           # Deploy to production
npm run logs            # View production logs
```

## Example: Custom Agent

Create a custom personality:

```typescript
// src/agents/custom/my-agent.ts
import { BasePokerAgent } from '../base-agent';
import { GameState, Decision } from '../types';

export class MyCustomAgent extends BasePokerAgent {
  async makeDecision(gameState: GameState): Promise<Decision> {
    // Your custom logic here
    const handStrength = this.evaluateHand(gameState);
    
    if (handStrength > 0.8) {
      return {
        action: 'raise',
        amount: gameState.pot * 0.75,
        confidence: 0.9,
        reasoning: 'Very strong hand',
        thinkingTime: this.randomThinkingTime(500, 2000)
      };
    }
    
    // More decision logic...
  }
  
  getPersonality() {
    return {
      name: 'My Custom Agent',
      aggression: 0.6,
      tightness: 0.7,
      // ... other traits
    };
  }
}
```

## Troubleshooting

### Agent not responding?
- Check `AGENT_DECISION_TIMEOUT` is sufficient (default: 5000ms)
- Verify WebSocket connection to Primo Poker
- Check logs with `wrangler tail`

### High latency?
- Enable caching in `.env`: `ENABLE_CACHE=true`
- Check if LLM provider is responding slowly
- Use rule-based agents for better performance

### Deployment failed?
- Ensure you're logged in: `wrangler login`
- Check `wrangler.toml` configuration
- Verify all environment variables are set

## Next Steps

1. **Explore Agent Types**: Try different skill levels and personalities
2. **Run Tournaments**: Set up multi-table tournaments with mixed agents
3. **Customize Behavior**: Create your own agent personalities
4. **Monitor Performance**: Use the metrics dashboard to optimize
5. **Join Community**: Share your agents and strategies

## Resources

- [Full Documentation](../README.md)
- [Architecture Overview](ARCHITECTURE.md)
- [Implementation Plan](IMPLEMENTATION_PLAN.md)
- [API Reference](API_REFERENCE.md)
- [Contributing Guide](../CONTRIBUTING.md)

## Getting Help

- GitHub Issues: [github.com/yourusername/LibratusLounge/issues](https://github.com/yourusername/LibratusLounge/issues)
- Discord: [discord.gg/libratuslounge](https://discord.gg/libratuslounge)
- Email: support@libratuslounge.com

Happy poker bot building! 🎰🤖