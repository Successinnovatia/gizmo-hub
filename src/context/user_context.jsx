import { loginUser, logoutUser } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { createContext, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { isAuthenticated, user, loginWithRedirect, logout, isLoading } =
    useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loginUser({ isAuthenticated, user }));

      toast.success(`logged in as ${user.name}`);
    }
  }, [user, isAuthenticated]);

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout({ logoutParams: { returnTo: window.location.origin } });
      dispatch(logoutUser());
      dispatch(clearCart());
      queryClient.removeQueries();
    } catch (error) {
      console.log("failed to logout:", error);
    }
  };

  return (
    <UserContext.Provider value={{ handleLogin, handleLogout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
