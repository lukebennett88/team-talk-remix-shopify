import type { LoaderFunction } from "remix";
import { json, Link, useLoaderData } from "remix";
import invariant from "tiny-invariant";

import { PRODUCTS_QUERY, SINGLE_PRODUCT_QUERY } from "~/queries";
import { formatCurrency } from "~/utils/format-currency";
import { shopifyClient } from "~/utils/shopify-client";

type LoaderData = {
  product: NonNullable<
    typeof SINGLE_PRODUCT_QUERY["___type"]["result"]["productByHandle"]
  >;
  relatedProducts: typeof PRODUCTS_QUERY["___type"]["result"]["products"]["edges"];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { handle } = params;
  invariant(handle, "Product handle not found");

  const [singleProductResponse, relatedProductsResponse] = await Promise.all([
    await shopifyClient({
      operation: SINGLE_PRODUCT_QUERY,
      variables: { handle },
    }),
    await shopifyClient({
      operation: PRODUCTS_QUERY,
      variables: { first: 5 },
    }),
  ]);

  const product = singleProductResponse.data.productByHandle;
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  const relatedProducts = relatedProductsResponse.data.products.edges
    .filter(({ node }) => node.handle !== handle)
    .slice(0, 4);

  return json<LoaderData>({
    product,
    relatedProducts,
  });
};

export default function ProductPage() {
  const { product, relatedProducts } = useLoaderData<LoaderData>();

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-24 lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images.edges[0].node.transformedSrc}
                alt={product.images.edges[0].node.altText || ""}
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  {product.tags[0]} &middot; Updated{" "}
                  <time dateTime={product.updatedAt}>
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </time>
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{product.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 py-3 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Pay{" "}
                {formatCurrency(
                  product.priceRange.minVariantPrice.amount,
                  product.priceRange.minVariantPrice.currencyCode
                )}
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border bg-white py-3 px-8 text-base font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Preview
              </button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">License</h3>
              <p className="mt-4 text-sm text-gray-500">
                {license.summary}{" "}
                <a
                  href={license.href}
                  className="font-medium text-gray-900 hover:text-gray-700"
                >
                  Read full license
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mx-auto mt-24 max-w-2xl sm:mt-32 lg:max-w-none">
            <div className="flex items-center justify-between space-x-4">
              <h2 className="text-lg font-medium text-gray-900">
                Customers also viewed
              </h2>
              <a
                href="#"
                className="whitespace-nowrap text-sm font-medium text-gray-600 hover:text-gray-500"
              >
                View all<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
              {relatedProducts.map(({ node }) => (
                <div key={node.id} className="group relative">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={node.images.edges[0].node.transformedSrc}
                      alt={node.images.edges[0].node.altText || ""}
                      className="object-cover object-center group-hover:opacity-75"
                    />
                    <div
                      className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <div className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                        View Product
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                    <h3>
                      <Link to={`/products/${node.handle}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {node.title}
                      </Link>
                    </h3>
                    <p>
                      {formatCurrency(
                        product.priceRange.minVariantPrice.amount,
                        product.priceRange.minVariantPrice.currencyCode
                      )}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{node.tags[0]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const license = {
  href: "#",
  summary:
    "For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.",
};
