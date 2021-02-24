const useSearchParams = () => {
  const getSearchParam = (key: string): string => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  };

  return { getSearchParam };
};

export default useSearchParams;
