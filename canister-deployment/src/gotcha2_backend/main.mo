import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import List "mo:base/List";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

actor Customers {

    public type SiteKey = {
        key : Text;
        captchaServed : Nat;
        captchaVerified : Nat;
        captchaFailed : Nat;
    };

    public type Customer = {
        id : Nat;
        name : Text;
        internetIdentity : Principal;
        //should be principal
        siteKeys : [SiteKey];
    };

    type Error = {
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
    };

    private stable var mapEntries : [(Principal, Customer)] = [];
    private var map = HashMap.HashMap<Principal, Customer>(1, Principal.equal, Principal.hash);
    private stable var list : List.List<Customer> = List.nil<Customer>();

    // Constructor function
    public func init() {
        var newKey : SiteKey = {
            key = "site-f8f545d5-69c9-429d-bfb0-2702c4a428eb-key";
            captchaServed = 0;
            captchaVerified = 0;
            captchaFailed = 0;
        };
        var newKey2 : SiteKey = {
            key = "site-f9f545d5-69c9-429d-bfb0-2702c4a428eb-key";
            captchaServed = 0;
            captchaVerified = 0;
            captchaFailed = 0;
        };
        var newCustomer : Customer = {
            id = 1;
            name = "Customer1";
            internetIdentity = Principal.fromText("jbf2x-swfak-2c4ih-mb6lj-76gjk-vkbrk-75g5h-duuag-wkizx-luofn-qae");
            siteKeys = [newKey];
        };
        map.put(newCustomer.internetIdentity, newCustomer);
        list := List.push(newCustomer, list);

        var newCustomer2 : Customer = {
            id = 2;
            name = "Customer2";
            internetIdentity = Principal.fromText("bxd47-u6ns7-qids6-oyt3i-n36mf-aakzy-pjfd3-puj2t-3gb6n-2baq3-hqe");
            siteKeys = [newKey];
        };
        map.put(newCustomer2.internetIdentity, newCustomer2);
        list := List.push(newCustomer2, list);
    };

    public shared (msg) func whoami() : async Principal {
        msg.caller;
    };

    public shared (msg) func addCustomer(n : Text, id : Text, key : Text) : async Result.Result<(Text), Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if (Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        var newKey : SiteKey = {
            key = key;
            captchaServed = 0;
            captchaVerified = 0;
            captchaFailed = 0;
        };
        var newCustomer : Customer = {
            id = map.size() + 1;
            name = n;
            internetIdentity = Principal.fromText(id);
            siteKeys = [newKey];
            captchaServed = 0;
            captchaVerified = 0;
        };
        if (map.get(newCustomer.internetIdentity) == null) {
            map.put(newCustomer.internetIdentity, newCustomer);
            list := List.push(newCustomer, list);
            return #ok("Successful");
        };
        return #err(#AlreadyExists);
    };

    public func addSiteKeys(id : Text, _key : Text) : async Result.Result<([SiteKey]), Error> {
        var customer = map.get(Principal.fromText(id));
        switch (customer) {
            case (?u) {
                var newKey : SiteKey = {
                    key = _key;
                    captchaServed = 0;
                    captchaVerified = 0;
                    captchaFailed = 0;
                };
                var newArray = Array.append(u.siteKeys, [newKey]);
                var newCustomer : Customer = {
                    id = u.id;
                    name = u.name;
                    internetIdentity = u.internetIdentity;
                    siteKeys = newArray;
                };
                map.put(u.internetIdentity, newCustomer);
                list := List.filter(
                    list,
                    func(item : Customer) : Bool {
                        return item.internetIdentity != u.internetIdentity;
                    },
                );
                list := List.push(newCustomer, list);
                return #ok((newCustomer.siteKeys));
            };
            case (null) { return #err(#NotFound) };
        };
    };

    public func getSiteKeys(id : Text) : async Result.Result<([SiteKey]), Error> {
        var customer = map.get(Principal.fromText(id));
        switch (customer) {
            case (?u) {
                return #ok((u.siteKeys));
            };
            case (null) { return #err(#NotFound) };
        };
    };

    public query func getCustomer(_id : Text) : async Result.Result<(Customer), Error> {
        var id = Principal.fromText(_id);
        var customer = map.get(id);
        switch (customer) {
            case (?i) return #ok(i);
            case (null) return #err(#NotFound);
        };

    };

    public query func getCustomers() : async [Customer] {
        return List.toArray(list);
        //return mapEntries;
    };

    public query func getCustomers2() : async [(Principal, Customer)] {
        return mapEntries;
    };

    public func deleteCustomer(id : Principal) {
        map.delete(id);
        list := List.filter(
            list,
            func(item : Customer) : Bool {
                return item.internetIdentity != id;
            },
        );
    };

    // public func updateCaptchaServed(_customer : Principal, _key : Text) : async Bool {
    //     var customer = map.get(_customer);
    //     switch (customer) {
    //         case (?u) {
    //             var newKeys = Array.filter(
    //                 u.siteKeys,
    //                 func(item : SiteKey) : Bool {
    //                     return item.key != _key;
    //                 },
    //             );
    //             var newCustomer : Customer = {
    //                 id = u.id;
    //                 name = u.name;
    //                 internetIdentity = u.internetIdentity;
    //                 siteKeys = u.siteKeys;
    //             };
    //             map.put(_customer, newCustomer);
    //             list := List.filter(
    //                 list,
    //                 func(item : Customer) : Bool {
    //                     return item.internetIdentity != _customer;
    //                 },
    //             );
    //             list := List.push(newCustomer, list);
    //             return true;
    //         };
    //         case (null) { return false };
    //     };
    // };

    public func updateCaptchaServed(_customer : Principal, _key : Text) : async Result.Result<(Bool), Error> {
        var customer = map.get(_customer);
        switch (customer) {
            case (?u) {
                var oldKey = Array.find<SiteKey>(u.siteKeys, func item = item.key == _key);
                switch (oldKey) {
                    case (?k) {
                        var newKey : SiteKey = {
                            key = k.key;
                            captchaServed = k.captchaServed +1;
                            captchaVerified = k.captchaVerified;
                            captchaFailed = k.captchaFailed;
                        };
                        var newKeys = Array.filter(
                            u.siteKeys,
                            func(item : SiteKey) : Bool {
                                return item.key != k.key;
                            },
                        );
                        var newKeysFinal = Array.append(newKeys, [newKey]);
                        var newCustomer : Customer = {
                            id = u.id;
                            name = u.name;
                            internetIdentity = u.internetIdentity;
                            siteKeys = newKeysFinal;
                        };
                        map.put(_customer, newCustomer);
                        list := List.filter(
                            list,
                            func(item : Customer) : Bool {
                                return item.internetIdentity != _customer;
                            },
                        );
                        list := List.push(newCustomer, list);
                        return #ok(true);

                    };
                    case (null) { #err(#NotFound) };
                };
            };
            case (null) { #err(#NotFound) };
        };
    };

    public func updateCaptchaVerified(_customer : Principal, _key : Text, _answer : Bool) : async Result.Result<(Bool), Error> {
        var customer = map.get(_customer);
        switch (customer) {
            case (?u) {
                var oldKey = Array.find<SiteKey>(u.siteKeys, func item = item.key == _key);
                switch (oldKey) {
                    case (?k) {
                        if (_answer == true) {
                            var newKey : SiteKey = {
                                key = k.key;
                                captchaServed = k.captchaServed;
                                captchaVerified = k.captchaVerified +1;
                                captchaFailed = k.captchaFailed;
                            };
                            var newKeys = Array.filter(
                                u.siteKeys,
                                func(item : SiteKey) : Bool {
                                    return item.key != k.key;
                                },
                            );
                            var newKeysFinal = Array.append(newKeys, [newKey]);
                            var newCustomer : Customer = {
                                id = u.id;
                                name = u.name;
                                internetIdentity = u.internetIdentity;
                                siteKeys = newKeysFinal;
                            };
                            map.put(_customer, newCustomer);
                            list := List.filter(
                                list,
                                func(item : Customer) : Bool {
                                    return item.internetIdentity != _customer;
                                },
                            );
                            list := List.push(newCustomer, list);
                            return #ok(true);
                        } else {
                            var newKey : SiteKey = {
                                key = k.key;
                                captchaServed = k.captchaServed;
                                captchaVerified = k.captchaVerified;
                                captchaFailed = k.captchaFailed +1;
                            };
                            var newKeys = Array.filter(
                                u.siteKeys,
                                func(item : SiteKey) : Bool {
                                    return item.key != k.key;
                                },
                            );
                            var newKeysFinal = Array.append(newKeys, [newKey]);
                            var newCustomer : Customer = {
                                id = u.id;
                                name = u.name;
                                internetIdentity = u.internetIdentity;
                                siteKeys = newKeysFinal;
                            };
                            map.put(_customer, newCustomer);
                            list := List.filter(
                                list,
                                func(item : Customer) : Bool {
                                    return item.internetIdentity != _customer;
                                },
                            );
                            list := List.push(newCustomer, list);
                            return #ok(true);
                        };
                    };
                    case (null) { #err(#NotFound) };
                };
            };
            case (null) { #err(#NotFound) };
        };
    };

    system func preupgrade() {
        mapEntries := Iter.toArray(map.entries());
        
        // list := List.push(map.vals(), list);
    };

    system func postupgrade() {
        map := HashMap.fromIter<Principal, Customer>(
            mapEntries.vals(),
            1,
            Principal.equal,
            Principal.hash,
        );

    };
};
