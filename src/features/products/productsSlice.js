import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_products: [],
  filtered_products: [],
  filters: {
    search: "",
    company: "all",
    category: "all",
    price: 0,
    maxPrice: 0,
    order: "a-z",
    shipping: false,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      let maxPrice = action.payload.products.map((p) => p.attributes.price);
      maxPrice = Math.max(...maxPrice);
      state.all_products = action.payload.products;
      state.filtered_products = action.payload.products;
      state.filters = { ...state.filters, maxPrice: maxPrice, price: maxPrice };

      // console.log(state.filtered_products.length);
    },

    updateFilters: (state, action) => {
      // console.log(action.payload);
      const { name, value } = action.payload;
      state.filters = { ...state.filters, [name]: value };
    },

    filterProducts: (state) => {
      const { all_products } = state;
      const { search, category, company, order, price, shipping } =
        state.filters;

      // let tempProducts = [...all_products];

      let tempProducts = Array.isArray(all_products) ? [...all_products] : [];

      // console.log(JSON.parse(JSON.stringify(tempProducts)));

      // console.log(tempProducts);

      if (order === "a-z") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.attributes.title.localeCompare(b.attributes.title);
        });
      }

      if (order === "z-a") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.attributes.title.localeCompare(a.attributes.title);
        });

        // console.log(JSON.parse(JSON.stringify(tempProducts)));
      }

      if (order === "high") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.attributes.price - a.attributes.price;
        });

        // console.log(JSON.parse(JSON.stringify(tempProducts)));
      }

      if (order === "low") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.attributes.price - b.attributes.price;
        });
      }

      if (search) {
        const searchTerm = search.toLowerCase();
        tempProducts = tempProducts.filter((product) =>
          product.attributes.title.toLowerCase().includes(searchTerm)
        );
        // console.log(JSON.parse(JSON.stringify(tempProducts)));
      }

      if (category != "all") {
        tempProducts = tempProducts.filter(
          (product) => product.attributes.category === category
        );
        // console.log(JSON.parse(JSON.stringify(tempProducts)));
      }

      if (company != "all") {
        tempProducts = tempProducts.filter(
          (product) => product.attributes.company === company
        );
      }

      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.attributes.shipping === true
        );
      }

      tempProducts = tempProducts.filter(
        (product) => product.attributes.price <= price
      );

      state.filtered_products = tempProducts;
    },

    clearFilters: (state) => {
      state.filters = {
        search: "",
        company: "all",
        category: "all",
        price: 0,
        maxPrice: state.filters.maxPrice,
        order: "a-z",
        shipping: false,
      };
    },
  },
});

export const { loadProducts, filterProducts, updateFilters, clearFilters } =
  productsSlice.actions;

export default productsSlice.reducer;
