// ====================
// STACK DATA STRUCTURE
// ====================

import { Stack } from "./Stack.js";

// ======
// STACKS
// ======

// Select the Stack DOM Elements
const domUndo = document.querySelector(".stacks__undo .stacks__stack");
const domRedo = document.querySelector(".stacks__redo .stacks__stack");

// Initialize the Undo and Redo Stack Data Structures
const undo = new Stack();
const redo = new Stack();

// Define function to create and return a
// new paragraph DOM element with a specified value
function createNewElement(value) {
  // Create a new paragraph element
  const newElement = document.createElement("p");

  // Add value as text of new element
  newElement.innerText = `${value}`;

  // Add .stacks__content class to newElement
  newElement.classList.add("stacks__content");

  return newElement;
}

// =========
// TEXT AREA
// =========

// Select Text Area DOM Element
const inputArea = document.querySelector("#editor");

// Create an event handler to push every keystroke entered into the text area to the undo stack
function handleText(event) {
  const char = event.key;
  const charCode = event.keyCode;

  // check if key pressed is a letter, a number, or space
  if (
    (charCode >= 65 && charCode <= 90) ||
    (charCode >= 48 && charCode <= 57) ||
    charCode === 32
  ) {
    // Push char into the undo stack
    undo.push(char);

    // Create a new paragraph element with lastChar
    const newElement = createNewElement(char);

    // Add the new element to the Undo DOM Element
    domUndo.insertAdjacentElement("afterbegin", newElement);
  } else if (charCode === 8) {
    event.preventDefault();
    handleBtnUndo();
  }
  // Prevent action from occurring otherwise
  else {
    event.preventDefault();
    return;
  }
}

inputArea.addEventListener("keydown", handleText);

// =======
// BUTTONS
// =======

// Select Button DOM Elements
const btnUndo = document.querySelector(".buttons__undo");
const btnRedo = document.querySelector(".buttons__redo");
const btnReset = document.querySelector(".buttons__reset");

// Create Event Handlers for the Buttons
function handleBtnUndo() {
  // Pop off element from the undo stack
  const lastChar = undo.pop();

  // If the undo stack is empty, don't do anything
  if (lastChar === "Underflow") {
    return;
  }
  // Otherwise, add lastChar to redo stack and remove from text area
  else {
    redo.push(lastChar);

    // Remove 1st child element from the undo stack DOM element
    const firstChild = domUndo.firstElementChild;
    domUndo.removeChild(firstChild);

    // Update the value in the text area
    inputArea.value = undo.data.join("").toString();

    // Create a new paragraph element with lastChar
    const newElement = createNewElement(lastChar);

    // Add the new element to the Redo DOM Element
    domRedo.insertAdjacentElement("afterbegin", newElement);
  }
}

function handleBtnRedo() {
  // Pop off element from the redo stack
  const lastChar = redo.pop();

  // If the undo stack is empty, don't do anything
  if (lastChar === "Underflow") {
    return;
  }
  // Otherwise, add lastChar to undo stack and add it to text area
  else {
    undo.push(lastChar);

    // Remove 1st child element from the redo stack DOM element
    const firstChild = domRedo.firstElementChild;
    domRedo.removeChild(firstChild);

    // Update the value in the text area
    inputArea.value = undo.data.join("").toString();

    // Create a new paragraph element with lastChar
    const newElement = createNewElement(lastChar);

    // Add the new element to the Undo DOM Element
    domUndo.insertAdjacentElement("afterbegin", newElement);
  }
}

// Add event handler for reset
function handleReset() {
  window.location.reload(true);
}

// Add Event Listeners to the Buttons
btnUndo.addEventListener("click", handleBtnUndo);
btnRedo.addEventListener("click", handleBtnRedo);
btnReset.addEventListener("click", handleReset);
