import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../services/api';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getProducts(1, 999);
      
      let productsArray = [];
      if (Array.isArray(response)) {
        productsArray = response;
      } else if (response && Array.isArray(response.products)) {
        productsArray = response.products;
      } else if (response && response.data && Array.isArray(response.data)) {
        productsArray = response.data;
      }
      
      setProducts(productsArray);
    } catch (err) {
      console.error('Fetch products error:', err);
      setError(err.message || 'Gagal mengambil data menu');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch,
  };
};

export default useProducts;