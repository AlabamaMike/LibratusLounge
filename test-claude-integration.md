# Claude Code Integration Test

This is a test file to verify that the Claude Code GitHub Action is working correctly.

## Test Scenarios

1. **Code Review**: Claude should analyze this file and provide feedback
2. **Issue Detection**: Check if Claude identifies any issues
3. **Suggestions**: Claude should provide improvement suggestions

## Sample Code to Review

```typescript
// This intentionally has some issues Claude should catch
function testFunction(data: any): string {
  if (data == null) return '';

  let result = '';
  for (let i = 0; i < data.length; i++) {
    result = result + data[i] + ' ';
  }

  return result;
}
```

## Expected Claude Feedback

Claude should identify:

- Use of `any` type (should be more specific)
- Use of `==` instead of `===`
- Inefficient string concatenation
- Missing error handling
- Potential performance improvements

If Claude provides feedback on this PR, the integration is working! 🎉
