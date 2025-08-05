---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: 'bug'
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Create agent with config '...'
2. Send game state '....'
3. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Actual behavior**
What actually happened. Include error messages and stack traces.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - Node version: [e.g. 18.0.0]
 - Wrangler version: [e.g. 3.0.0]
 - OS: [e.g. macOS 13.0]
 - Browser (if applicable): [e.g. Chrome 120]

**Agent Configuration:**
```json
{
  "skillLevel": "intermediate",
  "personality": "balanced-bob",
  "enableLLM": false
}
```

**Game State (if applicable):**
```json
{
  "hand": ["As", "Kd"],
  "communityCards": ["Qh", "Js", "3c"],
  "pot": 500,
  "toCall": 200
}
```

**Additional context**
Add any other context about the problem here.