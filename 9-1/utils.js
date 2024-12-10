export function renderDisk(disk) {
  let result = "";
  let node = disk.head;

  // console.log(disk);

  while (node) {
    // console.log(node);
    result += typeof node.id === "undefined" ? "." : node.id;
    node = node.next;
  }

  return result;
}
