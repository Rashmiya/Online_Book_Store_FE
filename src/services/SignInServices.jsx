import React from 'react';
import useFetch from '../hooks/useFetch';

const SignInServices = () => {
  const { fetchAction } = useFetch();

  const handleResponse = response => {
    if (response?.success) {
      return { responseType: 'success', output: response };
    } else {
      return { responseType: 'fail', output: response };
    }
  };

  const loginUser = async data => {
    try {
      const response = await fetchAction({
        query: '/customer/signin',
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: 'error', output: error };
    }
  };

  const signUpUser = async data => {
    try {
      const response = await fetchAction({
        query: '/customer/signup',
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: 'error', output: error };
    }
  };

  const logOutUser = async () => {
    try {
      const response = await fetchAction({
        query: '/customer/logout',
        method: 'get',
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: 'error', output: error };
    }
  };

  return { loginUser, signUpUser, logOutUser };
};

export default SignInServices;
