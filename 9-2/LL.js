export class LL {
  tail = undefined;
  head = undefined;
  size = 0;

  appendNode(id, count) {
    const node = new DiskNode(id, count);
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

  constructor(id, count) {
    this.id = id;
    this.count = count;
    this.type = typeof id === "undefined" ? "empty" : "file";
    this.checked = false;
  }

  swapWith(other, isTail) {
    // Increase file.prev.count by file count.

    // Move file node (insert before).
    // - file.prev = empty.prev.next
    // - file.next = empty
    // - empty.prev.next = file
    // - empty.prev = file

    // Reduce empty.count by file count.
    // Remove node
    // If empty count <= 0, remove empty node.
    // - empty.prev.next = empty.next
    // - empty.next.prev = empty.prev

    /* Increase the size of the previous empty to account for the moved file. Cheating 
    a bit by knowing the prev should always be an empty block. */
    if (this.prev) {
      this.prev.count += this.count;
    }

    // Move the file to before the target empty.
    this.insertBefore(other);

    // Reduce the size of the empty.
    other.count -= this.count;
  }

  insertBefore(other) {
    // Remove current item from old location.
    if (this.prev) {
      this.prev.next = this.next;
    }

    if (this.next) {
      this.next.prev = this.prev;
    }

    // Insert current item at new location.
    this.prev = other.prev;
    this.next = other;
    other.prev.next = this;
    other.prev = this;
  }
}
