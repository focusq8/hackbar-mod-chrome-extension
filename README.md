# hackbar-mod-chrome-extension

HackBar Mod Chrome extension is a Chrome DevTools extension for SQLi payloads, URL encoding, WAF testing helpers, shell/file SQL helpers, and privilege enumeration in authorized labs and CTF environments.

Installation
Download or clone this repository.
Open Chrome.
Go to:
chrome://extensions/
Enable:
Developer mode
Click:
Load unpacked
Select the extension folder.
Open DevTools.
Click the new panel:
HackBar
Project Structure
.
├── manifest.json
├── devtools.html
├── devtools.js
├── panel.html
├── panel.js
└── style.css
manifest.json

Chrome extension manifest file.

devtools.html

Loads the DevTools script.

devtools.js

Creates the custom DevTools panel.

panel.html

Contains the panel interface, menus, buttons, and payload textarea.

panel.js

Contains payload insertion logic, dynamic prompt builders, encoding/decoding tools, and DevTools execution behavior.

style.css

Controls the layout and visual style of the panel.

Usage Notes

This tool does not automatically test or exploit targets.
It only helps organize and insert common payloads into a DevTools-based workspace.

Use it only on:

Your own applications
CTF labs
Training platforms
Authorized bug bounty programs
Authorized penetration testing engagements
Disclaimer

This project is provided for educational and authorized security testing purposes only.
The developer is not responsible for any misuse or unauthorized activity performed with this tool.

Always get proper permission before testing any system.


> This project is intended for legal security testing, CTF labs, training environments, and authorized penetration testing only.
