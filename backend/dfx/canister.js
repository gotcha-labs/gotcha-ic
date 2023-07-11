const pkgAgent = require("@dfinity/agent");
const { idlFactory: usersIdlFactory } = require("./users.did");
const { idlFactory: captchasIdlFactory } = require("./captchas.did");
const pkgPrincipal = require("@dfinity/principal");
const fetch = require("node-fetch");
const { HttpAgent, Actor } = pkgAgent;
const { Principal } = pkgPrincipal;
const { blockchain_server } = require("../dfx/canister.ids");

const actorUsers = async (_id) => {
  // TODO: implement actor initialization
  // const canisterId = actorCanisterIdLocal();
  const canisterId = Principal.fromText(_id);

  //console.log(canisterId);

  const hostt = blockchain_server; // Mainnet: 'https://ic0.app'

  const fetchOptions = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "ngrok-skip-browser-warning": true,
    },
  };

  const agent = new HttpAgent({
    fetch,
    host: hostt,
    options: fetchOptions,
  });

  // Local only
  await agent.fetchRootKey();

  return Actor.createActor(usersIdlFactory, {
    agent,
    canisterId,
  });
};

const actorCaptchas =  (_id, _host) => {
  const canisterId = Principal.fromText(_id);
  const host = blockchain_server; // Mainnet: 'https://ic0.app'
  const fetchOptions = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "ngrok-skip-browser-warning": true,
    },
  };
  const agent = new HttpAgent({
    fetch,
    host,
    options: fetchOptions,
  });
  // Local only
  agent.fetchRootKey();
  return Actor.createActor(captchasIdlFactory, {
    agent,
    canisterId,
  });
};

const getUsersCanister = async (id, host) => {
  const actor = await actorUsers(id, host);
  return actor;
};
const getCaptchaCanister = async (id, host) => {
  const actor = await actorCaptchas(id, host);
  return actor;
};

// module.exports = { getUsersCanister, getIDCanister, getGotchaCanister };
module.exports = { getUsersCanister, getCaptchaCanister };
