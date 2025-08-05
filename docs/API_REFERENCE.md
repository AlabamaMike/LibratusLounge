# LibratusLounge API Reference

## Base URL

```
Development: http://localhost:8787
Production: https://libratus-lounge.workers.dev
```

## Authentication

All API requests require an API key in the header:

```http
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Agent Management

#### Create Agent

Create a new AI poker agent.

```http
POST /api/agents
```

**Request Body:**
```json
{
  "skillLevel": "beginner|intermediate|advanced",
  "personality": "string", // preset name or custom config
  "enableLLM": boolean,
  "bankroll": number,
  "tableId": "string" // optional, auto-join table
}
```

**Response:**
```json
{
  "agentId": "agent_1234567890",
  "status": "created",
  "config": {
    "skillLevel": "intermediate",
    "personality": "balanced-bob",
    "enableLLM": false,
    "bankroll": 1000
  },
  "createdAt": "2024-01-20T12:00:00Z"
}
```

#### Get Agent

Retrieve agent details.

```http
GET /api/agents/{agentId}
```

**Response:**
```json
{
  "agentId": "agent_1234567890",
  "status": "active|inactive|suspended",
  "config": {
    "skillLevel": "intermediate",
    "personality": "balanced-bob",
    "enableLLM": false,
    "bankroll": 850
  },
  "stats": {
    "handsPlayed": 234,
    "winRate": 0.52,
    "avgPotWon": 125,
    "totalWinnings": -150
  },
  "createdAt": "2024-01-20T12:00:00Z",
  "lastActiveAt": "2024-01-20T14:30:00Z"
}
```

#### List Agents

Get all agents for your account.

```http
GET /api/agents?limit=10&offset=0&status=active
```

**Query Parameters:**
- `limit` (number): Max results per page (default: 10, max: 100)
- `offset` (number): Pagination offset (default: 0)
- `status` (string): Filter by status: active|inactive|all

**Response:**
```json
{
  "agents": [
    {
      "agentId": "agent_1234567890",
      "status": "active",
      "skillLevel": "intermediate",
      "personality": "balanced-bob",
      "bankroll": 850,
      "lastActiveAt": "2024-01-20T14:30:00Z"
    }
  ],
  "total": 25,
  "limit": 10,
  "offset": 0
}
```

#### Update Agent

Modify agent configuration.

```http
PATCH /api/agents/{agentId}
```

**Request Body:**
```json
{
  "personality": "aggressive-annie", // optional
  "enableLLM": true, // optional
  "bankroll": 2000 // optional, add funds
}
```

**Response:**
```json
{
  "agentId": "agent_1234567890",
  "status": "updated",
  "config": {
    "skillLevel": "intermediate",
    "personality": "aggressive-annie",
    "enableLLM": true,
    "bankroll": 2000
  }
}
```

#### Delete Agent

Remove an agent (cannot be undone).

```http
DELETE /api/agents/{agentId}
```

**Response:**
```json
{
  "agentId": "agent_1234567890",
  "status": "deleted",
  "deletedAt": "2024-01-20T15:00:00Z"
}
```

### Decision Making

#### Get Decision

Request a decision for a game state.

```http
POST /api/agents/{agentId}/decision
```

**Request Body:**
```json
{
  "gameState": {
    "hand": ["As", "Kd"],
    "communityCards": ["Qh", "Js", "3c"],
    "pot": 500,
    "toCall": 200,
    "position": "BTN|CO|MP|UTG|SB|BB",
    "players": [
      {
        "position": "SB",
        "stackSize": 980,
        "isActive": true,
        "hasActed": true,
        "lastAction": "raise"
      }
    ],
    "bettingHistory": [
      {"round": "preflop", "actions": ["fold", "fold", "raise:100", "call"]}
    ],
    "stackSize": 1500,
    "blindLevel": {"small": 25, "big": 50}
  },
  "timeout": 3000 // optional, milliseconds
}
```

**Response:**
```json
{
  "decision": {
    "action": "fold|call|raise|check|all-in",
    "amount": 400, // only for raise/all-in
    "confidence": 0.85,
    "reasoning": "Strong draw with good pot odds",
    "thinkingTime": 1250
  },
  "agentId": "agent_1234567890",
  "processingTime": 1456,
  "usedLLM": false,
  "cacheHit": true
}
```

### Table Management

#### Join Table

Add agent to a poker table.

```http
POST /api/tables/{tableId}/join
```

**Request Body:**
```json
{
  "agentId": "agent_1234567890",
  "seatPreference": 3, // optional, 1-9
  "buyIn": 1000
}
```

**Response:**
```json
{
  "tableId": "table_abc123",
  "agentId": "agent_1234567890",
  "seat": 3,
  "status": "seated",
  "stackSize": 1000
}
```

#### Leave Table

Remove agent from table.

```http
POST /api/tables/{tableId}/leave
```

**Request Body:**
```json
{
  "agentId": "agent_1234567890"
}
```

**Response:**
```json
{
  "tableId": "table_abc123",
  "agentId": "agent_1234567890",
  "status": "left",
  "finalStack": 1250,
  "handsPlayed": 45
}
```

### Analytics

#### Agent Performance

Get detailed performance metrics.

```http
GET /api/agents/{agentId}/performance?period=24h
```

**Query Parameters:**
- `period`: Time period: 1h|24h|7d|30d|all

**Response:**
```json
{
  "agentId": "agent_1234567890",
  "period": "24h",
  "metrics": {
    "handsPlayed": 234,
    "winRate": 0.52,
    "bb100": 12.5, // big blinds won per 100 hands
    "vpip": 0.28, // voluntarily put in pot
    "pfr": 0.22, // pre-flop raise
    "aggression": 2.1, // aggression factor
    "wtsd": 0.25 // went to showdown
  },
  "results": {
    "totalWon": 450,
    "totalLost": 600,
    "netResult": -150,
    "biggestPot": 1200,
    "biggestLoss": -800
  },
  "decisions": {
    "total": 1250,
    "fold": 0.45,
    "call": 0.25,
    "raise": 0.28,
    "check": 0.02
  }
}
```

#### System Metrics

Get system-wide metrics.

```http
GET /api/metrics
```

**Response:**
```json
{
  "system": {
    "activeAgents": 145,
    "totalDecisions": 125000,
    "avgDecisionTime": 245,
    "cacheHitRate": 0.72,
    "llmUsageRate": 0.15
  },
  "performance": {
    "p50Latency": 125,
    "p95Latency": 450,
    "p99Latency": 1200,
    "errorRate": 0.001
  },
  "costs": {
    "last24h": {
      "llmCalls": 2500,
      "llmCost": 25.50,
      "workerInvocations": 125000,
      "workerCost": 12.50,
      "totalCost": 38.00
    }
  }
}
```

### Personalities

#### List Personalities

Get available personality presets.

```http
GET /api/personalities
```

**Response:**
```json
{
  "personalities": [
    {
      "id": "cautious-carl",
      "name": "Cautious Carl",
      "description": "Tight, passive player who rarely bluffs",
      "traits": {
        "aggression": 0.2,
        "tightness": 0.85,
        "deception": 0.1,
        "tilt_resistance": 0.9,
        "risk_tolerance": 0.2,
        "chat_frequency": 0.3
      },
      "recommendedSkillLevel": "beginner"
    }
  ]
}
```

#### Create Custom Personality

Define a new personality configuration.

```http
POST /api/personalities
```

**Request Body:**
```json
{
  "name": "Tricky Tom",
  "description": "Deceptive player with balanced aggression",
  "traits": {
    "aggression": 0.6,
    "tightness": 0.5,
    "deception": 0.8,
    "tilt_resistance": 0.7,
    "risk_tolerance": 0.6,
    "chat_frequency": 0.4,
    "ego": 0.7,
    "patience": 0.6
  }
}
```

**Response:**
```json
{
  "id": "custom_tricky_tom_12345",
  "name": "Tricky Tom",
  "status": "created",
  "createdAt": "2024-01-20T15:00:00Z"
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "AGENT_NOT_FOUND",
    "message": "Agent with ID agent_1234567890 not found",
    "details": {
      "agentId": "agent_1234567890"
    }
  },
  "requestId": "req_abc123",
  "timestamp": "2024-01-20T15:00:00Z"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Malformed request body or parameters |
| `UNAUTHORIZED` | 401 | Missing or invalid API key |
| `FORBIDDEN` | 403 | Access denied to resource |
| `NOT_FOUND` | 404 | Resource not found |
| `AGENT_NOT_FOUND` | 404 | Specific agent not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `TIMEOUT` | 408 | Request timeout |
| `INTERNAL_ERROR` | 500 | Server error |
| `LLM_ERROR` | 503 | LLM provider unavailable |

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|---------|
| Create Agent | 10 | 1 hour |
| Get Decision | 100 | 1 minute |
| All Others | 1000 | 1 hour |

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705760400
```

## Webhooks

Configure webhooks to receive real-time events.

### Setup Webhook

```http
POST /api/webhooks
```

**Request Body:**
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["decision.made", "agent.error", "game.ended"],
  "secret": "your-webhook-secret"
}
```

### Event Types

- `agent.created`: New agent created
- `agent.updated`: Agent configuration changed
- `agent.deleted`: Agent removed
- `decision.made`: Decision completed
- `decision.timeout`: Decision timed out
- `game.joined`: Agent joined table
- `game.left`: Agent left table
- `game.ended`: Game/session completed
- `agent.error`: Agent encountered error

### Event Payload

```json
{
  "event": "decision.made",
  "timestamp": "2024-01-20T15:00:00Z",
  "data": {
    "agentId": "agent_1234567890",
    "decision": {
      "action": "raise",
      "amount": 200,
      "confidence": 0.85
    },
    "gameState": {
      // ... game state that triggered decision
    }
  }
}
```

## SDK Examples

### JavaScript/TypeScript

```typescript
import { LibratusLounge } from '@libratuslounge/sdk';

const client = new LibratusLounge({
  apiKey: 'YOUR_API_KEY',
  environment: 'production'
});

// Create an agent
const agent = await client.createAgent({
  skillLevel: 'intermediate',
  personality: 'balanced-bob',
  bankroll: 1000
});

// Get a decision
const decision = await agent.getDecision({
  hand: ['As', 'Kd'],
  communityCards: ['Qh', 'Js', '3c'],
  pot: 500,
  toCall: 200,
  position: 'BTN'
});

console.log(`Action: ${decision.action}, Amount: ${decision.amount}`);
```

### Python

```python
from libratuslounge import LibratusLounge

client = LibratusLounge(
    api_key='YOUR_API_KEY',
    environment='production'
)

# Create an agent
agent = client.create_agent(
    skill_level='intermediate',
    personality='balanced-bob',
    bankroll=1000
)

# Get a decision
decision = agent.get_decision(
    hand=['As', 'Kd'],
    community_cards=['Qh', 'Js', '3c'],
    pot=500,
    to_call=200,
    position='BTN'
)

print(f"Action: {decision.action}, Amount: {decision.amount}")
```

## Testing

Use our sandbox environment for testing:

```
Base URL: https://sandbox.libratus-lounge.workers.dev
```

Test API keys are available in your dashboard. The sandbox uses play money and resets daily.