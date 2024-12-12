export function renderDisk(disk) {
  let result = "";
  let node = disk.head;

  while (node) {
    result += Array.from({ length: node.count })
      .map(() => (node.type === "empty" ? "." : node.id))
      .join("");
    node = node.next;
  }

  return result;
}
