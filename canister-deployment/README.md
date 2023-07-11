# Gotcha_Phase2_Dev Deployment

## For Local deployment

### Start ICP Network
Start the ICP network and deploy the canisters and frontend
```
dfx start --background --clean
dfx deploy
```
Links to deployments will be consoled.

### Initialize Canisters
Then following canister methods need to be called for initialization.
In gotcha_backend:
```
init()
```
In Captcha Canister, pass the gotcha_baackend canister Id:
```
setCustomerCanister("ryjl3-tyaaa-aaaaa-aaaba-cai")
```
