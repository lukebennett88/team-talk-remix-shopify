export function Header() {
  return (
    <header className="mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
      <div className="border-b border-gray-200 px-4 sm:px-0">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1">
            <a href="/">
              <span className="sr-only">Digital Design Assets</span>
              <svg
                className="h-8 w-8 text-purple-600"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M31.3207 5.40445C30.9569 5.4229 30.5906 5.43224 30.2222 5.43224C24.7583 5.43224 19.7742 3.37813 15.9999 0C12.2256 3.378 7.24157 5.43202 1.77778 5.43202C1.40938 5.43202 1.04316 5.42269 0.679341 5.40423C0.23592 7.11732 0 8.91393 0 10.7656C0 20.7061 6.79879 29.0587 16 31.4269C25.2012 29.0587 32 20.7061 32 10.7656C32 8.91401 31.7641 7.11747 31.3207 5.40445ZM16 27.2641C22.9654 25.0149 28 18.4736 28 10.7656C28 10.2819 27.9803 9.80343 27.9417 9.33081C23.542 8.93766 19.4628 7.41836 15.9998 5.06562C12.5369 7.41824 8.45792 8.93745 4.05834 9.33059C4.01972 9.80328 4 10.2819 4 10.7656C4 18.4736 9.03462 25.0149 16 27.2641Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
