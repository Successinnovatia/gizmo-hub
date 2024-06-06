import React from "react";
import { Hero } from "../components";
import { customFetch } from "../utils";
import { FeaturedProducts } from "../components";

const url = "/products";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);

  const products = response.data;

  const featuredProducts = products.filter(
    (product) => product.attributes.featured === true
  );

  return { products: featuredProducts };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
