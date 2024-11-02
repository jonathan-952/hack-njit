export const fetchPurchases = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/purchases'); // Use environment variable for URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
      throw error;
    }
  };  