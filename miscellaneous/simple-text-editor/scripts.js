const editor = document.getElementById("editorArea");
const title = document.getElementById("titleArea");
const download = document.getElementById("downloadBtn");

function handleKeyDown(event) {
  if (event.key === "Tab") insertOverride("    ", 4, 4, event, editor);
  else if (event.key === "{") insertOverride("{}", 1, 1, event, editor);
  else if (event.key === "(") insertOverride("()", 1, 1, event, editor);
  else if (event.key === ")") skipOverride(")", event, editor);
  else if (event.key === "[") insertOverride("[]", 1, 1, event, editor);
  else if (event.key === "]") skipOverride("]", event, editor);
  else if (event.key === '"') insertOverride('""', 1, 1, event, editor);
  checkSaveFile(event);
}

editor.addEventListener("keydown", handleKeyDown);
title.addEventListener("keydown", handleKeyDown);

function insertOverride(text, start, end, event, editor) {
  event.preventDefault();

  const cursorPosition = editor.selectionStart;
  const textBeforeCursor = editor.value.substring(0, cursorPosition);
  const textAfterCursor = editor.value.substring(cursorPosition);
  editor.value = textBeforeCursor + text + textAfterCursor;

  editor.selectionStart = cursorPosition + start;
  editor.selectionEnd = cursorPosition + end;
}

function skipOverride(skip, event, editor) {
  const cursorPosition = editor.selectionStart;
  const textAfterCursor = editor.value.substring(
    cursorPosition,
    cursorPosition + 1
  );

  if (textAfterCursor == skip) {
    event.preventDefault();
    editor.selectionStart = cursorPosition + 1;
    editor.selectionEnd = cursorPosition + 1;
  }
}

function downloadFile() {
  const file = document.getElementById("titleArea").value;
  const text = document.getElementById("editorArea").value;

  if (file == "") {
    window.alert("The file name can't be an empty string!");
  } else if (text == "") {
    window.alert("The file content can't be an empty string!");
  } else {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
}
