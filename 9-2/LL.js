export class LL {
  tail = undefined;
  head = undefined;
  size = 0;

  appendNode(value, size) {
    const node = new DiskNode(value, size);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  updateTail(node) {
    if (node === this.tail && node.prev) {
      this.tail = node.prev;
    }
  }
}

export class DiskNode {
  prev = undefined;
  next = undefined;

  constructor(value, size) {
    this.value = value;
    this.size = size;
    this.type = typeof value === "undefined" ? "empty" : "file";
    this.checked = false;
  }

  moveBeforeEmptyFrame(empty) {
    // Fill the space that will be left behind by moving the current frame.
    if (this.prev && this.prev.type === "empty") {
      this.prev.size += this.size;
    }

    // Detach the current frame from its position.
    if (this.prev) {
      this.prev.next = this.next;
    }
    if (this.next) {
      this.next.prev = this.prev;
    }

    // Reduce target empty frame size to account for incoming current frame.
    empty.size -= this.size;

    // Insert current frame before the empty frame.
    this.next = empty;
    this.prev = empty.prev;
    if (empty.prev) {
      empty.prev.next = this;
    }
    empty.prev = this;
  }
}
