# Headless Shopify with Remix

## How to set up GraphQL Playground

1. Go to: <https://studio.apollographql.com/sandbox/explorer/>
2. Click on the gear icon on the top left
3. Under Connection settings click the 'Edit' button
4. For the "Endpoint" enter the `API_URL` (example can be found in `.env.example`)
5. Under "Default header" enter
   1. Header key: `X-Shopify-Storefront-Access-Token`
   2. Value: `ACCESS_TOKEN` (example can be found in `.env.example`)
