# HackBar Mod Chrome Extension

HackBar Mod Chrome Extension is a Chrome DevTools extension for SQLi payloads, URL encoding, WAF testing helpers, shell/file SQL helpers, and privilege enumeration in authorized labs and CTF environments.

> This project is intended for legal security testing, CTF labs, training environments, and authorized penetration testing only.

---

## Features

- Chrome DevTools panel named **HackBar**
- SQLi payload menu
- URL encode/decode tools
- Base64 encode/decode tools
- HEX encode/decode tools
- WAF testing helper payloads
- Shell/file SQL helper payloads
- Privilege enumeration helper payloads
- Payload editor with Execute, Load URL, and Clear buttons

---

## Installation

1. Download or clone this repository.
2. Open Chrome.
3. Go to:

```text
chrome://extensions/
````

4. Enable:

```text
Developer mode
```

5. Click:

```text
Load unpacked
```

6. Select the extension folder.
7. Open Chrome DevTools.
8. Click the new panel:

```text
HackBar
```

---

## Project Structure

```text
.
├── manifest.json
├── devtools.html
├── devtools.js
├── panel.html
├── panel.js
└── style.css
```

---

## File Description

### manifest.json

Chrome extension manifest file.

### devtools.html

Loads the DevTools script.

### devtools.js

Creates the custom Chrome DevTools panel.

### panel.html

Contains the panel interface, menus, buttons, and payload textarea.

### panel.js

Contains payload insertion logic, dynamic prompt builders, encoding/decoding tools, and DevTools execution behavior.

### style.css

Controls the layout and visual style of the panel.

---

## Usage Notes

This tool does not automatically test or exploit targets.

It only helps organize and insert common payloads into a DevTools-based workspace.

Use it only on:

* Your own applications
* CTF labs
* Training platforms
* Authorized bug bounty programs
* Authorized penetration testing engagements

---

## Disclaimer

This project is provided for educational and authorized security testing purposes only.

The developer is not responsible for any misuse or unauthorized activity performed with this tool.

Always get proper permission before testing any system.

```
```
