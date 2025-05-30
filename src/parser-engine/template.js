const template = [
    // Test cases 0 - 4 inclusive 
    {
        "label": "general_test_cases",
        "regex": /\b(?:first\s+line\s+)?(?:contains?|has|is)\s+(?:an?\s+)?(?:integer\s+)?(t(?:est\s+cases?)?|number\s+of\s+(?:test\s+cases?|inputs?|samples?))\b(?:.*?(?:\d+\s*≤\s*t\s*≤\s*\d+|\d+\s*-\s*\d+|\d+\s*to\s*\d+))?/i,
        "code": "t = int(input())\nfor _ in range(t):"
    },
    {
        "label": "simple_test_case_declaration",
        "regex": /\b(?:input\s+consists?\s+of\s+)?(t|test\s+cases?)\b(?!.*(?:per|for)\s+test\s+case)/i,
        "code": "t = int(input())\nfor _ in range(t):"
    },
    {
        "label": "constrained_test_cases",
        "regex": /\b(?:first\s+line\s+)?(?:contains?|has)\s+(?:an?\s+)?integer\s+t\s*\(\s*\d+\s*≤\s*t\s*≤\s*\d+\s*\)/i,
        "code": "t = int(input())\nfor _ in range(t):"
    },
    {
        "label": "multiline_test_cases",
        "regex": /each\s+(?:test|test\s+(?:case|input)|input\s+description|description\s+of\s+the\s+input|data\s+set)\s+(?:consists?|contains?|has|is)\s+(?:of\s+)?(?:(\d+|\w+)\s+(?:lines?|steps?|entries|values|inputs|rows|queries)|(?:multiple|several)\s+(?:sets?|lines?|inputs|entries)(?:\s+of\s+(?:input\s+data|values|queries))?)/i,
        "code": "t = int(input())\nfor _ in range(t):\n    # Process each test case"
    },

    {
        "label": "hidden_test_cases",
        "regex": /some\s+test\s+cases\s+are\s+hidden|sample\s+tests?\s+do\s+not\s+show\s+all\s+cases/i,
        "code": "t = int(input())  # May need to handle unknown number of cases"
    },

    // Single value inputs 5 - 8 inclusive
    {
        "label": "single_integer",
        "regex": /(?:one|the|an|a|single)?\s+(?:[a-z-]+\s+)*integer(?:\s+(?:number|value))?\s+([a-z][a-z0-9_]*)/i,
        "code": "$1 = int(input())"
    },
    {
        "label": "single_float",
        "regex": /(?:one|the|an|a|single)?\s+(?:float(?:ing\s+point)?|real)\s+(?:number|value)?\s+([a-z][a-z0-9_]*)/i,
        "code": "$1 = float(input())"
    },
    {
        "label": "single_number",
        "regex": /(?:the|a|an)\s*(?:number|value)\s+([a-z])/i,
        "code": "$1 = int(input())"
    },
    {
        "label": "single_string",
        "regex": /(?:a|an|the|one|single)?\s+string\s+([a-z][a-z0-9_]*)(?:\s+of\s+(?:length|size)\s+([a-z0-9_]+))?/i,
        "code": "$1 = input().strip()"
    },

    // Multiple values 9 - 12
    {
        "label": "multiple_integers",
        "regex": /\b(?:two|three|four|five|six|seven|eight|nine)(?:\s+[a-z-]+)*\s+(?:integers|numbers|values)\b[:\-,]*(?:\s*([a-z]\w*(?:\s*[,\s]\s*(?:and\s+)?[a-z]\w*)*))?|\b(?:contains?|consists(?:\s+of)?|has)\s+(?:up\s+to\s+)?(?:two|three|four|five|six|seven|eight|nine)?(?:\s+[a-z-]+)*\s*(?:integers|numbers|values)\b[:\-,]*(?:\s*([a-z]\w*(?:\s*[,\s]\s*(?:and\s+)?[a-z]\w*)*))?/i,
        "code": "$2 = map(int, input().split())"
    },
    {
        "label": "multiple_floats",
        "regex": /(\b\d+\b)?\s*(?:float|floating point numbers?|real numbers?)\s+(.*)/i,
        "code": "$2 = list(map(float, input().split()))"
    },
    {
        "label": "multiple_values",
        "regex": /(\b\d+\b)?\s*(?:numbers?|values?)\s+(.*)/i,
        "code": "$2 = list(map(int, input().split()))"
    },
    {
        "label": "multiple_strings",
        "regex": /(\b\d+\b)?\s*strings?\s+(.*)/i,
        "code": "$2 = input().split()"
    },

    // Arrays/lists 13 - 17
    {
        "label": "array_input",
        "regex": /(\w+)\s+(?:integers?|numbers?)\s+([a-z]\w*)/i,
        "code": "nums = list(map(int, input().split()))"
    },
    {
        "label": "space_separated_array",
        "regex": /(\b\w+\b)?\s*space-separated integers?\s*([a-z]*)/i,
        "code": "arr = list(map(int, input().split()))"
    },
    {
        "label": "comma_separated_array",
        "regex": /(\b\w+\b)?\s*comma-separated integers?\s*([a-z]*)/i,
        "code": "nums = list(map(int, input().split(',')))"
    },
    {
        "label": "array_of_length",
        "regex": /array\s+([a-z])\s+of\s+(?:length|size)\s+([a-z\d]+)/i,
        "code": "arr = [int(x) for x in input().split()]"
    },
    {
        "label": "array_with_constraints",
        "regex": /array\s+([a-z])\s+where\s+each\s+element\s+(?:is|lies)\s+(.*)/i,
        "code": "arr = list(map(int, input().split()))"
    },

    // Matrix/grid inputs 18 - 22
    {
        "label": "matrix_lines",
        "regex": /^(?:the\s+)?next\s+([a-zA-Z_]\w*)\s+lines?(?:\s+each(?:\s+(?:of\s+which))?)?\s+(?:contain(?:s|ing)?)(?:\s+(?:exactly\s+)?(?:\d+\s+)?)?(?:elements?|values?|numbers?|integers?|strings?|characters?)?/i,
        "code": "matrix = [input().strip() for _ in range($1)]"
    },
    {
        "label": "grid_input",
        "regex": /grid\s+of\s+size\s+(\w+)\s*x\s*(\w+)/i,
        "code": "grid = [input().strip() for _ in range($1)]"
    },
    {
        "label": "matrix_n_m",
        "regex": /(\w+)\s*x\s*(\w+)\s+matrix|table|grid/i,
        "code": "matrix = [list(map(int, input().split())) for _ in range($1)]"
    },
    {
        "label": "matrix_each_line",
        "regex": /each\s+of\s+the\s+next\s+(\w+)\s+lines\s+contains\s+(\w+)\s+(?:integers?|characters?)/i,
        "code": "matrix = [list(map(int, input().split())) for _ in range($1)]"
    },
    {
        "label": "binary_matrix",
        "regex": /each\s+of\s+the\s+next\s+(\w+)\s+lines\s+contains\s+a\s+binary\s+string\s+of\s+length\s+(\w+)/i,
        "code": "matrix = [input().strip() for _ in range($1)]"
    },

    // String inputs
    {
        "label": "binary_string",
        "regex": /binary string\s+([a-z])(?:\s+of length\s+([a-z\d]+))?/i,
        "code": "s = input().strip()"
    },
    {
        "label": "lowercase_string",
        "regex": /string\s+([a-z])\s+consisting\s+of\s+lowercase\s+(?:english\s+)?letters/i,
        "code": "$1 = input().strip()"
    },
    {
        "label": "uppercase_string",
        "regex": /string\s+([a-z])\s+consisting\s+of\s+uppercase\s+(?:english\s+)?letters/i,
        "code": "$1 = input().strip()"
    },
    {
        "label": "alphanumeric_string",
        "regex": /string\s+([a-z])\s+consisting\s+of\s+alphanumeric\s+characters/i,
        "code": "$1 = input().strip()"
    },
    {
        "label": "string_with_constraints",
        "regex": /string\s+([a-z])\s+where\s+each\s+character\s+(?:is|satisfies)\s+(.*)/i,
        "code": "$1 = input().strip()"
    },
    {
        "label": "string_length_n",
        "regex": /string\s+([a-z])\s+of\s+(?:length|size)\s+(\w+)/i,
        "code": "$1 = input().strip()"
    },

    // Special formats
    {
        "label": "lines_with_pairs",
        "regex": /(\w+)\s+lines?\s+each\s+(?:contain(?:s|ing)|having)\s+(?:a\s+pair\s+of|two)\s+(.*)/i,
        "code": "pairs = [tuple(map(int, input().split())) for _ in range($1)]"
    },
    {
        "label": "lines_with_triples",
        "regex": /(\w+)\s+lines?\s+each\s+(?:contain(?:s|ing)|having)\s+(?:a\s+triple\s+of|three)\s+(.*)/i,
        "code": "triples = [tuple(map(int, input().split())) for _ in range($1)]"
    },
    {
        "label": "permutation_input",
        "regex": /permutation\s+([a-z])\s+of\s+(?:integers?|numbers?)\s+from\s+(\d+)\s+to\s+(\d+)/i,
        "code": "$1 = list(map(int, input().split()))"
    },
    {
        "label": "tree_input",
        "regex": /(\w+)\s+lines?\s+describing\s+(?:a|the)\s+tree(?:\s+with\s+(\w+)\s+nodes)?/i,
        "code": "tree = [[] for _ in range($2+1)]\nfor _ in range($1):\n    u, v = map(int, input().split())\n    tree[u].append(v)\n    tree[v].append(u)"
    },
    {
        "label": "graph_input",
        "regex": /(\w+)\s+lines?\s+describing\s+(?:a|the)\s+graph(?:\s+with\s+(\w+)\s+nodes\s+and\s+(\w+)\s+edges)?/i,
        "code": "graph = [[] for _ in range($2+1)]\nfor _ in range($1):\n    u, v = map(int, input().split())\n    graph[u].append(v)\n    graph[v].append(u)"
    },
    {
        "label": "edge_list",
        "regex": /each\s+of\s+the\s+next\s+(\w+)\s+lines\s+contains\s+two\s+numbers?\s+describing\s+an\s+edge/i,
        "code": "edges = [tuple(map(int, input().split())) for _ in range($1)]"
    },

    // Ranges and constraints
    {
        "label": "range_inclusive",
        "regex": /(\w+)\s+and\s+(\w+)\s+are\s+between\s+(\d+)\s+and\s+(\d+)\s+inclusive/i,
        "code": "$1, $2 = map(int, input().split())"
    },
    {
        "label": "sum_constraint",
        "regex": /sum\s+of\s+(\w+)\s+over\s+all\s+test\s+cases\s+does(?:n't| not)\s+exceed\s+(\w+)/i,
        "code": ""
    },
    {
        "label": "total_sum_constraint",
        "regex": /total\s+sum\s+of\s+(\w+)\s+over\s+all\s+test\s+cases\s+(?:is\s+at\s+(?:most|least)\s+(\w+))?/i,
        "code": ""
    },

    // Special cases
    {
        "label": "queries_input",
        "regex": /(\w+)\s+queries?\s+(?:of|with)\s+(?:the\s+following\s+form|format)/i,
        "code": "queries = [input().strip() for _ in range($1)]"
    },
    {
        "label": "interactive_input",
        "regex": /this\s+is\s+an?\s+interactive\s+problem|interactive\s+input/i,
        "code": "import sys\ninput = sys.stdin.read"
    },
    {
        "label": "output_only",
        "regex": /output\s+a\s+single\s+(?:integer|number|value|string)/i,
        "code": ""
    },
    {
        "label": "no_input",
        "regex": /there\s+is\s+no\s+input|you\s+don't\s+need\s+to\s+read\s+anything/i,
        "code": ""
    },

    // Complex structures
    {
        "label": "variable_length_lines",
        "regex": /each\s+line\s+contains\s+(?:a\s+variable\s+number\s+of|one\s+or\s+more)\s+(.*)/i,
        "code": "data = []\nwhile True:\n    try:\n        data.append(list(map(int, input().split())))\n    except:\n        break"
    },
    {
        "label": "segmented_input",
        "regex": /input\s+is\s+divided\s+into\s+(\w+)\s+sections?/i,
        "code": "sections = []\nfor _ in range($1):\n    section = []\n    # Read section data\n    sections.append(section)"
    },
    {
        "label": "multisection_input",
        "regex": /for\s+each\s+(?:test\s+case|section),\s*(.*)/i,
        "code": "for _ in range(t):\n    # Process each test case/section"
    },

    // Constraints on input size
    {
        "label": "constraints_n",
        "regex": /(\d+)\s*≤\s*([a-z])\s*≤\s*(\d+)/,
        "code": "$2 = int(input())"
    },
    {
        "label": "constraints_multiple",
        "regex": /for\s+all\s+(.*),\s*(\d+)\s*≤\s*([a-z])\s*≤\s*(\d+)/,
        "code": ""
    },
    {
        "label": "small_constraints",
        "regex": /it\s+is\s+guaranteed\s+that\s+(.*)\s+is\s+small/i,
        "code": ""
    },
    {
        "label": "large_constraints",
        "regex": /(.*)\s+can\s+be\s+up\s+to\s+(\d+)/i,
        "code": ""
    },

    // Extendended Additional pattern
    // Test Cases & Mult-input variations
    {
        "label": "test_cases_with_constraints",
        "regex": /\b(t|test cases?)\s*(?:,|where)\s*(.*)\b/i,
        "code": "t = int(input())"
    },
    {
        "label": "test_cases_with_sum_limit",
        "regex": /sum of (\w+) over all test cases (does not exceed|≤) (\w+)/i,
        "code": "t = int(input())"
    },
    {
        "label": "hidden_test_cases",
        "regex": /some test cases are hidden/i,
        "code": "t = int(input())"
    },
    {
        "label": "multiple_input_formats",
        "regex": /input may consist of multiple (types|formats)/i,
        "code": "# Handle multiple input formats"
    },
    {
        "label": "variable_test_cases",
        "regex": /number of test cases (varies|is not fixed)/i,
        "code": "while True:\n    try:\n        # Process each test case\n        pass\n    except:\n        break"
    },

    // Single & Multi value inputs
    {
        "label": "single_hexadecimal",
        "regex": /(a|an) hexadecimal (number|value) (\w+)/i,
        "code": "$3 = int(input(), 16)"
    },
    {
        "label": "single_boolean",
        "regex": /(a|an) boolean (value|flag) (\w+)/i,
        "code": "$3 = input().strip().lower() == 'true'"
    },
    {
        "label": "multiple_with_different_types",
        "regex": /(\w+) (?:and|,) (\w+) (?:are|is) (integers?|strings?|floats?)/i,
        "code": "parts = input().split()\n$1 = int(parts[0]) if '$3' == 'integer' else float(parts[0]) if '$3' == 'float' else parts[0]\n$2 = int(parts[1]) if '$3' == 'integer' else float(parts[1]) if '$3' == 'float' else parts[1]"
    },
    {
        "label": "ranges_as_input",
        "regex": /(\w+) and (\w+) (?:ranging|range) from (\d+) to (\d+)/i,
        "code": "$1, $2 = map(int, input().split())"
    },

    // Arrays & Lists ( New Edge cases )
    {
        "label": "array_with_custom_separator",
        "regex": /array (\w+) with elements separated by (?:'(.+?)'|(\w+))/i,
        "code": "$1 = list(map(int, input().split($2 or $3)))"
    },
    {
        "label": "frequency_array",
        "regex": /frequency array (\w+) where (\w+)\[i\] represents/i,
        "code": "$1 = list(map(int, input().split()))"
    },
    {
        "label": "non_contiguous_array",
        "regex": /array (\w+) (?:is|can be) (?:non-contiguous|not necessarily consecutive)/i,
        "code": "$1 = list(map(int, input().split()))"
    },
    {
        "label": "circular_array",
        "regex": /(circular|ring) array (\w+)/i,
        "code": "$2 = list(map(int, input().split()))"
    },

    // Strings ( More Specific Cases)
    {
        "label": "palindromic_string",
        "regex": /string (\w+) is (?:a|given as) palindrome/i,
        "code": "$1 = input().strip()"
    },
    {
        "label": "string_with_wildcards",
        "regex": /string (\w+) (?:contains|includes) wildcard characters/i,
        "code": "$1 = input().strip()"
    },
    {
        "label": "string_with_repeats",
        "regex": /string (\w+) where each character (?:occurs|repeats) (\w+) times/i,
        "code": "$1 = input().strip()"
    },
    {
        "label": "string_with_escapes",
        "regex": /string (\w+) may contain escape sequences/i,
        "code": "$1 = input().strip()"
    },

    // Matrices & Grids ( Advanced Cases)
    {
        "label": "jagged_matrix",
        "regex": /matrix (\w+) where rows may have different lengths/i,
        "code": "$1 = []\nfor _ in range(int(input())):\n    $1.append(list(map(int, input().split())))"
    },
    {
        "label": "sparse_matrix",
        "regex": /sparse matrix (\w+) with mostly zeros/i,
        "code": "$1 = [list(map(int, input().split())) for _ in range(int(input()))]"
    },
    {
        "label": "toroidal_grid",
        "regex": /toroidal grid (\w+) (?:where edges wrap)/i,
        "code": "$1 = [list(input().strip()) for _ in range(int(input()))]"
    },
    {
        "label": "grid_with_obstacles",
        "regex": /grid (\w+) where some cells are (blocked|obstacles)/i,
        "code": "$1 = [list(input().strip()) for _ in range(int(input()))]"
    },
    // Graphs & Trees ( Less Common Patterns)
    {
        "label": "weighted_tree",
        "regex": /tree (\w+) with (?:weighted|labelled) edges/i,
        "code": "tree = [[] for _ in range(int(input())+1)]\nfor _ in range(int(input())):\n    u, v, w = map(int, input().split())\n    tree[u].append((v, w))\n    tree[v].append((u, w))"
    },
    {
        "label": "implicit_graph",
        "regex": /graph (\w+) is (?:not|implicitly) given as edge list/i,
        "code": "# Graph must be constructed from other input"
    },
    {
        "label": "bipartite_graph",
        "regex": /graph (\w+) is (?:guaranteed|known) to be bipartite/i,
        "code": "graph = [[] for _ in range(int(input())+1)]\nfor _ in range(int(input())):\n    u, v = map(int, input().split())\n    graph[u].append(v)\n    graph[v].append(u)"
    },
    {
        "label": "functional_graph",
        "regex": /functional graph (\w+) where each node has out-degree 1/i,
        "code": "n = int(input())\n$1 = [0]*(n+1)\nfor i in range(1, n+1):\n    $1[i] = int(input())"
    },


    // Meta input Patterns ( Rare But Possible )
];


const matrixTemplates = [
    // ===== BASIC n×m INTEGER MATRIX =====
    {
      label: "basic_nxm_integer_matrix",
      regex: /^(?:the\s+)?(?:next|following)\s+(\w+)\s+lines?(?:\s+each)?(?:\s+(?:contain(?:s|ing)?|consists?\s+of|has|have)?(?:\s+(?:exactly\s+)?(\w+)\s+(?:space[-\s]?separated\s+)?(?:integers?|numbers?|elements?|values?))?)?.*$/gmi,
      code: (match) => {
        const linesVar = match[1];
        return `matrix = [list(map(int, input().split())) for _ in range(${linesVar})]`;
      }
    },
  
    // ===== SQUARE n×n MATRIX =====
    {
      label: "square_nxn_matrix",
      regex: /^(?:given\s+an?|you\s+are\s+given\s+an?|read\s+an?)\s+(\w+)\s*×\s*\1\s+(?:matrix|grid)|^(?:the\s+)?next\s+(\w+)\s+lines?(?:\s+each)?\s+contain(?:s|ing)?\s+\2\s+(?:integers?|numbers?).*$/gmi,
      code: (match) => {
        const size = match[1] || match[2];
        return `matrix = [list(map(int, input().split())) for _ in range(${size})]`;
      }
    },
  
    // ===== CHARACTER/STRING MATRIX =====
    {
      label: "character_matrix",
      regex: /^(?:each\s+of\s+the\s+)?(?:next|following)\s+(\w+)\s+lines?(?:\s+each)?\s+(?:contain(?:s|ing)?|consists?\s+of|has|have)\s+(?:a\s+)?(?:string|row|line)(?:\s+of\s+length\s+(\w+))?.*$/gmi,
      code: (match) => {
        const linesVar = match[1];
        const length = match[2] ? `.strip()[:${match[2]}]` : ".strip()";
        return `grid = [input()${length} for _ in range(${linesVar})]`;
      }
    },
  
    // ===== BINARY MATRIX =====
    {
      label: "binary_matrix",
      regex: /^(?:a\s+|the\s+)?(?:binary\s+)?(?:matrix|grid)(?:\s+of\s+size\s+(\w+)\s*×\s*(\w+))?.*?(?:[01#.'"])/gmi,
      code: (match) => {
        const rows = match[1] || "N";
        return `binary_grid = [list(input().strip()) for _ in range(${rows})]`;
      }
    },
  
    // ===== JAGGED/VARIABLE-LENGTH MATRIX =====
    {
      label: "jagged_matrix",
      regex: /^(?:the\s+)?i-?th\s+(?:of\s+the\s+)?(?:next|following)\s+(\w+)\s+lines?\s+(?:contain(?:s|ing)?|has)\s+(\w+)\s+(?:integers?|elements?).*$/gmi,
      code: (match) => {
        const linesVar = match[1];
        return `jagged = [list(map(int, input().split())) for _ in range(${linesVar})]`;
      }
    },
  
    // ===== MATRIX WITH METADATA =====
    {
      label: "matrix_with_metadata",
      regex: /^(?:first\s+line\s*:\s*)?(\w+)\s+(\w+)(?:\s+(\w+))?(?:\s*[,;]?\s*|\s+)(?:next\s+(\w+)\s+lines?.*)?$/gmi,
      code: (match) => {
        const vars = [match[1], match[2], match[3]].filter(Boolean);
        const linesVar = match[4] || vars[0];
        return `${vars.join(', ')} = map(int, input().split())\nmatrix = [list(map(int, input().split())) for _ in range(${linesVar})]`;
      }
    },
  
    // ===== GRAPH/ADJACENCY MATRIX =====
    {
      label: "graph_adjacency_matrix",
      regex: /^(?:an?\s+)?(?:adjacency\s+)?matrix\s+(?:of\s+size\s+)?(\w+)\s*×\s*(\w+)?(?:\s+for\s+(?:the\s+)?(?:graph|network))?/gmi,
      code: (match) => {
        const size = match[1] || "N";
        return `adj_matrix = [list(map(int, input().split())) for _ in range(${size})]`;
      }
    },
  
    // ===== SPECIAL MATRIX TYPES =====
    {
      label: "special_matrix_types",
      regex: /^(?:a\s+|the\s+)?(symmetric|triangular|diagonal|toeplitz|sparse|identity)\s+(?:matrix|grid)(?:\s+of\s+size\s+(\w+)\s*×\s*(\w+))?/gmi,
      code: (match) => {
        const type = match[1];
        const size = match[2] || "N";
        return `${type}_matrix = [list(map(int, input().split())) for _ in range(${size})]`;
      }
    },
  
    // ===== CUSTOM DELIMITER MATRIX =====
    {
      label: "custom_delimiter_matrix",
      regex: /^(?:matrix|grid)\s+(?:is|values?)\s+(?:separated|delimited)\s+by\s+['"`]?([^'"`\s]+)['"`]?/gmi,
      code: (match) => {
        const delimiter = match[1] === 'space' ? ' ' : match[1];
        return `matrix = [list(map(int, input().split('${delimiter}'))) for _ in range(N)]`;
      }
    },
  
    // ===== FALLBACK CATCH-ALL MATRIX =====
    {
      label: "fallback_matrix",
      regex: /(?:matrix|grid|2D\s+array)(?:\s+of\s+(?:size\s+)?(\w+)\s*×\s*(\w+))?(?:\s+with\s+.*)?/gmi,
      code: (match) => {
        const rows = match[1] || "N";
        return `matrix = [list(map(int, input().split())) for _ in range(${rows})]`;
      }
    }
  ];
  

const optional_template = [
    {
        "label": "flush_required",
        "regex": /you must flush (?:output|after each query)/i,
        "code": "import sys\nprint('output', flush=True)"
    },
    {
        "label": "online_queries",
        "regex": /process queries (?:online|in the given order)/i,
        "code": "q = int(input())\nfor _ in range(q):\n    query = input().strip()"
    },
    {
        "label": "adaptive_judge",
        "regex": /interactive problem with adaptive (?:judge|testing)/i,
        "code": "import sys\ninput = sys.stdin.read"
    },
    {
        "label": "partial_feedback",
        "regex": /you will receive partial feedback/i,
        "code": "# Handle feedback from judge"
    },
    {
        "label": "self_referential_input",
        "regex": /input contains its own description/i,
        "code": "# Handle self-referential input"
    },
    {
        "label": "compressed_input",
        "regex": /input is given in compressed form/i,
        "code": "# Handle compressed input"
    },
    {
        "label": "recursive_input",
        "regex": /input is defined recursively/i,
        "code": "# Handle recursive input structure"
    },
    {
        "label": "input_with_comments",
        "regex": /input may contain (comments|annotation)/i,
        "code": "# Filter out comments from input"
    },
    {
        "label": "binary_operations",
        "regex": /(?:binary\s+)?operation\s+([a-zA-Z]+)\s+between\s+(\w+)\s+and\s+(\w+)/i,
        "code": "$2 = int(input())\n$3 = int(input())"
    },
    {
        "label": "optional_list",
        "regex": /optional\s+(?:list|array)\s+of\s+(\w+)\s+(?:integers?|values?)/i,
        "code": "try:\n    lst = list(map(int, input().split()))\nexcept:\n    lst = []"
    },

    // Multiple outputs
    {
        "label": "multiple_outputs",
        "regex": /output\s+(?:[a-z\s]+|\d+\s+values?\s+or\s+integers?)/i,
        "code": "# Prepare multiple outputs"
    },

    // Non-standard delimiters (e.g., pipe-separated)
    {
        "label": "pipe_separated_array",
        "regex": /(\b\w+\b)?\s*pipe-separated\s*integers?\s*([a-z]*)/i,
        "code": "$2 = list(map(int, input().split('|')))"
    },
    // Date/Time input
    {
        "label": "datetime_input",
        "regex": /(?:date|time)\s+([a-zA-Z]+(?:\s+[a-zAZ]+)*)\s+in\s+format\s+([a-zA-Z0-9\-:\/]+)/i,
        "code": "from datetime import datetime\n$1 = datetime.strptime(input().strip(), '$2')"
    },

    // Boolean inputs
    {
        "label": "boolean_input",
        "regex": /boolean\s+value\s+(true|false)/i,
        "code": "flag = input().strip().lower() == 'true'"
    },
]


export default template