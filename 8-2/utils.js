export function renderMap(map) {
  const result = map.grid
    .reduce((acc, curr) => {
      const row = curr.join("");
      return [...acc, row];
    }, [])
    .join("\n");

  return result;
}
