export const useLocalStorage = () => {
  
  const setLocalStorage = (key,data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getLocalStorage = (key) => {
    const savedData = JSON.parse(localStorage.getItem(key));
    return savedData ? savedData : "";
  };
  const clearLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  return {
    setLocalStorage,
    getLocalStorage,
    clearLocalStorage,
  };
};
