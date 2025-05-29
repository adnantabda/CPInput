import template from "./template.js";

/**
 * Parses an array of natural language problem statements into Python input code.
 * @param {string[]} lines - Array of cleaned statement lines.
 * @returns {string[]} - Array of generated Python code lines.
 */
export default function parseStatementsToCode(lines) {
    const code = [];
    let insideTestCase = false;
    let lineNumber = 0;

    // Core handler for matching templates and generating code
    function tryMatchAndPush(line, templates, transformCode = (code) => code) {
        for (const tmpl of templates) {
            const match = line.match(tmpl.regex);
            if (match) {
                console.log(tmpl)
                let generatedCode = tmpl.code;
                if (typeof transformCode === 'function') {
                    generatedCode = transformCode(generatedCode, match);
                }
                code.push(insideTestCase ? '    ' + generatedCode : generatedCode);
                return true;
            }
        }
        return false;
    }

    // Special handler for known patterns requiring dynamic handling
    function handleDynamicMultipleNumbers(line) {
        if (line.includes("two")) return `a, b = map(int, input().split())`;
        if (line.includes("three")) return `a, b, c = map(int, input().split())`;
        if (line.includes("four")) return `a, b, c, d = map(int, input().split())`;
        return `vals = list(map(int, input().split()))`;
    }

    function handleDynamicMultipleFloats(vars) {
        if (vars.length === 2) return `x, y = map(float, input().split())`;
        if (vars.length === 3) return `x, y, z = map(float, input().split())`;
        if (vars.length === 4) return `x, y, z, q = map(float, input().split())`;
        return `vals = list(map(float, input().split()))`;
    }

    function handleDynamicMultipleStrings(vars) {
        if (vars.length === 2) return `s1, s2 = input().split()`;
        if (vars.length === 3) return `s1, s2, s3 = input().split()`;
        if (vars.length === 4) return `s1, s2, s3, s4 = input().split()`;
        return `strings = list(map(str, input().split()))`;
    }

    // Main loop
    for (const line of lines) {
        lineNumber++;
        if (!line.trim()) continue;

        // Test case logic detection (only on first line)
        if (lineNumber === 1) {
            if (line.includes("testcases") || line.includes("testcase")) {
                code.push(template[0].code);
                insideTestCase = true;
                continue;
            }
            if (tryMatchAndPush(line, [template[0], template[1], template[2], template[3]])) {
                insideTestCase = true;
                continue;
            }
            if (tryMatchAndPush(line, [template[4]])) continue;
        }

        if (line.includes("It is guaranteed")){
            break
        }

        // --- Groups by type ---
        if (tryMatchAndPush(line,
            [template[5], template[6]],
            (codeLine, match) => {
                let variableName = match[1] || 'n';
                const uniqueChars = new Set(variableName)

                // Handling Duplicate variable name like For Example ttt 
                if (uniqueChars.size === 1) {
                    variableName = variableName[0];
                } else {
                    variableName = 'n';
                }
                
                return codeLine.replace('$1', variableName);
            })) continue;


            if (tryMatchAndPush(line, [template[8]], 
                (codeLine, match) => {
                    let variableName = match[1] ? match[1].trim() : 's';
            
                    const uniqueChars = new Set(variableName);
            
                    if (uniqueChars.size === 1) {
                        variableName = variableName[0];
                    } else {
                        variableName = 's';
                    }
            
                    codeLine = codeLine.replace('$1', variableName);
                    return codeLine;
                }
            )) continue;
            
            



        if (line.match(template[9].regex)) {
            code.push(insideTestCase ? '    ' + handleDynamicMultipleNumbers(line) : handleDynamicMultipleNumbers(line));
            continue;
        }

        if (line.match(template[10].regex)) {
            const vars = line.match(template[10].regex)[2].split(/\s*,\s*|\s+and\s+/);
            code.push(insideTestCase ? '    ' + handleDynamicMultipleFloats(vars) : handleDynamicMultipleFloats(vars));
            continue;
        }

        if (line.match(template[11].regex)) {
            const vars = line.match(template[11].regex)[2].split(/\s*,\s*|\s+and\s+/);
            code.push(insideTestCase ? '    ' + handleDynamicMultipleNumbers(vars) : handleDynamicMultipleNumbers(vars));
            continue;
        }

        if (line.match(template[12].regex)) {
            const vars = line.match(template[12].regex)[2].split(/\s*,\s*|\s+and\s+/);
            code.push(insideTestCase ? '    ' + handleDynamicMultipleStrings(vars) : handleDynamicMultipleStrings(vars));
            continue;
        }

        // --- 2D ( Matrix or Grid  Match templates ---
        if (tryMatchAndPush(line, template.slice(13, 35),
                (codeLine, match) => {
                let variableName = match[1] || 'n';
                const uniqueChars = new Set(variableName)
                
                // Handling Duplicate variable name like For Example ttt 
                if (uniqueChars.size === 1) {
                    variableName = variableName[0];
                } else {
                    variableName = 'n';
                }
                
                return codeLine.replace('$1', variableName);
            })) continue;
            
        if (tryMatchAndPush(line, template.slice(35))) continue;
    }

    return code;
}
