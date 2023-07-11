import PropTypes from "prop-types";
import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// reducer - state management
import { LOGIN, REGISTER, LOGOUT } from "../store/actions";
import accountReducer from "../store/accountReducer";

// project imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "../ui-component/Loader";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { getCustomerCanister, getCaptchasCanister } from "../utils/canister";
import {
  CUSTOMERS_CANISTER_ID,
  CAPTCHAS_CANISTER_ID,
  INTERNET_IDENTITY,
  blockchain_server,
} from "../utils/CanisterIds";

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: true,
  user: null,
  secretKey: null,
  captchaActor: null,
  customerActor: null,
  token: "",
};

const setCustomer = (customer) => {
  if (customer) {
    // sessionStorage.setItem("customer", customer);
    localStorage.setItem("customer", customer);
    // axios.defaults.headers.common.Authorization = `Bearer ${customer}`;
  } else {
    // sessionStorage.removeItem("customer");
    localStorage.removeItem("customer", customer);
    // delete axios.defaults.headers.common.Authorization;
  }
};

const setSiteKeys = (siteKeys) => {
  if (siteKeys) {
    siteKeys.map((k) => {
      k.captchaFailed = Number(k.captchaFailed);
      k.captchaVerified = Number(k.captchaVerified);
      k.captchaServed = Number(k.captchaServed);
    });
    localStorage.setItem("siteKeys", JSON.stringify(siteKeys));
  } else {
    localStorage.removeItem("siteKeys");
  }
};

// ==============================|| Auth CONTEXT & PROVIDER ||============================== //

const AuthContext = createContext(null);
const getActor = async () => {
  let authClient = await AuthClient.create();

  // start the login process and wait for it to finish
  await new Promise((resolve) => {
    authClient.login({
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : INTERNET_IDENTITY,
      onSuccess: resolve,
    });
  });

  // At this point we're authenticated, and we can get the identity from the auth client:
  const identity = authClient.getIdentity();

  console.log("identity", identity);
  var userID = identity.getPrincipal().toString();
  console.log("login userId: ", userID);
  if (userID) {
    setCustomer(userID);
  }
  // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
  const agent = new HttpAgent({ identity });

  const actor = await getCustomerCanister(
    CUSTOMERS_CANISTER_ID,
    blockchain_server,
    identity
  );

  const captchaActor = await getCaptchasCanister(
    CAPTCHAS_CANISTER_ID,
    blockchain_server,
    identity
  );

  console.log("Captcha Actor", captchaActor);

  return { actor, captchaActor };
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const accessToken = window.sessionStorage.getItem("accessToken");
  //       if (accessToken) {
  //         setCustomer(accessToken);
  //         // const response = await axios.get("/api/account/me");
  //         // const { userId } = response.data;
  //         const userId = 212312;

  //         dispatch({
  //           type: LOGIN,
  //           payload: {
  //             user: userId,
  //           },
  //         });
  //       } else {
  //         dispatch({
  //           type: LOGOUT,
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       dispatch({
  //         type: LOGOUT,
  //       });
  //     }
  //   };

  //   init();
  // }, []);

  const login = async () => {
    try {
      console.log("login clicked");

      const { actor, captchaActor } = await getActor();

      var id, customerId;
      id = await actor.whoami();
      console.log("Principal", id.toString());

      const customer = await actor.getCustomer(id.toString());
      console.log("Customer:", customer);
      const keys = await actor.getSiteKeys(id.toString());
      if (keys.ok) {
        setSiteKeys(keys.ok);
      }
      // keys.ok.map((k) => console.log(k.key));
      // console.log(keys.ok.length);
      //********************************** /
      let data = JSON.stringify({
        principle: id.toString(),
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://192.168.3.51:3001/api/v1/userLogin",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log("Node responses", response);
      customerId = response.data.data.principle;
      const accessToken = response.data.data.jwtToken;
      console.log(accessToken);
      console.log("customerId: ", id.toString());
      console.log("Process", process.env.GOTCHA2_FRONTEND_CANISTER_ID);
      // setSession(accessToken);
      dispatch({
        type: LOGIN,
        payload: {
          user: id.toString(),
          secretKey: customerId,
          captchaActor: captchaActor,
          customerActor: actor,
          token: accessToken.toString(),
        },
      });
      navigate(
        `/dashboard/?canisterId=${process.env.GOTCHA2_FRONTEND_CANISTER_ID}`
      );

      // navigate(
      //   `/dashboard/?canisterId=${process.env.GOTCHA2_FRONTEND_CANISTER_ID}`,
      //   {
      //     state: {
      //       siteKey: siteId,
      //       secretKey: customerId,
      //       captchaActor: captchaActor,
      //       customerActor: actor,
      //     },
      //   }
      // );
    } catch (error) {
      toast.error("You need to Sign Up first!", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("Login Error: ", error);
    }
  };

  const register = async () => {
    const { actor, captchaActor } = await getActor();

    var siteId, customerId;

    try {
      const id = await actor.whoami();
      console.log(id.toString());

      let data = JSON.stringify({
        principle: id.toString(),
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://192.168.3.51:3001/api/v1/createUser",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log("Node response", response.data);
      siteId = response.data.data.obj.siteKey;
      customerId = response.data.data.obj.principle;
      await actor.addCustomer("Test", id.toString(), siteId);
      const customer = await actor.getCustomer(id.toString());
      console.log(response.data.token);
      console.log("Customer:", customer);
    } catch (error) {
      console.log("ERROR", error);
    }
    dispatch({
      type: LOGIN,
      payload: {
        customer: customerId,
        // user: id.toString(),
        siteKey: siteId,
        secretKey: customerId,
        captchaActor: captchaActor,
        customerActor: actor,
        token: response.data.token,
      },
    });
    navigate(
      `/dashboard/?canisterId=${process.env.GOTCHA2_FRONTEND_CANISTER_ID}`,
      {
        state: { siteKey: siteId, secretKey: customerId },
      }
    );
  };

  const logout = () => {
    setCustomer(null);
    dispatch({ type: LOGOUT });
    navigate("/", {});
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    console.log("state.isInitialized: ", state.isInitialized);
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
