export class LL {
  tail = undefined;
  head = undefined;
  size = 0;

  appendNode(id) {
    const node = new DiskNode(id);
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
}

export class DiskNode {
  prev = undefined;
  next = undefined;

  constructor(id) {
    this.id = id;
    this.type = typeof id === "undefined" ? "empty" : "file";
  }

  swapWith(other) {
    const tempId = this.id;
    const tempType = this.type;
    this.id = other.id;
    this.type = other.type;
    other.id = tempId;
    other.type = tempType;
  }
}
