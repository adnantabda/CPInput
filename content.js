function generateInputCode(problemText, language = "python") {
    const lower = problemText.toLowerCase();

    if (language === "python") {
        if (lower.includes("only") && lower.includes("integer")) {
            return "w = int(input())";
        }
        return "# Couldn't detect input pattern";
    }
    return "// Language not supported yet";
}

// Wait for both DOM and all resources to load
window.addEventListener('load', function() {
    // Use MutationObserver to handle dynamic content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (!document.querySelector('.section-title')) return;
            
            // Only initialize once
            if (document.querySelector('#input-code-generator')) return;
            
            initializeExtension();
            observer.disconnect();
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Also try initializing immediately in case content is already loaded
    if (document.querySelector('.section-title')) {
        initializeExtension();
    }
});

function initializeExtension() {
    const inputSection = document.querySelector('.section-title');
    if (!inputSection || inputSection.innerText.trim() !== "Input") return;

    // Create a wrapper with unique ID to prevent duplicates
    const wrapper = document.createElement('div');
    wrapper.id = "input-code-generator";
    Object.assign(wrapper.style, {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "10px 0",
        position: "relative"
    });

    // Create the generate button
    const button = document.createElement('button');
    Object.assign(button.style, {
        padding: "8px 16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "14px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: "6px"
    });
    button.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg> Generate Input Code`;

    // Hover effect for button
    button.onmouseenter = () => button.style.backgroundColor = "#3e8e41";
    button.onmouseleave = () => button.style.backgroundColor = "#4CAF50";

    // Create the language dropdown
    const dropdown = document.createElement('select');
    Object.assign(dropdown.style, {
        padding: "8px 12px",
        paddingRight: "32px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        backgroundColor: "#f8f9fa",
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "14px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        appearance: "none",
        display: "none",
        transition: "all 0.3s ease",
        outline: "none"
    });

    // Custom dropdown arrow
    const dropdownArrow = document.createElement('div');
    dropdownArrow.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
    Object.assign(dropdownArrow.style, {
        position: "absolute",
        right: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none"
    });

    // Dropdown container
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
        <option value="cpp">C++ (Coming Soon)</option>
        <option value="java">Java (Coming Soon)</option>
        <option value="javascript">JavaScript (Coming Soon)</option>
        <option value="kotlin">Kotlin (Coming Soon)</option>
        <option value="go">Go (Coming Soon)</option>
        <option value="rust">Rust (Coming Soon)</option>
        <option value="csharp">C# (Coming Soon)</option>
    `;

    // Append elements to wrapper
    wrapper.appendChild(button);
    wrapper.appendChild(dropdownContainer);

    // Insert the wrapper after the "Input" title
    inputSection.parentNode.insertBefore(wrapper, inputSection.nextSibling);

    // Button click handler
// Button click handler
button.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event bubbling
    dropdownContainer.style.display = "inline-block";
    dropdown.style.display = "inline-block";
    button.style.display = "none";
});


    // Document click handler to close dropdown when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!wrapper.contains(e.target)) {
            dropdownContainer.style.display = "none";
            button.style.display = "flex";
        }
    });

    // When language is selected
    dropdown.addEventListener("change", function(e) {
        e.stopPropagation();
        const container = document.querySelector('.problem-statement');
        const problemText = container?.innerText || "";
        const lang = dropdown.value;

        const generated = generateInputCode(problemText, lang);
        showCodeAlert(lang, generated);
        
        // Reset UI
        dropdownContainer.style.display = "none";
        button.style.display = "flex";
        dropdown.value = "";
    });

    // Add styles
    addStyles();
}

function showCodeAlert(lang, code) {
    const alertBox = document.createElement('div');
    alertBox.className = "code-generator-alert";
    Object.assign(alertBox.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: "10000", // Higher than Codeforces elements
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "300px",
        animation: "fadeIn 0.3s ease"
    });
    
    alertBox.innerHTML = `
        <div style="font-weight: 600; font-size: 16px;">Generated ${lang} Code</div>
        <div style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 4px; font-family: monospace; white-space: pre-wrap;">${code}</div>
        <button style="align-self: flex-end; padding: 4px 8px; background: white; color: #4CAF50; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Copy</button>
    `;
    
    document.body.appendChild(alertBox);
    
    // Copy button functionality
    const copyBtn = alertBox.querySelector('button');
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(code);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            alertBox.style.animation = "fadeOut 0.3s ease";
            setTimeout(() => alertBox.remove(), 300);
        }, 1500);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        alertBox.style.animation = "fadeOut 0.3s ease";
        setTimeout(() => alertBox.remove(), 300);
    }, 5000);
}
addEventListener

function addStyles() {
    const styleId = "code-generator-styles";
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
        select:hover {
            border-color: #aaa;
        }
        select:focus {
            border-color: #4CAF50;
            box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
        }
        #input-code-generator button:hover {
            transform: translateY(-1px);
        }
    `;
    document.head.appendChild(style);
}