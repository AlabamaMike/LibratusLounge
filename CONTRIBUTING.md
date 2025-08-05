# Contributing to LibratusLounge

First off, thank you for considering contributing to LibratusLounge! It's people like you that make LibratusLounge such a great tool for the poker AI community.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to conduct@libratuslounge.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Create agent with config '...'
2. Send game state '....'
3. See error

**Expected behavior**
What you expected to happen.

**Actual behavior**
What actually happened. Include error messages and stack traces.

**Environment:**
 - Node version: [e.g. 18.0.0]
 - Wrangler version: [e.g. 3.0.0]
 - OS: [e.g. macOS 13.0]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description** of the suggested enhancement
- **Provide specific examples** to demonstrate the steps
- **Describe the current behavior** and **explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful** to most LibratusLounge users

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through these issues:

- Issues labeled `good first issue` - issues which should only require a few lines of code
- Issues labeled `help wanted` - issues which should be a bit more involved than beginner issues

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

### Setting Up Your Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/LibratusLounge.git
   cd LibratusLounge
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write code
   - Add tests
   - Update documentation

4. **Run Tests**
   ```bash
   npm test
   npm run typecheck
   npm run lint
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only changes
- `style:` Changes that don't affect code meaning
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `perf:` Performance improvement
- `test:` Adding missing tests
- `chore:` Changes to build process or auxiliary tools

Examples:
```
feat: add beginner agent personality
fix: correct pot odds calculation in advanced agent
docs: update API reference for decision endpoint
perf: optimize hand evaluation with lookup tables
```

### Code Style Guidelines

#### TypeScript

- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- Document complex functions with JSDoc

```typescript
/**
 * Evaluates the strength of a poker hand
 * @param hand - The player's hole cards
 * @param community - The community cards
 * @returns A number between 0 and 1 representing hand strength
 */
export function evaluateHandStrength(
  hand: Card[],
  community: Card[]
): number {
  // Implementation
}
```

#### Testing

- Write unit tests for all new functions
- Use descriptive test names
- Group related tests with `describe` blocks
- Mock external dependencies

```typescript
describe('HandEvaluator', () => {
  describe('evaluateHandStrength', () => {
    it('should return 1.0 for royal flush', () => {
      const hand = [
        { rank: 'A', suit: 'h' },
        { rank: 'K', suit: 'h' }
      ];
      const community = [
        { rank: 'Q', suit: 'h' },
        { rank: 'J', suit: 'h' },
        { rank: 'T', suit: 'h' }
      ];
      
      expect(evaluateHandStrength(hand, community)).toBe(1.0);
    });
  });
});
```

### Project Structure Guidelines

When adding new features:

```
src/
├── agents/           # Agent implementations
├── strategies/       # Decision-making strategies
├── personality/      # Personality traits and engines
├── integration/      # External service integrations
├── utils/           # Utility functions
└── types/           # TypeScript type definitions

tests/
├── unit/            # Unit tests (mirrors src/ structure)
├── integration/     # Integration tests
└── e2e/            # End-to-end tests
```

### Performance Considerations

- Minimize LLM calls through caching
- Use Workers KV for persistent caching
- Profile code for bottlenecks
- Consider memory constraints of Workers

### Security Guidelines

- Never commit API keys or secrets
- Validate all input data
- Use type guards for runtime validation
- Implement rate limiting
- Log security-relevant events

## Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- agents/base-agent.test.ts

# Run with coverage
npm test -- --coverage
```

### Writing Tests

1. **Unit Tests**: Test individual functions and classes
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete workflows
4. **Performance Tests**: Benchmark critical paths

### Test Coverage

We aim for:
- 90%+ coverage for utility functions
- 80%+ coverage for agent logic
- 70%+ coverage for integration code

## Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Include examples in complex functions
- Document edge cases and assumptions

### User Documentation

When adding features, update:
- README.md for major features
- API_REFERENCE.md for new endpoints
- QUICKSTART.md for common use cases

## Review Process

### Before Submitting

- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main

### Pull Request Review

PRs need approval from at least one maintainer. Reviewers will check:

- Code quality and style
- Test coverage
- Documentation completeness
- Performance impact
- Security implications

### After Merge

- Delete your feature branch
- Update your local main branch
- Celebrate! 🎉

## Community

### Getting Help

- GitHub Discussions for questions
- Discord for real-time chat
- Stack Overflow with tag `libratuslounge`

### Staying Updated

- Watch the repository for updates
- Join our mailing list
- Follow @LibratusLounge on Twitter

## Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- Release notes
- Annual contributor spotlight

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to contact the maintainers:
- Email: maintainers@libratuslounge.com
- Discord: @maintainers

Thank you for contributing to LibratusLounge! 🎰🤖