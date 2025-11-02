// Very basic parser — splits lines, finds stack traces, and detects error keywords.
// Replace or extend with real parsing logic (regex, timestamp extraction, etc.)

export const parseLog = (content) => {
  const lines = content
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const errors = lines.filter(line => /error|exception|trace/i.test(line));

  return { lines, errors, raw: content };
};
