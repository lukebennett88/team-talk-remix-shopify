import { gql } from "@ts-gql/tag/no-transform";

export const SINGLE_PRODUCT_QUERY = gql`
  query singleProductQuery($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      updatedAt
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 1) {
        edges {
          node {
            id
            altText
            transformedSrc
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
` as import("../__generated__/ts-gql/singleProductQuery").type;

export const PRODUCTS_QUERY = gql`
  query productsQuery($first: Int = 6) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                id
                altText
                transformedSrc
              }
            }
          }
        }
      }
    }
  }
` as import("../__generated__/ts-gql/productsQuery").type;

export const CREATE_CHECKOUT_URL_MUTATION = gql`
  mutation createCheckoutUrlMutation($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
    }
  }
` as import("../__generated__/ts-gql/createCheckoutUrlMutation").type;
