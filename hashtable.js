class HashTable {
  constructor(size) {
    this.size = size;
    this.table = {};
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size;
  }

  insert(key, value) {
    let index = this.hash(key);

    while (this.table.hasOwnProperty(index)) {
      if (this.table[index].key === key) {
        this.table[index].value = value;
        return;
      }
      index = (index + 1) % this.size;
    }
    this.table[index] = { key, value };
  }

  delete(key) {
    let index = this.hash(key);
    while (this.table.hasOwnProperty(index)) {
      if (this.table[index].key === key) {
        delete this.table[index];
        return true;
      }
      index = (index + 1) % this.size;
    }
    return false;
  }

  get(key) {
    let index = this.hash(key);
    while (this.table.hasOwnProperty(index)) {
      if (this.table[index].key === key) {
        return this.table[index].value;
      }
      index = (index + 1) % this.size;
    }
    return null;
  }
}
