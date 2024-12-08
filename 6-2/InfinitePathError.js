export class InfinitePathError extends Error {
  constructor(message) {
    super(message);
    this.name = "InfinitePathError";
  }
}
