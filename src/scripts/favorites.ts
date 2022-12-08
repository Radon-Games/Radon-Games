class FavoriteSet {
  #set: Set<string> = new Set();
  constructor(...args: any[]) {
    this.#set = new Set(...args);
    this.save();
  }

  add(value: string) {
    this.#set.add(value);
    this.save();
  }

  delete(value: string) {
    this.#set.delete(value);
    this.save();
  }

  has(value: string) {
    return this.#set.has(value);
  }

  save() {
    localStorage.setItem("favorites", JSON.stringify(Array.from(this.#set)));
  }
}

const favorites = localStorage.getItem("favorites")
  ? new FavoriteSet(JSON.parse(localStorage.getItem("favorites")!))
  : new FavoriteSet() || new FavoriteSet();

export { favorites };
