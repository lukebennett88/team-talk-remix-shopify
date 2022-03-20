export default function Index() {
  return (
    <main className="mt-24 px-4 sm:mt-32">
      <Hero />
      <Products />
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

function Products() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8">
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {staticProducts.map((product) => (
          <a key={product.id} className="group" href="/products/annuals">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
              <img
                src={product.imageSrc}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
                alt={product.imageAlt}
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
            <p className="mt-1 text-sm italic text-gray-500">
              {product.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

const staticProducts = [
  {
    id: 1,
    name: "Focus Paper Refill",
    href: "#",
    price: "$13",
    description: "3 sizes available",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 2,
    name: "Focus Card Holder",
    href: "#",
    price: "$64",
    description: "Walnut",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg",
    imageAlt: "Paper card sitting upright in walnut card holder on desk.",
  },
  {
    id: 3,
    name: "Focus Carry Case",
    href: "#",
    price: "$32",
    description: "Heather Gray",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg",
    imageAlt:
      "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
  },
];
