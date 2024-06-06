import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";
import { getUniqueValues } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  updateFilters,
  clearFilters,
} from "../features/products/productsSlice";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.productsState.all_products);

  const { search, company, category, shipping, order, price, maxPrice } =
    useSelector((state) => state.productsState.filters);

  const data = products.map((product) => product.attributes);

  const categories = getUniqueValues(data, "category");

  const companies = getUniqueValues(data, "company");

  const update = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "category" || name === "company" || name === "order") {
      value = e.target.value;
    }

    if (name === "price") {
      value = Number(value);
    }

    if (name === "shipping") {
      value = e.target.checked;
    }

    dispatch(updateFilters({ name, value }));
  };

  const clear = () => {
    dispatch(clearFilters());
    navigate("/products");
  };

  const filter = () => {
    dispatch(filterProducts());
  };

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/*INPUT*/}
      <FormInput
        label="search product"
        type="search"
        name="search"
        size="input-sm"
        value={search}
        onChangeEvent={update}
      />

      {/*CATEGORIES*/}
      <FormSelect
        label="select category"
        name="category"
        list={categories}
        size="select-sm"
        value={category}
        onChangeEvent={update}
      />

      {/*COMPANIES*/}
      <FormSelect
        label="select company"
        name="company"
        list={companies}
        size="select-sm"
        value={company}
        onChangeEvent={update}
      />

      {/*ORDER*/}
      <FormSelect
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        value={order}
        onChangeEvent={update}
      />

      {/*PRICE*/}
      <FormRange
        label="select price"
        name="price"
        size="range-sm"
        price={price}
        maxPrice={maxPrice}
        onChangeEvent={update}
      />

      {/*FREE SHIPPING*/}
      <FormCheckbox
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
        defaultValue={shipping}
        onChangeEvent={update}
      />

      {/*BUTTONS*/}
      <button type="button" onClick={filter} className="btn btn-primary btn-sm">
        search
      </button>

      {/* <Link to="/products" className="btn btn-accent btn-sm">
        reset
      </Link> */}
      <button type="button" onClick={clear} className="btn btn-accent btn-sm">
        reset
      </button>
    </Form>
  );
};

export default Filter;
