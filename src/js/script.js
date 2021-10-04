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

  // Push char into the undo stack
  undo.push(char);

  // Create a new paragraph element with lastChar
  const newElement = createNewElement(lastChar);

  // Add the new element to the Undo DOM Element
  domUndo.insertAdjacentElement("afterbegin", newElement);
}

inputArea.addEventListener("keyup", handleText);

// =======
// BUTTONS
// =======

// Select Button DOM Elements
const btnUndo = document.querySelector(".buttons__undo");
const btnRedo = document.querySelector(".buttons__redo");

// Create Event Handlers for the Buttons
// function handleBtnUndo() {
//   // Extract the information from the text area
//   let text = inputArea.value;

//   // Extract the last character from text
//   const lastChar = text[text.length - 1];

//   // Update the value in the text area
//   inputArea.value = text.slice(0, text.length - 1);

//   // Create a new paragraph element with lastChar
//   const newElement = createNewElement(lastChar);

//   // Add the new element to the Undo DOM Element
//   domUndo.insertAdjacentElement("afterbegin", newElement);
// }

function handleButtonUndo() {}

function handleBtnRedo() {}

// Add Event Listeners to the Buttons
btnUndo.addEventListener("click", handleBtnUndo);

/*
- every time the user enters text into the text area,
the corresponding character is pushed into the undo stack
- When the undo button is pressed,
  - The last item off of the undo stack is pushed onto the redo stack
  - The last item in the text area is also removed
- When the redo button is pressed
  - The last item on the redo stack is popped off and pushed onto the undo stack
  - the item popped off is appended to the text in the text area
*/
