class Storage {
  get(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  set(key, value) {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

export const storage = new Storage();

export default Storage;
