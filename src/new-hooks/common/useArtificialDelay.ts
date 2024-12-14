const useArtificialDelay = (minDelay = 1000) => {
  const withDelay = async <T>(asyncFn: Promise<T>): Promise<T> => {
    const start = Date.now();
    const result = await asyncFn;
    const elapsed = Date.now() - start;
    
    if (elapsed < minDelay) {
      await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
    }
    
    return result;
  };

  return { withDelay };
};

export default useArtificialDelay;