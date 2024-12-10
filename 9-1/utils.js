export function renderDisk(disk) {
  let result = "";
  let node = disk.head;

  while (node) {
    result += node.type === "empty" ? "." : node.id;
    node = node.next;
  }

  return result;
}
