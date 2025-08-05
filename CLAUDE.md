# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LibratusLounge is an AI poker agent system designed to play live multiplayer poker on the Primo Poker production server. The agents simulate players of varying skill levels and personalities, are deployed on Cloudflare Workers, and include optional LLM capabilities for enhanced decision-making.

## Architecture

### Deployment Platform
- **Cloudflare Workers**: Serverless execution environment with Durable Objects for agent state management
- **Worker AI**: Cloudflare's AI inference platform for running ML models
- **LLM Integration**: Support for Anthropic, OpenAI, or Workers AI for complex decisions

### Core Components

#### Agent System
- **Base Agent Structure**: Abstract class defining the agent interface with `makeDecision()` and `getPersonality()` methods
- **Agent Manager (Durable Object)**: Manages agent lifecycle, configurations, and statistics
- **Decision Engine**: Hybrid system combining rule-based and LLM-powered decision making
- **Personality System**: Configurable traits affecting playstyle (aggression, tightness, deception, etc.)

#### Agent Types by Skill Level
- **Beginner**: Plays 60% of hands, overvalues suited/face cards, ignores position
- **Intermediate**: Plays 25-30% of hands, understands pot odds, some position awareness
- **Advanced**: Plays 18-22% of hands, calculates implied odds, strong position play, balanced bluffing

#### Integration Components
- **Game-Agent Bridge**: Handles communication between game engine and AI agents
- **Decision Webhook System**: Processes agent decision requests with timeout handling
- **Performance Monitoring**: Tracks decision times, LLM usage, and win rates

### Key Interfaces

```typescript
interface GameState {
  hand: Card[];
  communityCards: Card[];
  pot: number;
  toCall: number;
  position: Position;
  players: PlayerInfo[];
  bettingHistory: Action[];
}

interface Decision {
  action: 'fold' | 'call' | 'raise' | 'check';
  amount?: number;
  confidence: number;
  reasoning?: string;
}

interface PersonalityTraits {
  aggression: number;      // 0-1: passive to aggressive
  tightness: number;       // 0-1: loose to tight
  deception: number;       // 0-1: straightforward to tricky
  tilt_resistance: number; // 0-1: emotional to stoic
  risk_tolerance: number;  // 0-1: risk-averse to gambler
  chat_frequency: number;  // 0-1: quiet to talkative
}
```

## Project Structure

```
poker-ai-agents/
├── src/
│   ├── agents/
│   │   ├── base-agent.ts          # Abstract base class for all agents
│   │   ├── rule-based-agent.ts    # Pure rule-based decision making
│   │   ├── llm-agent.ts           # LLM-powered agent
│   │   └── hybrid-agent.ts        # Combines rules and LLM
│   ├── strategies/
│   │   ├── hand-evaluation.ts     # Poker hand strength calculations
│   │   ├── position-play.ts       # Position-based strategy
│   │   └── betting-patterns.ts    # Betting strategy logic
│   ├── personality/
│   │   ├── traits.ts              # Personality trait definitions
│   │   ├── presets.ts             # Pre-configured personalities
│   │   └── personality-engine.ts  # Apply personality to decisions
│   ├── skill-levels/
│   │   ├── beginner.ts            # Beginner agent implementation
│   │   ├── intermediate.ts        # Intermediate agent implementation
│   │   └── advanced.ts            # Advanced agent implementation
│   ├── durable-objects/
│   │   └── agent-manager.ts       # Agent lifecycle management
│   ├── integration/
│   │   └── game-bridge.ts         # Game engine integration
│   └── utils/
│       ├── caching.ts             # Decision caching system
│       ├── rate-limiting.ts       # API rate limiting
│       └── monitoring.ts          # Performance metrics
├── tests/
│   ├── unit/
│   ├── integration/
│   └── simulations/
└── wrangler.toml
```

## Development Commands

### Build and Deploy
```bash
# Install dependencies
npm install

# Run development server with Wrangler
npm run dev

# Build TypeScript
npm run build

# Deploy to Cloudflare Workers
npm run deploy

# Run agent simulations
npm run simulate
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run agent vs agent simulations
npm run test:simulate

# Run specific test file
npm test -- path/to/test.ts
```

### Linting and Type Checking
```bash
# Run linter
npm run lint

# Run type checker
npm run typecheck

# Format code
npm run format
```

## Environment Configuration

```env
# LLM Configuration
LLM_PROVIDER=anthropic|openai|workers-ai
LLM_API_KEY=your-key-here
LLM_MODEL=claude-3-opus-20240229

# Agent Configuration
MAX_AGENTS_PER_GAME=5
AGENT_DECISION_TIMEOUT=5000
ENABLE_LLM_AGENTS=true
LLM_DAILY_BUDGET=10.00

# Caching
DECISION_CACHE_SIZE=10000
CACHE_TTL_SECONDS=3600

# Primo Poker Integration
PRIMO_POKER_API_URL=wss://api.primo.poker
PRIMO_POKER_API_KEY=your-key-here
```

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
- Core agent structure and base classes
- Agent Manager Durable Object
- Basic game state integration
- Timeout handling for decisions

### Phase 2: Rule-Based Agents (Weeks 2-3)
- Hand strength evaluation
- Pot odds calculations
- Position-based play
- Skill level differentiation

### Phase 3: Personality System (Weeks 3-4)
- Personality trait implementation
- Preset personalities (Cautious Carl, Aggressive Annie, etc.)
- Chat message generation
- Behavioral consistency

### Phase 4: LLM Integration (Weeks 4-5)
- LLM decision maker with caching
- Prompt templates for different skill levels
- Hybrid decision system
- Fallback mechanisms

### Phase 5: Performance & Optimization (Weeks 5-6)
- Decision caching system
- Performance monitoring
- Cost management for LLM calls
- Load testing

### Phase 6: Integration & Testing (Weeks 6-7)
- Full game engine integration
- Comprehensive test suite
- Production deployment
- Performance tuning

## Key Performance Requirements

- **Decision Time**: < 2 seconds (95th percentile)
- **LLM Cost**: < $0.01 per agent per game
- **Cache Hit Rate**: > 70% for similar game states
- **Agent Availability**: 99.9% uptime
- **Memory Usage**: < 128MB per agent instance

## Development Guidelines

1. **Start Simple**: Implement basic fold/call/raise logic before complex strategies
2. **Test Extensively**: Use simulations to verify reasonable play
3. **Monitor Costs**: Implement LLM budgets early to control expenses
4. **Profile Performance**: Ensure decisions meet time constraints
5. **Gradual Rollout**: Begin with rule-based agents, add LLM features incrementally
6. **Natural Behavior**: Make AI players feel human, not robotic

## Cloudflare Workers Specifics

- Use Durable Objects for agent state persistence
- Implement request/response pattern for agent decisions
- Handle Worker CPU time limits (10ms-50ms)
- Use KV storage for decision caching
- Leverage Workers AI for cost-effective inference

## Security Considerations

- Never expose API keys in code or logs
- Validate all game state inputs
- Implement rate limiting for agent requests
- Use Cloudflare Secrets for sensitive data
- Audit agent decisions for exploitable patterns