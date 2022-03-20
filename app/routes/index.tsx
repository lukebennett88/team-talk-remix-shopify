import type { LoaderFunction } from "remix";
import { json, Link, useLoaderData } from "remix";

import { PRODUCTS_QUERY } from "~/queries";
import { formatCurrency } from "~/utils/format-currency";
import { shopifyClient } from "~/utils/shopify-client";

type LoaderData = {
  products: typeof PRODUCTS_QUERY["___type"]["result"]["products"]["edges"];
};

export const loader: LoaderFunction = async () => {
  const { data } = await shopifyClient({ operation: PRODUCTS_QUERY });
  return json<LoaderData>({ products: data.products.edges });
};

export default function Index() {
  const { products } = useLoaderData<LoaderData>();
  return (
    <main className="mt-24 px-4 sm:mt-32">
      <Hero />
      <Products products={products} />
    </main>
  );
}

function Hero() {
  return (
    <div className="mx-auto max-w-7xl text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
        Beautiful digital design assets
      </h1>
      <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
        Take your digital products to another level with our collection of UI
        kits, templates and icon sets. All our assets were carefully designed to
        work together beautifully. We have obsessed over every little detail,
        and we really believe it shows.
      </p>
      <div className="mx-auto mt-5 flex max-w-md justify-center md:mt-8">
        <div className="rounded-md shadow">
          <a
            href="#"
            className="flex w-full items-center justify-center divide-x divide-gray-600 rounded-md border border-transparent bg-gray-900 px-6 py-4 text-base font-medium text-white hover:bg-gray-700 md:text-lg"
          >
            <span className="pr-6">Get the bundle</span>
            <span className="pl-6">$199</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Products({ products }: { products: LoaderData["products"] }) {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8">
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map(({ node }) => (
          <Link key={node.id} className="group" to={`/products/${node.handle}`}>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
              <img
                src={node.images.edges[0].node.transformedSrc}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
                alt={node.images.edges[0].node.altText || ""}
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
              <h3>{node.title}</h3>
              <p>
                {formatCurrency(
                  node.priceRange.minVariantPrice.amount,
                  node.priceRange.minVariantPrice.currencyCode
                )}
              </p>
            </div>
            <p className="mt-1 text-sm italic text-gray-500">
              {node.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
