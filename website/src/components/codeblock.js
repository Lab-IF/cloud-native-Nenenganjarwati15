// Code Block Component with syntax highlighting

export function createCodeBlock(code, lang = 'text', title = '') {
  const highlighted = highlightSyntax(code, lang);
  
  return `
    <div class="code-block">
      ${title ? `
        <div class="code-header">
          <span class="code-lang">${lang}</span>
          <button class="code-copy" onclick="copyCode(this)">Copy</button>
        </div>
      ` : ''}
      <div class="code-content">
        <pre>${highlighted}</pre>
      </div>
    </div>
  `;
}

function highlightSyntax(code, lang) {
  // Escape HTML first
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Apply syntax highlighting based on language
  switch (lang.toLowerCase()) {
    case 'dockerfile':
      return highlightDockerfile(escaped);
    case 'yaml':
    case 'yml':
      return highlightYaml(escaped);
    case 'python':
    case 'py':
      return highlightPython(escaped);
    case 'javascript':
    case 'js':
      return highlightJavaScript(escaped);
    case 'bash':
    case 'sh':
    case 'shell':
      return highlightBash(escaped);
    default:
      return escaped;
  }
}

function highlightDockerfile(code) {
  // Keywords
  code = code.replace(/^(FROM|RUN|COPY|ADD|WORKDIR|EXPOSE|CMD|ENTRYPOINT|ENV|ARG|LABEL|USER|VOLUME|HEALTHCHECK|SHELL|STOPSIGNAL|ONBUILD|MAINTAINER)\b/gm, 
    '<span class="code-keyword">$1</span>');
  
  // AS keyword in FROM
  code = code.replace(/\bAS\b/g, '<span class="code-keyword">AS</span>');
  
  // Comments
  code = code.replace(/(#.*)$/gm, '<span class="code-comment">$1</span>');
  
  // Strings
  code = code.replace(/"([^"]*?)"/g, '<span class="code-string">"$1"</span>');
  code = code.replace(/'([^']*?)'/g, '<span class="code-string">\'$1\'</span>');
  
  return code;
}

function highlightYaml(code) {
  // Keys
  code = code.replace(/^(\s*)([a-zA-Z_][a-zA-Z0-9_-]*)(:)/gm, 
    '$1<span class="code-property">$2</span>$3');
  
  // Strings
  code = code.replace(/"([^"]*?)"/g, '<span class="code-string">"$1"</span>');
  code = code.replace(/'([^']*?)'/g, '<span class="code-string">\'$1\'</span>');
  
  // Comments
  code = code.replace(/(#.*)$/gm, '<span class="code-comment">$1</span>');
  
  // Numbers
  code = code.replace(/:\s*(\d+)\s*$/gm, ': <span class="code-number">$1</span>');
  
  // Booleans
  code = code.replace(/:\s*(true|false)\s*$/gim, ': <span class="code-keyword">$1</span>');
  
  return code;
}

function highlightPython(code) {
  // Keywords
  const keywords = ['from', 'import', 'def', 'class', 'return', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'with', 'as', 'in', 'not', 'and', 'or', 'True', 'False', 'None'];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    code = code.replace(regex, '<span class="code-keyword">$1</span>');
  });
  
  // Strings
  code = code.replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, '<span class="code-string">$1</span>');
  code = code.replace(/(f?"[^"]*?")/g, '<span class="code-string">$1</span>');
  code = code.replace(/(f?'[^']*?')/g, '<span class="code-string">$1</span>');
  
  // Comments
  code = code.replace(/(#.*)$/gm, '<span class="code-comment">$1</span>');
  
  // Decorators
  code = code.replace(/(@\w+)/g, '<span class="code-function">$1</span>');
  
  // Function calls
  code = code.replace(/\b([a-zA-Z_]\w*)\(/g, '<span class="code-function">$1</span>(');
  
  return code;
}

function highlightJavaScript(code) {
  // Keywords
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'extends', 'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'true', 'false', 'null', 'undefined'];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    code = code.replace(regex, '<span class="code-keyword">$1</span>');
  });
  
  // Strings
  code = code.replace(/(`[\s\S]*?`)/g, '<span class="code-string">$1</span>');
  code = code.replace(/("[^"]*?")/g, '<span class="code-string">$1</span>');
  code = code.replace(/('[^']*?')/g, '<span class="code-string">$1</span>');
  
  // Comments
  code = code.replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>');
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>');
  
  // Function calls
  code = code.replace(/\b([a-zA-Z_]\w*)\(/g, '<span class="code-function">$1</span>(');
  
  return code;
}

function highlightBash(code) {
  // Commands
  code = code.replace(/^(\s*)(docker|kubectl|minikube|npm|git|curl|sudo|cd|ls|mkdir|rm|cp|mv|cat|echo|pip|python|node)\b/gm, 
    '$1<span class="code-function">$2</span>');
  
  // Flags
  code = code.replace(/(\s)(--?[a-zA-Z][\w-]*)/g, '$1<span class="code-property">$2</span>');
  
  // Strings
  code = code.replace(/"([^"]*?)"/g, '<span class="code-string">"$1"</span>');
  code = code.replace(/'([^']*?)'/g, '<span class="code-string">\'$1\'</span>');
  
  // Comments
  code = code.replace(/(#.*)$/gm, '<span class="code-comment">$1</span>');
  
  // Variables
  code = code.replace(/(\$\{?\w+\}?)/g, '<span class="code-keyword">$1</span>');
  
  return code;
}

// Copy to clipboard function (global)
window.copyCode = function(button) {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock.querySelector('pre').textContent;
  
  navigator.clipboard.writeText(code).then(() => {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = 'var(--color-success)';
    button.style.color = 'white';
    button.style.borderColor = 'var(--color-success)';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
      button.style.color = '';
      button.style.borderColor = '';
    }, 2000);
  });
};
