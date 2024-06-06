import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from "../components";

const ordersQuery = (user) => {
  return {
    queryKey: [
      "orders",
      user.name,
      // params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get("/get-orders", {
        params: { email: user.email },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("You must be logged in to view orders");
      return redirect("/");
    }

    // const params = Object.fromEntries([
    //   ...new URL(request.url).searchParams.entries(),
    // ]);

    try {
      const response = await queryClient.ensureQueryData(ordersQuery(user));
      return { orders: response.data };
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error accessing your orders";

      toast.error(errorMessage);
      //if user's token is expired
      if (error?.response?.status === 401 || 403) return redirect("/");

      return null;
    }
  };

const Orders = () => {
  const { orders } = useLoaderData();

  if (orders.length < 1) {
    return <SectionTitle text="Please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      {/* <ComplexPaginationContainer /> */}
    </>
  );
};

export default Orders;
