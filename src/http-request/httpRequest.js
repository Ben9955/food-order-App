const useHttpRequest = (option) => {
  const fetchData = async () => {
    try {
      const response = await fetch(option.url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return fetchData();
};

export default useHttpRequest;
