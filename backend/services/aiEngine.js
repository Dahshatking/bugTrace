// services/aiEngine.js
// Simple heuristic-based analyzer — replace with ML/NLP model later.

const analyze = async (parsed = {}) => {
  const { errors = [], raw = '' } = parsed;

  let errorCategory = 'Unknown';
  let confidence = 0.6;
  const possibleCauses = [];
  const suggestions = [];

  const text = raw.toLowerCase();

  if (/nullpointer|cannot read property|undefined/.test(text)) {
    errorCategory = 'Runtime Error - Null/Undefined';
    confidence = 0.9;
    possibleCauses.push('Null/undefined reference in code');
    suggestions.push('Add null checks or initialize variables before use');
  } else if (/syntaxerror|unexpected token/.test(text)) {
    errorCategory = 'Syntax Error';
    confidence = 0.95;
    possibleCauses.push('Invalid syntax in source file');
    suggestions.push('Check code syntax, missing braces, commas, or keywords');
  } else if (/module not found|cannot find module|import error/.test(text)) {
    errorCategory = 'Dependency/Error - Module';
    confidence = 0.88;
    possibleCauses.push('Missing dependency or incorrect import path');
    suggestions.push('Install the missing package or correct the import path');
  } else if (errors.length > 0) {
    errorCategory = 'General Error';
    confidence = 0.7;
    possibleCauses.push('See error lines for details');
    suggestions.push('Inspect the stack trace and related error lines');
  } else {
    errorCategory = 'Info/Unknown';
    confidence = 0.5;
    suggestions.push('No explicit error found — check logs for more context');
  }

  return {
    errorCategory,
    confidence,
    possibleCauses,
    suggestions
  };
};

// ✅ Export as default so it can be imported as "aiEngine"
export default { analyze };
