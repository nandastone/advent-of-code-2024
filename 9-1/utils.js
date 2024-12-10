export function renderDisk(disk) {
  const result = disk
    .map((item) => (typeof item === "undefined" ? "." : `${item}`))
    .join("");
  return result;
}
