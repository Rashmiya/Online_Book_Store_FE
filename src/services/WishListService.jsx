import React from "react";
import useFetch from "../hooks/useFetch";

const WishListService = () => {
  const { fetchAction } = useFetch();

  const handleResponse = (response) => {
    if (response?.success) {
      return { responseType: "success", output: response };
    } else {
      return { responseType: "fail", output: response };
    }
  };

  const saveWishList = async (data) => {
    try {
      const response = await fetchAction({
        query: "/wishlist/create",
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const checkWishlistService = async (data) => {
    try {
      const response = await fetchAction({
        query: "/wishlist/check",
        method: "get",
        params: {
          bookId: data.bookId || "",
          userId: data.userId || "",
        },
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };

  const updateWishList = async (data) => {
    try {
      const response = await fetchAction({
        query: "/wishlist/update",
        method: "put",
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      return { responseType: "error", output: error };
    }
  };
  return { saveWishList, checkWishlistService, updateWishList };
};

export default WishListService;
