import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { getGotchaCanister, getUsersCanister } from "../../../utils/canister";
import {
  CUSTOMERS_CANISTER_ID,
  INTERNET_IDENTITY,
  blockchain_server,
} from "../../../utils/CanisterIds";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const loginButton = document.getElementById("login");
export const loginOnClick = async (e) => {
  // let actor = internet_identity_test_backend;
  // let userActor = Users;
  // e.preventDefault();

  // create an auth client
  let authClient = await AuthClient.create();

  // start the login process and wait for it to finish
  await new Promise((resolve) => {
    authClient.login({
      identityProvider: process.env.DFX_NETWORK === "ic"
      ? "https://identity.ic0.app/#authorize"
      :INTERNET_IDENTITY,
      onSuccess: resolve,
    });
  });

  // At this point we're authenticated, and we can get the identity from the auth client:
  const identity = authClient.getIdentity();
  console.log("identity", identity);
  // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
  const agent = new HttpAgent({ identity });

  const userActor = await getUsersCanister(
    CUSTOMERS_CANISTER_ID,
    blockchain_server
  );
  console.log("userActor: ", userActor);

  const actor = await getGotchaCanister(
    INTERNET_IDENTITY_TEST_BACKEND_CANISTER_ID,
    blockchain_server
  );

  try {
    const id = await actor.whoami();
    console.log(id);

    await userActor.addUser(
      "Test",
      "46aaa-fwufx-rqbur-thdk4-dexy2-pt7hg-fgrdv-jdjrn-2df5g-nsvcx-oqe",
      "Testkey"
    );
    const user = await userActor.getUser(
      "46aaa-fwufx-rqbur-thdk4-dexy2-pt7hg-fgrdv-jdjrn-2df5g-nsvcx-oqe"
    );
    console.log("USER:", user);
  } catch (error) {
    console.log("ERROR", error);
  }
  // Using the interface description of our webapp, we create an actor that we use to call the service methods.
  // userActor = usersCreateActor(process.env.CUSTOMERS_CANISTER_ID, {
  //   agentOptions: {
  //     identity,
  //   },
  // });

  // actor = createActor(process.env.INTERNET_IDENTITY_TEST_BACKEND_CANISTER_ID, {
  //   agentOptions: {
  //     identity,
  //   },
  // });
  // const id = await actor.whoami();
  // const user = await userActor.getUser(id.toString());
  // console.log("USER:", user);
  // if (user.length != 0) {
  //   renderLoggedIn(actor, authClient);
  // } else {
  //   renderIndex(true);
  // }

  return true;
};
export const SignupOnClick = async (e) => {
  // const navigate = useNavigate();
  // // let actor = internet_identity_test_backend;
  // // let userActor = Users;
  // // e.preventDefault();

  // // create an auth client
  // let authClient = await AuthClient.create();

  // // start the login process and wait for it to finish
  // await new Promise((resolve) => {
  //   authClient.login({
  //     identityProvider: INTERNET_IDENTITY,
  //     onSuccess: resolve,
  //   });
  // });

  // // At this point we're authenticated, and we can get the identity from the auth client:
  // const identity = authClient.getIdentity();
  // console.log("identity", identity);
  // // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
  // const agent = new HttpAgent({ identity });

  // const userActor = await getUsersCanister(
  //   CUSTOMERS_CANISTER_ID,
  //   blockchain_server
  // );
  // console.log("userActor: ", userActor);

  // const actor = await getGotchaCanister(
  //   INTERNET_IDENTITY_TEST_BACKEND_CANISTER_ID,
  //   blockchain_server
  // );

  // try {
  //   const id = await actor.whoami();
  //   console.log(id);

  //   await userActor.addUser("Test", id.toString(), "Testkey");
  //   const user = await userActor.getUser(id.toString());

  //   let data = JSON.stringify({
  //     principle: id.toString(),
  //   });

  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: "http://192.168.3.51:3001/api/v1/createUser",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       "X-Requested-With": "XMLHttpRequest",
  //     },
  //     data: data,
  //   };

  //   const response = await axios.request(config);
  //   console.log(response);

  //   console.log("USER:", user);
  // } catch (error) {
  //   console.log("ERROR", error);
  // }
  // Using the interface description of our webapp, we create an actor that we use to call the service methods.
  // userActor = usersCreateActor(process.env.CUSTOMERS_CANISTER_ID, {
  //   agentOptions: {
  //     identity,
  //   },
  // });

  // actor = createActor(process.env.INTERNET_IDENTITY_TEST_BACKEND_CANISTER_ID, {
  //   agentOptions: {
  //     identity,
  //   },
  // });
  // const id = await actor.whoami();
  // const user = await userActor.getUser(id.toString());
  // console.log("USER:", user);
  // if (user.length != 0) {
  //   renderLoggedIn(actor, authClient);
  // } else {
  //   renderIndex(true);
  // }

  return true;
};

// const signupButton = document.getElementById("signup");
// signupButton.onclick = async (e) => {
//   let actor = internet_identity_test_backend;
//   let userActor = Users;
//   e.preventDefault();

//   // create an auth client
//   let authClient = await AuthClient.create();

//   // start the login process and wait for it to finish
//   await new Promise((resolve) => {
//     authClient.login({
//       identityProvider: process.env.II_URL,
//       onSuccess: resolve,
//     });
//   });

//   // At this point we're authenticated, and we can get the identity from the auth client:
//   const identity = authClient.getIdentity();
//   // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
//   const agent = new HttpAgent({ identity });
//   // Using the interface description of our webapp, we create an actor that we use to call the service methods.
//   actor = createActor(process.env.INTERNET_IDENTITY_TEST_BACKEND_CANISTER_ID, {
//     agentOptions: {
//       identity,
//     },
//   });
//   userActor = usersCreateActor(process.env.CUSTOMERS_CANISTER_ID, {
//     agentOptions: {
//       identity,
//     },
//   });
//   const id = await actor.whoami();
//   userActor.addUser("Test", id.toString(), "Testkey");

//   renderLoggedIn(actor, authClient);

//   return false;
// };
