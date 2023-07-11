const fetch = require("node-fetch");
const pkgAgent = require("@dfinity/agent");
const {
  idlFactory: customerIdlFactory,
} = require("../../../declarations/gotcha2_backend/gotcha2_backend.did.js");
const {
  idlFactory: captchasIdlFactory,
} = require("../../../declarations/Captchas/Captchas.did.js");
// const { readFileSync } = require("fs");
const pkgPrincipal = require("@dfinity/principal");

const { HttpAgent, Actor } = pkgAgent;
const { Principal } = pkgPrincipal;

const actorCustomer = async (_id, _host, identity) => {
  // TODO: implement actor initialization
  // const canisterId = actorCanisterIdLocal();
  const canisterId = Principal.fromText(_id);

  const host = _host; // Mainnet: 'https://ic0.app'

  const fetchOptions = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  //* For Local
  const agent = new HttpAgent({
    identity,
    fetch: window.fetch.bind(window),
    host,
    options: fetchOptions,
  });

  //* For Mainnet
  // const agent = new HttpAgent({
  //   identity,
  //   fetch: window.fetch.bind(window),
  //   host,
  //   options: fetchOptions,
  // });

  // Local only
  await agent.fetchRootKey();

  return Actor.createActor(customerIdlFactory, {
    agent,
    canisterId,
  });
};

const actorCaptchas = async (_id, _host, identity) => {
  // TODO: implement actor initialization
  // const canisterId = actorCanisterIdLocal();
  const canisterId = Principal.fromText(_id);

  const host = _host; // Mainnet: 'https://ic0.app'

  const fetchOptions = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  //* For Local
  const agent = new HttpAgent({
    identity,
    fetch: window.fetch.bind(window),
    host,
    options: fetchOptions,
  });

  //* For Mainnet
  // const agent = new HttpAgent({
  //   identity,
  //   fetch: window.fetch.bind(window),
  //   host,
  //   options: fetchOptions,
  // });

  // Local only
  await agent.fetchRootKey();

  return Actor.createActor(captchasIdlFactory, {
    agent,
    canisterId,
  });
};

// const actorID = async (_id, _host) => {
//   // TODO: implement actor initialization
//   // const canisterId = actorCanisterIdLocal();
//   const canisterId = Principal.fromText(_id);

//   //console.log(canisterId);

//   const host = _host; // Mainnet: 'https://ic0.app'

//   const agent = new HttpAgent({ fetch, host });

//   // Local only
//   await agent.fetchRootKey();

//   return Actor.createActor(internetIdlFactory, {
//     agent,
//     canisterId,
//   });
// };

// const getIDCanister = async (id, host) => {
//   const actor = await actorID(id, host);
//   return actor;
// };

const getCustomerCanister = async (id, host, identity) => {
  const actor = await actorCustomer(id, host, identity);
  return actor;
};

const getCaptchasCanister = async (id, host, identity) => {
  const actor = await actorCaptchas(id, host, identity);
  return actor;
};
module.exports = { getCustomerCanister, getCaptchasCanister };
