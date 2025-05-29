<p align="center">
  <img src="public/icons/icon128.png" width="128" alt="CPInput Logo">
  <h1 align="center">CPInput - Competitive Programming Input Generator</h1>
  <p align="center">
    <strong>Automate input parsing for competitive programming problems</strong>
  </p>
</p>
# CPInput - Smart Input Parser for Competitive Programming
Convert problem statements into clean input parsing code instantly with AI-powered precision or fast regex templates.

[![GitHub Stars](https://img.shields.io/github/stars/adnantahir/smartinputparser?style=for-the-badge&logo=github&color=00B89C)](https://github.com/adnantahir/smartinputparser)
[![License](https://img.shields.io/badge/license-MIT-00B89C?style=for-the-badge)](LICENSE)

## 🌟 Features

- **Dual Parsing Engine**: Choose between ultra-fast regex templates or high-accuracy Gemini AI
- **Multi-language Support**: Generate input code for Python, C++, Java, and more
- **Privacy Focused**: Works offline with regex; API calls go directly to Google
- **Competitive Programming Optimized**: Generates efficient parsing code
- **Extensible**: Easily add new regex patterns or customize AI prompts

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/adnantabda/cpinput.git
cd cpinput
npm install
npm run build
```

***Don't Forget to add Your own API KEY***


### Load the Extension
1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist` folder

## 🛠️ Usage

### Basic Usage
1. Navigate to any competitive programming problem
2. Click Generate Input code


## 📊 Performance Comparison

| Feature          | Regex Parser        | Gemini AI           |
|------------------|---------------------|---------------------|
| Accuracy         | 65% (common cases)  | 95%+ cases          |
| Speed            | Instant             | 1-10 seconds        |
| Offline Support  | ✅ Yes              | ❌ Requires API     |
| Best For         | Standard inputs     | Complex problems    |

## 🔧 Configuration

### Extending Regex Templates
Add your own patterns to `src/templates.js`:

```javascript
{
  regex: /contains (\d+) floats? (.*)/i,
  code: '$1_floats = list(map(float, input().split())) // $2'
}
```

### Customizing AI Prompts
Modify the system instruction for different behaviors:

```javascript
const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: `Convert this ${lines} to ${lang} code`,
  config: {
    systemInstruction: `You are an expert at generating input parsing code.
      Return only pure code without comments or explanations.
      Use efficient methods suitable for competitive programming.`,
    temperature: 0.1,
    topP: 0.95,
    maxOutputTokens: 512,
  },
});
```

## 📚 Examples

### Standard Input
**Problem Statement**:
```
The first line contains integer T
Each of the next T lines contains two integers
```

**Generated Python**:
```python
T = int(input())
for _ in range(T):
    a, b = map(int, input().split())
```

### Matrix Input
**Problem Statement**:
```
First line contains R and C
Next R lines contain C space-separated integers
```

**Generated Python**:
```python
R, C = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(R)]
```

## 🤝 Contributing

We welcome contributions! Please see our [Contribution Guidelines](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
[https://github.com/adnantabda/cpinput](https://github.com/adnantabda/cpinput)