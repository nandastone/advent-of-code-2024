export function renderDisk(disk) {
  let result = "";
  let node = disk.head;

  // console.log(disk);

  while (node) {
    // console.log(node);
    result += node.type === "empty" ? "." : node.id;
    node = node.next;
  }

  return result;
}
