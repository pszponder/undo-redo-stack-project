// ====================
// STACK DATA STRUCTURE
// ====================
class Stack {
  constructor() {
    this.data = [];
    this.last = 0;
  }

  // push
  push(value) {
    this.data[this.last] = value;
    this.last++;
    return this;
  }

  // pop
  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }

    this.last--;
    return this.data.splice(this.last, 1)[0];
  }

  // length
  length() {
    return this.data.length;
  }

  // isEmpty
  isEmpty() {
    let empty = false;
    if (this.data.length === 0) {
      empty = true;
    }
    return empty;
  }

  // Print function
  print() {
    console.log(this.data);
  }
}

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

// Define function to update stack
// function updateStack(stack, method) {
//   stack.method();
// }

// =========
// TEXT AREA
// =========

// Select Text Area DOM Element
const inputArea = document.querySelector("#editor");

// Create an event handler to push every keystroke entered into the text area to the undo stack
function handleText(event) {
  const char = event.key;

  // TODO: Incorporate backspace into functionality
  // Disable backspace Default
  if (char === "Backspace") {
    event.preventDefault();
    return;
  }

  // Push char into the undo stack
  undo.push(char);

  // Create a new paragraph element with lastChar
  const newElement = createNewElement(char);

  // Add the new element to the Undo DOM Element
  domUndo.insertAdjacentElement("afterbegin", newElement);
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

/*
TODO:
- Prevent variables other than letters and spaces being entered into text area
- Incorporate backspace functionality int app in the text area
  - How will backspace interact with undo/redo?

COMPLETE:
- every time the user enters text into the text area,
the corresponding character is pushed into the undo stack
- When the undo button is pressed,
  - The last item off of the undo stack is pushed onto the redo stack
  - The last item in the text area is also removed
- When the redo button is pressed
  - The last item on the redo stack is popped off and pushed onto the undo stack
  - the item popped off is appended to the text in the text area
*/
