export function renderDisk(disk) {
  const result = disk
    .reduce((acc, curr) => {
      if (!curr.count) {
        return acc;
      }

      acc.push(
        Array.from({ length: curr.count }).map(() =>
          typeof curr.id !== "undefined" ? `${curr.id}` : "."
        )
      );

      return acc;
    }, [])
    .flat();

  return result.join("");
}
