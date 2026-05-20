/* ── Tech icon helper ──
   Returns an <img> for known brands (via Simple Icons CDN),
   a custom inline SVG for conceptual categories (AI, knowledge graphs, etc.),
   or a small colored dot as final fallback.
*/
window.techIcon = (function() {
  const ICONS = {
    'python':      ['python',      '3776AB'],
    'java':        ['openjdk',     '007396'],
    'javascript':  ['javascript',  'F7DF1E'],
    'typescript':  ['typescript',  '3178C6'],
    'c':           ['c',           'A8B9CC'],
    'c++':         ['cplusplus',   '00599C'],

    'react':       ['react',       '61DAFB'],
    'node.js':     ['nodedotjs',   '339933'],
    'nodejs':      ['nodedotjs',   '339933'],
    'express':     ['express',     '000000'],
    'express.js':  ['express',     '000000'],
    'flask':       ['flask',       '000000'],
    'streamlit':   ['streamlit',   'FF4B4B'],

    'numpy':       ['numpy',       '013243'],
    'pytorch':     ['pytorch',     'EE4C2C'],
    'tensorflow':  ['tensorflow',  'FF6F00'],
    'jupyter':     ['jupyter',     'F37626'],

    'mongodb':     ['mongodb',     '47A248'],
    'postgresql':  ['postgresql',  '4169E1'],
    'mysql':       ['mysql',       '4479A1'],
    'sql':         ['mysql',       '4479A1'],

    'git':         ['git',         'F05032'],
    'github':      ['github',      '181717'],
    'docker':      ['docker',      '2496ED'],
    'gcp':         ['googlecloud', '4285F4'],
    'oracle':      ['oracle',      'F80000'],

    'selenium':    ['selenium',    '43B02A'],
    'puppeteer':   ['puppeteer',   '40B5A4'],
    'postman':     ['postman',     'FF6C37'],
    'scikit-learn':['scikitlearn', 'F7931E'],
    'sklearn':     ['scikitlearn', 'F7931E'],
    'spring boot': ['springboot',  '6DB33F'],
    'spring':      ['spring',      '6DB33F'],
    'fastapi':     ['fastapi',     '009688'],
    'kafka':       ['apachekafka', '231F20'],
    'spacy':       ['spacy',       '09A3D5'],

    'html':        ['html5',       'E34F26'],
    'css':         ['css3',        '1572B6'],
    'react native':['react',       '61DAFB'],

    'lucene':      ['apache',      'D22128'],
    'langchain':   ['langchain',   '1C3C3C'],
    'transformers':['huggingface', 'FFD21E'],
    'hugging face':['huggingface', 'FFD21E'],
    'huggingface': ['huggingface', 'FFD21E'],
    'nlp':         ['huggingface', 'FFD21E'],

    'neo4j':       ['neo4j',       '008CC1'],
  };

  // Custom inline SVGs for conceptual tags (not real brand logos — used for trademark-free or removed icons)
  const CUSTOM = {
    // Sparkle / AI agent — used for LLM-related tags
    'ai': '<svg viewBox="0 0 24 24" fill="#7C3AED"><path d="M12 0l2.4 7.6L22 10l-7.6 2.4L12 20l-2.4-7.6L2 10l7.6-2.4L12 0zm6.5 14l1 3.5 3.5 1-3.5 1-1 3.5-1-3.5-3.5-1 3.5-1 1-3.5z"/></svg>',
    // Connected nodes — used for Knowledge Graphs, OWL, RDF, SPARQL, SHACL
    'graph': '<svg viewBox="0 0 24 24" fill="none" stroke="#008CC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><circle cx="6" cy="14" r="1.5"/><path d="M7.8 7.4l8.4 0M7.4 7.8l3.2 8.4M16.2 7.8l-3.2 8.4M7.5 14h9.2"/></svg>',
    // Network of agents — used for Multi-Agent Systems
    'network': '<svg viewBox="0 0 24 24" fill="none" stroke="#1C3C3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><circle cx="12" cy="13" r="1.5"/><path d="M12 7.5v4M11 14l-4.5 2.5M13 14l4.5 2.5"/></svg>',
    // Book — used for Literature Review
    'book': '<svg viewBox="0 0 24 24" fill="none" stroke="#E89849" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14z"/><path d="M4 19.5A2.5 2.5 0 016.5 22H20"/></svg>',
    // Cloud — used for AWS, Azure
    'cloud': '<svg viewBox="0 0 24 24" fill="#FF9900"><path d="M19 9a5 5 0 00-9.6-1.2A4 4 0 003 11a4 4 0 004 4h12a3 3 0 003-3 3 3 0 00-3-3z"/></svg>',
    // Robot — used for Agents
    'robot': '<svg viewBox="0 0 24 24" fill="none" stroke="#412991" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="14" r="1.2" fill="#412991"/><circle cx="15" cy="14" r="1.2" fill="#412991"/></svg>',
  };

  // Map tag → custom SVG key
  const TO_CUSTOM = {
    'llm agents':           'robot',
    'llm integration':      'robot',
    'llms':                 'robot',
    'agentic ai':           'ai',
    'multi-agent systems':  'network',
    'literature review':    'book',
    'knowledge graphs':     'graph',
    'owl':                  'graph',
    'rdf':                  'graph',
    'sparql':               'graph',
    'shacl':                'graph',
    'owl / rdf':            'graph',
    'aws':                  'cloud',
    'azure':                'cloud',
  };

  function lookup(name) {
    if (!name) return null;
    const key = String(name).toLowerCase().trim();
    return ICONS[key] || null;
  }

  function html(name, size) {
    size = size || 14;
    const key = String(name || '').toLowerCase().trim();

    // 1. Brand logo from Simple Icons CDN
    const found = ICONS[key];
    if (found) {
      const [slug, color] = found;
      return `<img src="https://cdn.simpleicons.org/${slug}/${color}" alt="" width="${size}" height="${size}" style="display:inline-block;vertical-align:middle">`;
    }

    // 2. Custom inline SVG for known concepts
    const customKey = TO_CUSTOM[key];
    if (customKey && CUSTOM[customKey]) {
      return `<span style="display:inline-block;width:${size}px;height:${size}px;vertical-align:middle">${CUSTOM[customKey].replace('<svg ', `<svg width="${size}" height="${size}" `)}</span>`;
    }

    // 3. Fallback dot
    return `<span style="display:inline-block;width:${Math.round(size*0.5)}px;height:${Math.round(size*0.5)}px;border-radius:50%;background:var(--accent);vertical-align:middle"></span>`;
  }

  return { html, lookup };
})();
