import { parseProblem } from "./parser-engine/parserEngine";
import { highlightCode } from './syntaxHighlighter';
import './highlight.css';
import { generateWithGoogle } from './parser-engine/generateCode'
import { tokenizeProblemStatement } from "./parser-engine/tokenizer";
import { isValidGeneratedCode } from "./parser-engine/utils";
import parseStatementsToCode from "./parser-engine/inputParser";

window.addEventListener('load', function () {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function () {
            if (!document.querySelector('.section-title')) return;
            if (document.querySelector('#input-code-generator-global')) return;

            initializeExtension();
            observer.disconnect();
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (document.querySelector('.section-title')) {
        initializeExtension();
    }
});

function initializeExtension() {
    let isRegexMode = false
    const secondLevelMenu = document.querySelector('.second-level-menu');
    if (!secondLevelMenu) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'input-code-generator-global';
    wrapper.style.cssText = `display: flex; align-items: center; gap: 12px; margin-left: auto; padding: 0 10px;`;

    const button = document.createElement('button');
    Object.assign(button.style, {
        padding: "4px 8px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "14px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        position: "relative",
        overflow: "hidden"
    });

    button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg> 
        Generate Input Code
        <span style="position: absolute; background: rgba(255,255,255,0.2); border-radius: 50%; transform: scale(0); opacity: 1; pointer-events: none; animation: ripple 0.6s linear;"></span>
    `;

    button.onmouseenter = () => {
        button.style.backgroundColor = "#4CAF60";  // Darker green on hover
        button.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    };
    button.onmouseleave = () => {
        button.style.backgroundColor = "#4CAF60";  // Original green
        button.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    };

    button.addEventListener('click', (e) => {
        const ripple = button.querySelector('span');
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '1';

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = `${rect.width * 2}px`;
        ripple.style.height = `${rect.width * 2}px`;

        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0';
        ripple.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s linear';
    });

    const dropdown = document.createElement('select');
    Object.assign(dropdown.style, {
        padding: "4px 6px",
        borderRadius: "6px",
        border: "1px solid #e0e0e0",
        backgroundColor: "#f8f9fa",
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "14px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        appearance: "none",
        display: "none",
        transition: "all 0.3s ease",
        outline: "none",
        minWidth: "180px"
    });

    const dropdownArrow = document.createElement('div');
    dropdownArrow.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    `;
    Object.assign(dropdownArrow.style, {
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        transition: "transform 0.2s ease"
    });

    const dropdownContainer = document.createElement('div');
    Object.assign(dropdownContainer.style, {
        position: "relative",
        display: "none"
    });
    dropdownContainer.appendChild(dropdown);
    dropdownContainer.appendChild(dropdownArrow);

    dropdown.innerHTML = `
        <option value="" disabled selected>Select Language</option>
        <option value="python">Python</option>
        <option value="cpp">C++ </option>
        <option value="kotlin">Kotlin</option>
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>
        <option value="go">Go</option>
        <option value="rust">Rust</option>
        <option value="csharp">C#</option>
    `;

    dropdown.addEventListener('mouseenter', () => {
        dropdown.style.backgroundColor = "#ffffff";
        dropdown.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        dropdownArrow.style.transform = "translateY(-50%) rotate(180deg)";
    });

    dropdown.addEventListener('mouseleave', () => {
        dropdown.style.backgroundColor = "#f8f9fa";
        dropdown.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        dropdownArrow.style.transform = "translateY(-50%)";
    });

    wrapper.appendChild(button);
    wrapper.appendChild(dropdownContainer);
    secondLevelMenu.appendChild(wrapper);

    button.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownContainer.style.display = "inline-block";
        dropdown.style.display = "inline-block";
        button.style.display = "none";
    });

    document.addEventListener('click', function (e) {
        if (!wrapper.contains(e.target)) {
            dropdownContainer.style.display = "none";
            button.style.display = "flex";
        }
    });


    dropdown.addEventListener("change", async function (e) {
        e.stopPropagation();
        const container = document.querySelector('.input-specification');
        const lang = dropdown.value;
        let lines = tokenizeProblemStatement(container);

        // Create and show loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <span>Generating ${lang} code...</span>
        </div>
    `;
        document.body.appendChild(loadingOverlay);

        try {
            const aiGenerated = await generateWithGoogle(lines.join('\n'), lang);
            if (isValidGeneratedCode(aiGenerated, lang)) {
                showCodeAlert(aiGenerated, lang , isRegexMode);
            } else {
                // Fallback to regex for Python only
                isRegexMode = true
                if (lang === 'python') {
                    const fallbackCode = parseStatementsToCode(lines);
                    showCodeAlert(fallbackCode, lang , isRegexMode);
                } else {
                    throw new Error("fallback for this language. Not available ");
                }
            }
        } catch (error) {
            showCodeAlert(`❌ Error generating code: ${error.message}`, lang , isRegexMode);
        } finally {
            loadingOverlay.remove();
            dropdownContainer.style.display = "none";
            button.style.display = "flex";
            dropdown.value = "";
        }
            });

    addStyles();
}

function showCodeAlert(code, lang , isRegexMode) {
    console.log(lang)
    let codeString = Array.isArray(code) ? code.join('\n') : code;

const warningRegex = document.createElement('div');

warningRegex.innerHTML = `
  <div class="warning-container">
    <div class="warning-icon">⚠️</div>
    <div class="warning-content">
      <strong>Regex Mode Notice</strong>
      <p>Using Regex Mode fallback it may generate incorrect input code. Please check manually or switch to AI Mode for better results.</p>
    </div>
  </div>
`;

warningRegex.style.cssText = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #fff8e6;
  color: #663c00;
  padding: 12px;
  border-left: 2px solid #ffc107;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1;
  margin: 16px 0;
  max-width: 100%;
  box-sizing: border-box;
`;

    const alertBox = document.createElement('div');
    alertBox.className = "code-generator-alert";
    Object.assign(alertBox.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#2d3748",  // Darker background for contrast
        color: "#ecf0f1",
        padding: "0",
        borderRadius: "10px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        zIndex: "10000",
        display: "flex",
        flexDirection: "column",
        maxWidth: "80vw",
        maxHeight: "80vh",
        overflow: "hidden",
        animation: "fadeIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        border: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    });

    const header = document.createElement('div');
    Object.assign(header.style, {
        padding: "12px 16px",
        backgroundColor: "#4CAF50",  // Changed to a vibrant green
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
    });

    const title = document.createElement('div');
    title.textContent = `Generated ${lang} code  `;
    Object.assign(title.style, {
        fontWeight: "600",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    });


    const controls = document.createElement('div');
    controls.style.display = "flex";
    controls.style.alignItems = "center";
    controls.style.gap = "8px";

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    Object.assign(copyBtn.style, {
        padding: '6px 12px',
        marginLeft: `6px`,
        backgroundColor: '#2d3748',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s ease'
    });
    copyBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy
    `;

    copyBtn.onmouseenter = () => {
        copyBtn.style.backgroundColor = '#2c5282';  // Darker blue on hover
        copyBtn.style.transform = 'translateY(-1px)';
    };
    copyBtn.onmouseleave = () => {
        copyBtn.style.backgroundColor = '#3182ce';  // Original blue
        copyBtn.style.transform = 'translateY(0)';
    };

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    Object.assign(closeBtn.style, {
        background: "transparent",
        color: "#bdc3c7",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
        width: "28px",
        height: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        transition: "all 0.2s ease"
    });
    closeBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    `;

    closeBtn.onmouseenter = () => {
        closeBtn.style.color = "#ecf0f1";
        closeBtn.style.backgroundColor = "rgba(255,255,255,0.1)";
    };
    closeBtn.onmouseleave = () => {
        closeBtn.style.color = "#bdc3c7";
        closeBtn.style.backgroundColor = "transparent";
    };

    const codeContainer = document.createElement('div');
    Object.assign(codeContainer.style, {
        padding: "16px",
        overflow: "auto",
        backgroundColor: "#1e2a3a",
        flex: "1"
    });

    const highlightedCode = highlightCode(codeString, lang);
    const pre = document.createElement('pre');
    Object.assign(pre.style, {
        margin: "0",
        padding: "0",
        overflow: "visible"
    });
    const codeEl = document.createElement('code');
    codeEl.className = `hljs language-${lang}`;
    codeEl.innerHTML = highlightedCode;

    pre.appendChild(codeEl);
    header.appendChild(title);
    controls.appendChild(copyBtn);
    controls.appendChild(closeBtn);
    header.appendChild(controls);
    alertBox.appendChild(header);
    codeContainer.appendChild(pre);
    alertBox.appendChild(codeContainer);
    alertBox.appendChild(warningRegex)
    document.body.appendChild(alertBox);

    // Highlighting
    setTimeout(() => {
        if (window.hljs) window.hljs.highlightElement(codeEl);
    }, 0);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeString);
        copyBtn.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
        `;
        copyBtn.style.backgroundColor = '#2ecc71';

        setTimeout(() => {
            copyBtn.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
            `;
            copyBtn.style.backgroundColor = '#27ae60';
        }, 2000);
    });

    closeBtn.addEventListener('click', () => {
        alertBox.style.animation = "fadeOut 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)";
        setTimeout(() => alertBox.remove(), 300);
    });

    // Auto-close after 12 seconds
    setTimeout(() => {
        if (document.body.contains(alertBox)) {
            alertBox.style.animation = "fadeOut 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)";
            setTimeout(() => alertBox.remove(), 300);
        }
    }, 12000);
}



function addStyles() {
    const styleId = "code-generator-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        /* ... existing styles ... */
        
        /* Add these new styles */
        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .loading-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
}