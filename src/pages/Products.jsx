import React, { useEffect } from "react";
import { ProductsContainer, PaginationContainer, Filter } from "../components";
import { customFetch } from "../utils";
import { useDispatch } from "react-redux";
import { loadProducts } from "../features/products/productsSlice";
import { useLoaderData } from "react-router-dom";

const url = "/products";

const ProductsQuery = {
  queryKey: ["Products"],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(ProductsQuery);
  const products = response.data;

  return { products };
};

const Products = () => {
  const { products } = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts({ products }));
  }, [products]);
  return (
    <>
      <Filter />
      <ProductsContainer />
      {/* <PaginationContainer /> */}
    </>
  );
};

export default Products;
