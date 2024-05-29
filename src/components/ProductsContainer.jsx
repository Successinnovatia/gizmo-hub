import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useSelector } from "react-redux";

const ProductsContainer = () => {
  // const { meta } = useLoaderData();
  // const totalProducts = meta.pagination.total;

  const totalProducts = useSelector(
    (state) => state.productsState.filtered_products.length
  );

  const [layout, setLayout] = useState("grid");
  const setActiveLayout = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    }`;
  };
  return (
    <>
      {/*HEADER*/}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalProducts} product{totalProducts > 1 && "s"}
        </h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            className={setActiveLayout("grid")}
            onClick={() => setLayout("grid")}
          >
            <BsFillGridFill />
          </button>

          <button
            type="button"
            className={setActiveLayout("list")}
            onClick={() => setLayout("list")}
          >
            <BsList />
          </button>
        </div>
      </div>
      {/*PRODUCTS*/}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no available products for your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
