import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import cpp from 'highlight.js/lib/languages/cpp';
import kotlin from 'highlight.js/lib/languages/kotlin'
import java from 'highlight.js/lib/languages/java'
import go from 'highlight.js/lib/languages/go'
import rust from 'highlight.js/lib/languages/rust'
import csharp from 'highlight.js/lib/languages/csharp'



// Add other languages as needed

// Register languages
hljs.registerLanguage('python', python);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('kotlin', kotlin)
hljs.registerLanguage('csharp', csharp)
hljs.registerLanguage('java', java)
hljs.registerLanguage('go', go)
hljs.registerLanguage('rust', rust)


// Register other languages as needed

export function highlightCode(code, language) {
    // Ensure the language is registered
    if (!hljs.getLanguage(language)) {
        console.warn(`Language ${language} not registered for highlighting`);
        return code; // Return unhighlighted code
    }
    
    try {
        return hljs.highlight(code, { language }).value;
    } catch (e) {
        console.error('Highlighting error:', e);
        return code; // Return unhighlighted code if highlighting fails
    }
}

export function applyHighlighting(element, language) {
    if (element) {
        hljs.highlightElement(element);
    }
}