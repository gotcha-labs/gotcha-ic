const idlFactory = ({ IDL }) => {
  const Error = IDL.Variant({
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'AlreadyExists' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Bool, 'err' : Error });
  return IDL.Service({
    'addIpfs' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], []),
    'addSession' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Float64],
        [IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Float64, IDL.Text)))],
        [],
      ),
    'captchaServed' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'captchaVerified' : IDL.Func([IDL.Text, IDL.Text, IDL.Bool], [Result], []),
    'checkCaptcha' : IDL.Func([IDL.Float64, IDL.Text], [IDL.Bool], ['query']),
    'customerUpload' : IDL.Func([IDL.Text], [], ['oneway']),
    'generate' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Nat, IDL.Nat, IDL.Text],
        ['query'],
      ),
    'getCustomerLinks' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Vec(IDL.Text))],
        ['query'],
      ),
    'getIpfs' : IDL.Func([], [IDL.Text], ['query']),
    'getSessions' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Tuple(IDL.Text, IDL.Vec(IDL.Tuple(IDL.Float64, IDL.Text)))
          ),
        ],
        ['query'],
      ),
    'setCustomerCanister' : IDL.Func([IDL.Text], [], ['oneway']),
  });
};
 const init = ({ IDL }) => { return []; };
 module.exports={init,idlFactory}