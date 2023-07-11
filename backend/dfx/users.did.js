const idlFactory = ({ IDL }) => {
  const Error = IDL.Variant({
    NotFound: IDL.Null,
    NotAuthorized: IDL.Null,
    AlreadyExists: IDL.Null,
  });
  const Result_3 = IDL.Variant({ ok: IDL.Text, err: Error });
  const SiteKey = IDL.Record({
    key: IDL.Text,
    captchaFailed: IDL.Nat,
    captchaVerified: IDL.Nat,
    captchaServed: IDL.Nat,
  });
  const Result_1 = IDL.Variant({ ok: IDL.Vec(SiteKey), err: Error });
  const Customer = IDL.Record({
    id: IDL.Nat,
    internetIdentity: IDL.Principal,
    name: IDL.Text,
    siteKeys: IDL.Vec(SiteKey),
  });
  const Result_2 = IDL.Variant({ ok: Customer, err: Error });
  const Result = IDL.Variant({ ok: IDL.Bool, err: Error });
  return IDL.Service({
    addCustomer: IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_3], []),
    addSiteKeys: IDL.Func([IDL.Text, IDL.Text], [Result_1], []),
    deleteCustomer: IDL.Func([IDL.Principal], [], ["oneway"]),
    getCustomer: IDL.Func([IDL.Text], [Result_2], ["query"]),
    getCustomers: IDL.Func([], [IDL.Vec(Customer)], ["query"]),
    getCustomers2: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Principal, Customer))],
      ["query"]
    ),
    getSiteKeys: IDL.Func([IDL.Text], [Result_1], []),
    init: IDL.Func([], [], ["oneway"]),
    updateCaptchaServed: IDL.Func([IDL.Principal, IDL.Text], [Result], []),
    updateCaptchaVerified: IDL.Func(
      [IDL.Principal, IDL.Text, IDL.Bool],
      [Result],
      []
    ),
    whoami: IDL.Func([], [IDL.Principal], []),
  });
};
const init = ({ IDL }) => {
  return [];
};

module.exports = { init, idlFactory };