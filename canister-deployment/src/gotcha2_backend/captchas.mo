import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Random "mo:base/Random";
import Float "mo:base/Float";
import List "mo:base/List";
import Principal "mo:base/Principal";

import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Iter "mo:base/Iter";
import Blob "mo:base/Blob";
import Bool "mo:base/Bool";

import HttpTypes "./../motoko/ext";
import Memory "mo:base/ExperimentalStableMemory";
import Result "mo:base/Result";

actor {

  type Error = {
    #NotFound;
    #AlreadyExists;
    #NotAuthorized;
  };

  let sessions = HashMap.HashMap<Text, [(Float, Text)]>(1, Text.equal, Text.hash);
  stable var sessionsEntries : [(Text, [(Float, Text)])] = [];

  stable var customerCanister = actor ("zydb5-siaaa-aaaab-qacba-cai") : actor {
    updateCaptchaServed : (_user : Principal, _key : Text) -> async (Result.Result<(Bool), Error>);
    updateCaptchaVerified : (_customer : Principal, _key : Text, _answer : Bool) -> async (Result.Result<(Bool), Error>);
  };
  //  shared type SharedHashMap = { hashMap : HashMap.HashMap<Text, [(Float, Text)]> };

  // ****IPFS****
  private stable var links : [Text] = ["https://gotcha.infura-ipfs.io/ipfs/QmRtw37DRfygDwamd7MHDtfkheKDmaSzNrrmPb9JMqUAYb", "https://gotcha.infura-ipfs.io/ipfs/Qmc4M5VZdehb5rroGNeEEw4V6kunadVf6nMdoubXfHXhv6"];
  private var customerLinks = HashMap.HashMap<Principal, [Text]>(1, Principal.equal, Principal.hash);
  private stable var _customerLinks : [(Principal, [Text])] = [];

  var rangeSize = 190;

  public func setCustomerCanister(canisterId : Text) {
    customerCanister := actor (canisterId) : actor {
      updateCaptchaServed : (_user : Principal, _key : Text) -> async (Result.Result<(Bool), Error>);
      updateCaptchaVerified : (_customer : Principal, _key : Text, _answer : Bool) -> async (Result.Result<(Bool), Error>);
    };
  };

  // public query func generate(blob : Text) : async (Nat, Nat, Text) {
  //   // let num1 = random.range(max); //( 0...(2^max)-1 )
  //   // let num2 = random.range(max); //( 0...(2^max)-1 )
  //   let seed = Text.encodeUtf8(blob);
  //   let random = Random.Finite(seed);
  //   var a = random.range(8);
  //   var b = random.range(8);
  //   var num0 = 0;
  //   var num1 = 0;
  //   switch (a, b) {
  //     case (?d, ?c) {
  //       num0 := ((d + 500) % rangeSize) + 1;
  //       num1 := ((c + 500) % rangeSize) + 1;
  //     }; // Apply modulo operation and add 1 to shift the range to 1-190
  //     case (?d, null) { num0 := ((d + 500) % rangeSize) + 1 };
  //     case (null, ?c) { num1 := ((c + 500) % rangeSize) + 1 };
  //     case (null, null) {};
  //   };
  //   var num = random.range(8);
  //   var index = 0;
  //   switch (num) {
  //     case (?ind) { index := ((ind) % links.size()) };
  //     case (null) { index := 1 };
  //   };
  //   // var blobImg : ?Blob = loadBlobImg("img" #Nat.toText(index));
  //   return (num0, num1, links[index]);
  // };

  public query func generate(blob : Text, id : Text) : async (Nat, Nat, Text) {
    // let num1 = random.range(max); //( 0...(2^max)-1 )
    // let num2 = random.range(max); //( 0...(2^max)-1 )
    let seed = Text.encodeUtf8(blob);
    let random = Random.Finite(seed);
    var a = random.range(8);
    var b = random.range(8);
    var num0 = 0;
    var num1 = 0;
    switch (a, b) {
      case (?d, ?c) {
        num0 := ((d + 500) % rangeSize) + 1;
        num1 := ((c + 500) % rangeSize) + 1;
      }; // Apply modulo operation and add 1 to shift the range to 1-190
      case (?d, null) { num0 := ((d + 500) % rangeSize) + 1 };
      case (null, ?c) { num1 := ((c + 500) % rangeSize) + 1 };
      case (null, null) {};
    };
    var num = random.range(8);
    var index = 0;
    switch (num) {
      case (?ind) { index := ((ind) % links.size()) };
      case (null) { index := 1 };
    };
    if (
      customerLinks.get(Principal.fromText(id)) != null
    ) {
      var clinks = customerLinks.get(Principal.fromText(id));
      switch (clinks) {
        case (?c) return (num0, num1, c[index]);
        case (null) return (num0, num1, links[index]);
      };
    } else return (num0, num1, links[index]);
  };

  // ************Session Management*************
  public func addSession(id : Text, principal : Text, solution : Float) : async ?[(Float, Text)] {
    sessions.put(id, [(solution, principal)]);
    return sessions.get(id);
  };

  public query func getSessions() : async [(Text, [(Float, Text)])] {
    sessionsEntries := Iter.toArray(sessions.entries());
    return sessionsEntries;
  };

  public query func checkCaptcha(sol : Float, id : Text) : async Bool {
    var session : [(Float, Text)] = [(0, "")];
    switch (sessions.get(id)) {
      case (?b) session := b;
      case (null) return false;
    };
    // var session: [(Float, Text)] =sessions.get(id);
    let (solution, user) = session[0];
    return (Float.abs(solution - sol) < 7);
  };

  // ***********IPFS*******************
  public func addIpfs(link : Text) : async [Text] {
    links := Array.append(links, [link]);
    return links;
  };

  public shared (msg) func customerUpload(link : Text) {
    var links = customerLinks.get(msg.caller);
    switch (links) {
      case (?existingLinks) {
        let updatedLinks = Array.append(existingLinks, [link]);
        customerLinks.put(msg.caller, updatedLinks);
      };
      case (null) {
        customerLinks.put(msg.caller, [link]);
      };
    };
  };

  public query func getCustomerLinks(id : Text) : async ?[Text] {
    return customerLinks.get(Principal.fromText(id));
  };

  public query func getIpfs() : async Text {
    return links[0];
  };

  public func captchaServed(_customer : Text, _key : Text) : async Result.Result<(Bool), Error> {
    var _cust = Principal.fromText(_customer);
    return await customerCanister.updateCaptchaServed(_cust, _key);
  };

  public func captchaVerified(_customer : Text, _key : Text, _answer : Bool) : async Result.Result<(Bool), Error> {
    var _cust = Principal.fromText(_customer);
    return await customerCanister.updateCaptchaVerified(_cust, _key, _answer);
  };

  system func preupgrade() {
    _customerLinks := Iter.toArray(customerLinks.entries());

  };

  system func postupgrade() {
    customerLinks := HashMap.fromIter<Principal, [Text]>(
      _customerLinks.vals(),
      1,
      Principal.equal,
      Principal.hash,
    );
  };

};
