# LibratusLounge 🎰🤖

> AI-powered poker agents for Primo Poker, featuring varying skill levels and personalities, deployed on Cloudflare Workers

## Overview

LibratusLounge is a sophisticated AI agent system designed to play multiplayer Texas Hold'em poker on the Primo Poker platform. Our agents simulate human players with different skill levels, playing styles, and personalities, creating a more engaging and realistic poker experience.

### Key Features

- 🎯 **Multiple Skill Levels**: Beginner, Intermediate, and Advanced agents with distinct playing strategies
- 🎭 **Personality System**: Configurable traits that affect decision-making and chat behavior
- 🧠 **Hybrid Intelligence**: Combines rule-based logic with optional LLM integration for complex decisions
- ⚡ **Serverless Architecture**: Runs on Cloudflare Workers for global low-latency performance
- 💰 **Cost-Effective**: Intelligent caching and decision optimization to minimize LLM costs
- 📊 **Performance Monitoring**: Real-time metrics for decision speed, win rates, and resource usage

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account with Workers enabled
- Wrangler CLI (`npm install -g wrangler`)
- Primo Poker API credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/LibratusLounge.git
cd LibratusLounge

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Configure your environment variables
# Edit .env with your API keys and configuration
```

### Development

```bash
# Start local development server
npm run dev

# Run tests
npm test

# Run agent simulations
npm run simulate

# Type check
npm run typecheck

# Lint code
npm run lint
```

### Deployment

```bash
# Login to Cloudflare
wrangler login

# Deploy to production
npm run deploy

# View logs
wrangler tail
```

## Architecture

### System Design

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Primo Poker    │────▶│ Cloudflare      │────▶│   AI Agents     │
│  Game Server    │◀────│   Workers       │◀────│  (Durable Obj)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │                         │
                               ▼                         ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │   Workers KV    │     │   Workers AI    │
                        │ (Decision Cache)│     │  (LLM Inference)│
                        └─────────────────┘     └─────────────────┘
```

### Agent Types

#### 1. Rule-Based Agents
- Fast, deterministic decisions
- Hand strength evaluation
- Pot odds calculations
- Position-aware play

#### 2. LLM-Enhanced Agents
- Complex reasoning for difficult spots
- Natural language game analysis
- Adaptive strategies based on opponents

#### 3. Hybrid Agents
- Best of both worlds
- Rules for common situations
- LLM for edge cases
- Automatic fallback mechanisms

## Configuration

### Agent Personalities

Configure agent personalities using trait values (0-1):

```typescript
const personality = {
  aggression: 0.7,      // How often they bet/raise vs call
  tightness: 0.6,       // Hand selection strictness
  deception: 0.5,       // Bluffing frequency
  tilt_resistance: 0.8, // Emotional stability
  risk_tolerance: 0.4,  // Willingness to gamble
  chat_frequency: 0.3   // Table talk frequency
};
```

### Preset Personalities

- **Cautious Carl**: Tight, passive, rarely bluffs
- **Aggressive Annie**: Loose, aggressive, frequent bluffer
- **Balanced Bob**: GTO-inspired, hard to exploit
- **Tilting Tim**: Emotional, makes poor decisions when losing
- **Chatty Charlie**: Talkative, tries to get reads through chat

## API Reference

### Creating an Agent

```typescript
POST /api/agents
{
  "skillLevel": "intermediate",
  "personality": "aggressive-annie",
  "enableLLM": true,
  "tableId": "table-123"
}
```

### Getting Agent Decision

```typescript
POST /api/agents/{agentId}/decision
{
  "gameState": {
    "hand": ["As", "Kd"],
    "communityCards": ["Qh", "Js", "Tc"],
    "pot": 1000,
    "toCall": 200,
    "position": "button"
  }
}
```

## Testing

### Unit Tests
```bash
npm test                 # Run all tests
npm test -- --watch     # Watch mode
npm test -- agents/     # Test specific directory
```

### Simulations
```bash
npm run simulate -- --hands 1000      # Run 1000 hand simulation
npm run simulate -- --tournament      # Tournament simulation
npm run simulate -- --heads-up        # Heads-up matches
```

### Performance Testing
```bash
npm run perf            # Run performance benchmarks
npm run load-test       # Stress test with multiple agents
```

## Monitoring

### Metrics Dashboard

Access real-time metrics at `https://your-worker.dev/metrics`:

- Decision latency (p50, p95, p99)
- LLM usage and costs
- Cache hit rates
- Agent win rates by personality
- Error rates and timeouts

### Logging

```bash
# View real-time logs
wrangler tail

# Filter by agent
wrangler tail --search "agent-id:123"

# Debug specific decisions
wrangler tail --search "decision-debug"
```

## Cost Management

### LLM Usage Optimization

1. **Decision Caching**: Similar game states reuse previous decisions
2. **Tiered Logic**: Simple decisions bypass LLM entirely
3. **Daily Budgets**: Automatic fallback when limits reached
4. **Batch Processing**: Group similar decisions when possible

### Estimated Costs

- Rule-based agents: ~$0.001 per game
- Hybrid agents: ~$0.005 per game
- Full LLM agents: ~$0.01 per game

## Troubleshooting

### Common Issues

1. **Agent Timeout**: Increase `AGENT_DECISION_TIMEOUT` in environment
2. **High Latency**: Check cache configuration and Worker location
3. **LLM Errors**: Verify API keys and model availability
4. **Memory Limits**: Reduce `DECISION_CACHE_SIZE` if needed

### Debug Mode

Enable detailed logging:

```bash
# Set in wrangler.toml
[vars]
DEBUG_MODE = "true"
LOG_LEVEL = "verbose"
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- TypeScript with strict mode
- ESLint + Prettier formatting
- 100% type coverage required
- Comprehensive test coverage

## Security

### Best Practices

- API keys stored in Cloudflare Secrets
- Input validation on all game states
- Rate limiting per agent and table
- Regular security audits

### Reporting Issues

Please report security vulnerabilities to security@libratuslounge.com

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- Primo Poker for the platform integration
- Cloudflare Workers team for the infrastructure
- The poker AI research community

## Roadmap

### Q1 2025
- ✅ Basic agent implementation
- ✅ Cloudflare Workers deployment
- 🔄 Personality system
- 🔄 LLM integration

### Q2 2025
- 📅 Multi-table tournament support
- 📅 Advanced opponent modeling
- 📅 Real-time learning system
- 📅 Mobile app for monitoring

### Q3 2025
- 📅 Additional poker variants (PLO, Stud)
- 📅 Agent marketplace
- 📅 Custom personality creator
- 📅 Tournament hosting platform

---

Built with ❤️ by the LibratusLounge team