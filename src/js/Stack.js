export class Stack {
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
