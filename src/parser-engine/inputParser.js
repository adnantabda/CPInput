import template from "./template.js";

export default function parseStatementsToCode(lines) {
    const code = [];
    let insideTestCase = false;
    let count = 0

    for (const line of lines) {
        count += 1

        if (!line.trim()) continue;

        // Check general_test_cases
        if (count === 1){
            if (line.includes("testcases") || line.includes("testcase")){
                code.push(template[0].code);
                insideTestCase = true;
                continue;

            }
        let match = line.match(template[0].regex);
        if (match) {
            code.push(template[0].code);
            insideTestCase = true;
            continue;
        }

        // Check simple_test_case_declaration
        match = line.match(template[1].regex);
        if (match) {
            code.push(template[1].code);
            insideTestCase = true;
            continue;
        }

        // Check constrained_test_cases
        match = line.match(template[2].regex);
        if (match) {
            code.push(template[2].code);
            insideTestCase = true;
            continue;
        }

        // Check multiline_test_cases
        match = line.match(template[3].regex);
        if (match) {
            code.push(template[3].code);
            insideTestCase = true;
            continue;
        }

        // Check hidden_test_cases
        match = line.match(template[4].regex);
        if (match) {
            code.push(template[4].code);
            continue;
        }
      }

        // Check single_integer
        match = line.match(template[5].regex);
        if (match) {
            const codeLine = template[5].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check single_float
        match = line.match(template[6].regex);
        if (match) {
            const codeLine = template[6].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }
  
        // Check single_number
        match = line.match(template[7].regex);
        if (match) {
            const codeLine = template[7].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check single_string
        match = line.match(template[8].regex);
        if (match) {
            const codeLine = template[8].code.replace('$1', match[1]);
            if (match[2]) {
                codeLine = codeLine.replace('$2', match[2]);
            }
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check multiple_integers
        match = line.match(template[9].regex);
        if (match) {
            let codeLine;
            // console.log(vars)
            if (line.includes("two")) {
                codeLine = `a , b = map(int, input().split())`;
            } else if (line.includes("three")) {
                codeLine = `a, b , c = map(int, input().split())`;
            } else if (line.includes("four"))  {
                codeLine = `a , b , c , d = map(int, input().split())`;
            } else {
                // For more than 4 variables, use a list
                console.log("matched this line")
                codeLine = `vals = list(map(int, input().split()))`;
            }
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }
          

        match = line.match(template[10].regex);
        if (match) {
            const vars = match[2].split(/\s*,\s*|\s+and\s+/);
            let codeLine;
            if (vars.length === 2) {
                codeLine = `x, y = map(float, input().split())`;
            } else if (vars.length === 3) {
                codeLine = `x , y , z = map(float, input().split())`;
            } else if (vars.length === 4) {
                codeLine = `x , y , z , q = map(float, input().split())`;
            } else {
                codeLine = `vals = list(map(float, input().split()))`;
            }
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check multiple_values
        match = line.match(template[11].regex);
        if (match) {
            const vars = match[2].split(/\s*,\s*|\s+and\s+/);
            let codeLine;
            if (vars.length === 2) {
                codeLine = `a , b = map(int, input().split())`;
            } else if (vars.length === 3) {
                codeLine = `a , b , c = map(int, input().split())`;
            } else if (vars.length === 4) {
                codeLine = `a , b, c, d = map(int, input().split())`;
            } else {
                codeLine = `vals = list(map(int, input().split()))`;
            }
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check multiple_strings
        match = line.match(template[12].regex);
        if (match) {
            const vars = match[2].split(/\s*,\s*|\s+and\s+/);
            let codeLine;
            if (vars.length === 2) {
                codeLine = `s1 , s2 = input().split()`;
            } else if (vars.length === 3) {
                codeLine = `s1 , s2 , s3 = input().split()`;
            } else if (vars.length === 4) {
                codeLine = `s1 , s2 , s2 , s4  = input().split()`;
            } else {
                codeLine = `strings = list(map(str, input().split())`;
            }
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check array_input
        match = line.match(template[13].regex);
        if (match) {
            const codeLine = template[13].code;
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check space_separated_array
        match = line.match(template[14].regex);
        if (match) {
            const codeLine = template[14].code;
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check comma_separated_array
        match = line.match(template[15].regex);
        if (match) {
            const codeLine = template[15].code;
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check array_of_length
        match = line.match(template[16].regex);
        if (match) {
            const codeLine = template[16].code;
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check array_with_constraints
        match = line.match(template[17].regex);
        if (match) {
            const codeLine = template[17].code;
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check matrix_lines
        match = line.match(template[18].regex);
        if (match) {
            const codeLine = template[18].code;
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check grid_input
        match = line.match(template[19].regex);
        if (match) {
            const codeLine = template[19].code;
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check matrix_n_m
        match = line.match(template[20].regex);
        if (match) {
            const codeLine = template[20].code;
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check matrix_each_line
        match = line.match(template[21].regex);
        if (match) {
            const codeLine = template[21].code;
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check binary_matrix
        match = line.match(template[22].regex);
        if (match) {
            const codeLine = template[22].code;
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check binary_string
        match = line.match(template[23].regex);
        if (match) {
            let codeLine = template[23].code;
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check lowercase_string
        match = line.match(template[24].regex);
        if (match) {
            const codeLine = template[24].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check uppercase_string
        match = line.match(template[25].regex);
        if (match) {
            const codeLine = template[25].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check alphanumeric_string
        match = line.match(template[26].regex);
        if (match) {
            const codeLine = template[26].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check string_with_constraints
        match = line.match(template[27].regex);
        if (match) {
            const codeLine = template[27].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check string_length_n
        match = line.match(template[28].regex);
        if (match) {
            const codeLine = template[28].code.replace('$1', match[1]).replace('$2', match[2]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check lines_with_pairs
        match = line.match(template[29].regex);
        if (match) {
            const codeLine = template[29].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check lines_with_triples
        match = line.match(template[30].regex);
        if (match) {
            const codeLine = template[30].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check permutation_input
        match = line.match(template[31].regex);
        if (match) {
            const codeLine = template[31].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check tree_input
        match = line.match(template[32].regex);
        if (match) {
            let codeLine = template[32].code.replace('$1', match[1]);
            if (match[2]) {
                codeLine = codeLine.replace('$2', match[2]);
            }
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check graph_input
        match = line.match(template[33].regex);
        if (match) {
            let codeLine = template[33].code;
            if (match[2] && match[3]) {
                codeLine = codeLine.replace('$2', match[2]).replace('$3', match[3]);
            }
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check edge_list
        match = line.match(template[34].regex);
        if (match) {
            const codeLine = template[34].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check range_inclusive
        match = line.match(template[35].regex);
        if (match) {
            const codeLine = template[35].code.replace('$1', match[1]).replace('$2', match[2]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check sum_constraint (no code to add)
        match = line.match(template[36].regex);
        if (match) {
            continue;
        }

        // Check total_sum_constraint (no code to add)
        match = line.match(template[37].regex);
        if (match) {
            continue;
        }

        // Check queries_input
        match = line.match(template[38].regex);
        if (match) {
            const codeLine = template[38].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check interactive_input
        match = line.match(template[39].regex);
        if (match) {
            code.push(template[39].code);
            continue;
        }

        // Check output_only (no code to add)
        match = line.match(template[40].regex);
        if (match) {
            continue;
        }

        // Check no_input (no code to add)
        match = line.match(template[41].regex);
        if (match) {
            continue;
        }

        // Check variable_length_lines
        match = line.match(template[42].regex);
        if (match) {
            code.push(template[42].code);
            continue;
        }

        // Check segmented_input
        match = line.match(template[43].regex);
        if (match) {
            const codeLine = template[43].code.replace('$1', match[1]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check multisection_input
        match = line.match(template[44].regex);
        if (match) {
            code.push(template[44].code);
            continue;
        }

        // Check constraints_n
        match = line.match(template[45].regex);
        if (match) {
            const codeLine = template[45].code.replace('$2', match[2]);
            code.push(insideTestCase ? '    ' + codeLine : codeLine);
            continue;
        }

        // Check constraints_multiple (no code to add)
        match = line.match(template[46].regex);
        if (match) {
            continue;
        }

        // Check small_constraints (no code to add)
        match = line.match(template[47].regex);
        if (match) {
            continue;
        }

        // Check large_constraints (no code to add)
        match = line.match(template[48].regex);
        if (match) {
            continue;
        }

        // Continue this pattern for all remaining templates...
        // (The actual implementation would include all 102 templates)

        // If no patterns matched, add as comment
        // code.push((insideTestCase ? '    ' : '') + `# ${line}`);
    }

    if (code.length === 0) {
        code.push("# Unable to determine input pattern - check the statement manually.");
    }

    return code.join('\n');
}