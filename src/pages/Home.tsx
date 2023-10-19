import { useEffect, useState } from "react";
import { IProduct } from "../interfaces";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [productPerPage, setProductsPerPage] = useState(10);
  const [toggleDropDown, setToggelDropDown] = useState(false);

  useEffect(() => {
    handleFetchProducts();
  }, [curPage, productPerPage]);

  /** ---> fetching data from api */
  const handleFetchProducts = async () => {
    const limit = productPerPage;
    const skip = curPage * limit - limit;
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await res.json();
    setProducts(data.products);
    setTotalPages(Math.ceil(data.total / productPerPage));
  };

  const handlePrevPage = () => {
    if (curPage > 1) {
      setCurPage((prev) => --prev);
    }
  };
  const handleNextPage = () => {
    if (curPage < totalPages) {
      setCurPage((prev) => ++prev);
    }
  };

  return (
    <div>
      <div className="w-full p-5  flex justify-center gap-5">
        <h2 className="text-xl font-bold ">Products Data for More Info</h2>
        <div className="relative justify-center items-center">
          <span
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
            onClick={() => setToggelDropDown((prev) => !prev)}
          >
            Product per page
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </span>

          <div
            id="dropdownHover"
            className={`z-10 ${
              toggleDropDown ? "" : "hidden"
            }  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-10`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownHoverButton"
            >
              {[...Array(13)].map((_, idx) => {
                if (idx > 6)
                  return (
                    <li
                      onClick={() => {
                        setProductsPerPage(idx);
                        setToggelDropDown(false);
                      }}
                    >
                      <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                        {idx}
                      </span>
                    </li>
                  );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-5xl min-w-[50rem] pb-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              const { id, title, price, brand, category } = item;
              return (
                <tr
                  key={id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                >
                  <td className="px-6 py-4">{id}</td>
                  <th
                    scope="row"
                    className=" font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                  >
                    <NavLink
                      to={`/product/${id}`}
                      state={item}
                      className={" flex  px-6 py-4"}
                    >
                      {title}
                    </NavLink>
                  </th>
                  <td className="px-6 py-4">{brand}</td>
                  <td className="px-6 py-4">{category}</td>
                  <td className="px-6 py-4">${price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full mt-5 flex ">
          <div className="mx-auto">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li onClick={handlePrevPage} className="cursor-pointer">
                <span className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Previous
                </span>
              </li>
              {[...Array(totalPages)].map((_, idx) => {
                return (
                  <li
                    className="cursor-pointer"
                    onClick={() => setCurPage(idx + 1)}
                  >
                    <span
                      className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-${
                        curPage === idx + 1 ? "700" : "800"
                      } dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                      {idx + 1}
                    </span>
                  </li>
                );
              })}

              <li onClick={handleNextPage} className="cursor-pointer">
                <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Next
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
