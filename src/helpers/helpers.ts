export function saveToLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key: string) {
  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) : null;
}
