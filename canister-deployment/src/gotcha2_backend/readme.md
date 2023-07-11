# Motoko Customers Actor Documentation

This is the documentation for the `Customers` actor in Motoko.

## Data Types

- **SiteKey**

    A type that includes a unique site key and counters for different CAPTCHA states.

    ```motoko
    public type SiteKey = {
        key : Text;
        captchaServed : Nat;
        captchaVerified : Nat;
        captchaFailed : Nat;
    };
    ```

- **Customer**

    A type that includes a unique ID, name, Internet Identity, and a list of associated site keys.

    ```motoko
    public type Customer = {
        id : Nat;
        name : Text;
        internetIdentity : Principal;
        siteKeys : [SiteKey];
    };
    ```

- **Error**

    Enum for error types.

    ```motoko
    type Error = {
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
    };
    ```

## Functions

- **init**

    Initialize with a predefined set of customers and site keys.

    ```motoko
    public func init()
    ```

- **whoami**

    Returns the Principal ID of the caller.

    ```motoko
    public shared (msg) func whoami() : async Principal
    ```

- **addCustomer**

    Adds a new customer. The function returns `#err(#NotAuthorized)` if the caller is anonymous, `#err(#AlreadyExists)` if the customer already exists, or `#ok("Successful")` if the addition is successful.

    ```motoko
    public shared (msg) func addCustomer(n : Text, id : Text, key : Text) : async Result.Result<(Text), Error>
    ```

- **addSiteKeys**

    Adds new site keys to an existing customer. The function returns `#err(#NotFound)` if the customer does not exist.

    ```motoko
    public func addSiteKeys(id : Text, _key : Text) : async Result.Result<([SiteKey]), Error>
    ```

- **getSiteKeys**

    Returns the site keys associated with a given customer ID. The function returns `#err(#NotFound)` if the customer does not exist.

    ```motoko
    public func getSiteKeys(id : Text) : async Result.Result<([SiteKey]), Error>
    ```

- **getCustomer**

    Returns a specific customer based on the provided ID. The function returns `#err(#NotFound)` if the customer does not exist.

    ```motoko
    public query func getCustomer(_id : Text) : async Result.Result<(Customer), Error>
    ```

- **getCustomers**

    Returns an array of all customers.

    ```motoko
    public query func getCustomers() : async [Customer]
    ```

- **deleteCustomer**

    Deletes a customer based on their ID.

    ```motoko
    public func deleteCustomer(id : Principal)
    ```

- **updateCaptchaServed**

    Increments the `captchaServed` counter for a specific customer and site key. The function returns `#err(#NotFound)` if the customer or site key does not exist.

    ```motoko
    public func updateCaptchaServed(_customer : Principal, _key : Text) : async Result.Result<(Bool), Error>
    ```

- **updateCaptchaVerified**

    Based on a provided response, increments either the `captchaVerified` or `captchaFailed` counter for a specific customer and site key. The function returns `#err(#NotFound)` if the customer or site key does not exist.

    ```motoko
    public func updateCaptchaVerified(_customer : Principal, _key : Text, _answer : Bool) : async Result.Result<(Bool), Error>
    ```

## System Functions

- **preupgrade**

    This function is automatically called before an upgrade, providing an opportunity to persist data.

    ```motoko
    system func preupgrade()
    ```

- **postupgrade**

    This function is automatically called after an upgrade, providing an opportunity to restore persisted data.

    ```motoko
    system func postupgrade()
    ```





# Motoko Captcha Actor Documentation

This is the documentation for the `Captcha` actor in Motoko.

## Data Types

- **Error**

    Enum for error types.

    ```motoko
    type Error = {
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
    };
    ```

## Stable Variables

- **sessionsEntries**

    A list of session entries.

    ```motoko
    stable var sessionsEntries : [(Text, [(Float, Text)])] = [];
    ```

- **_customerLinks**

    A list of links associated with customers.

    ```motoko
    private stable var _customerLinks : [(Principal, [Text])] = [];
    ```

- **links**

    A list of IPFS links.

    ```motoko
    private stable var links : [Text] = ["https://gotcha.infura-ipfs.io/ipfs/QmRtw37DRfygDwamd7MHDtfkheKDmaSzNrrmPb9JMqUAYb", "https://gotcha.infura-ipfs.io/ipfs/Qmc4M5VZdehb5rroGNeEEw4V6kunadVf6nMdoubXfHXhv6"];
    ```

## Functions

- **setCustomerCanister**

    Sets a new customer canister.

    ```motoko
    public func setCustomerCanister(canisterId : Text)
    ```

- **generate**

    Generates two random numbers and an IPFS link based on the provided blob and id.

    ```motoko
    public query func generate(blob : Text, id : Text) : async (Nat, Nat, Text)
    ```

- **addSession**

    Adds a new session with an id, principal, and solution.

    ```motoko
    public func addSession(id : Text, principal : Text, solution : Float) : async ?[(Float, Text)]
    ```

- **getSessions**

    Returns all sessions.

    ```motoko
    public query func getSessions() : async [(Text, [(Float, Text)])]
    ```

- **checkCaptcha**

    Checks if the provided solution and id match an existing session.

    ```motoko
    public query func checkCaptcha(sol : Float, id : Text) : async Bool
    ```

- **addIpfs**

    Adds a new IPFS link.

    ```motoko
    public func addIpfs(link : Text) : async [Text]
    ```

- **customerUpload**

    Uploads a link on behalf of the customer.

    ```motoko
    public shared (msg) func customerUpload(link : Text)
    ```

- **getCustomerLinks**

    Returns the links associated with a given customer ID.

    ```motoko
    public query func getCustomerLinks(id : Text) : async ?[Text]
    ```

- **getIpfs**

    Returns the first IPFS link.

    ```motoko
    public query func getIpfs() : async Text
    ```

- **captchaServed**

    Invokes the `updateCaptchaServed` method on the customer canister.

    ```motoko
    public func captchaServed(_customer : Text, _key : Text) : async Result.Result<(Bool), Error>
    ```

- **captchaVerified**

    Invokes the `updateCaptchaVerified` method on the customer canister.

    ```motoko
    public func captchaVerified(_customer : Text, _key : Text, _answer : Bool) : async Result.Result<(Bool), Error>
    ```

## System Functions

- **preupgrade**

    This function is automatically called before an upgrade, providing an opportunity to persist data.

    ```motoko
    system func preupgrade()
    ```

- **postupgrade**

    This function is automatically called after an upgrade, providing an opportunity to restore persisted data.

    ```motoko
    system func postupgrade()
    ```
