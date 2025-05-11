import React from 'react';
import useFetch from '../hooks/useFetch';

const OrderService = () => {
  const { fetchAction } = useFetch();

  const handleResponse = response => {
    if (response?.success) {
      return { responseType: 'success', output: response };
    } else {
      return { responseType: 'fail', output: response };
    }
  };

  // Create a new order
  const createOrder = async data => {
    try {
      const response = await fetchAction({
        query: '/order/create',
        method: 'post',
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: 'error', output: error };
    }
  };

  // Get a single order by ID
  const getOrderById = async data => {
    try {
      const response = await fetchAction({
        query: '/order/find',
        method: 'get',
        params: {
          orderId: data?.orderId || 0,
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: 'error', output: error };
    }
  };
  return {
    createOrder,
    getOrderById,
  };
};

export default OrderService;
