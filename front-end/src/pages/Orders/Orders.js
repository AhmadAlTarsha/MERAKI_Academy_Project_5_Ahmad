import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOrders } from "../../Services/APIS/Orders/GetOrders";
import { setOrders } from "../../Services/Redux/Orders";
import { GetOrdersCustomer } from "../../Services/Redux/Orders/index";
import Pop_up from "../../components/Dialog_Modal/Pop-up";
import Loader from "../../components/Loader/Loader";

const Orders = () => {
  const [offset, setOffset] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const ordersSelect = useSelector((state) => {
    return {
      orders: state.orders.orders,
    };
  });

  useEffect(() => {
    dispatch(
      GetOrdersCustomer({
        limit: 3,
        offset,
        status: 0,
      })
    )
      .then((res) => {})
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleButtonClick = () => {
    setIsError("An error occurred.");
  };

  const handleCloseModal = () => {
    setIsError(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {isError ? (
            <Pop_up message={""} onClose={handleCloseModal} />
          ) : (
            <div className="container mx-auto mt-10">
              <div className="flex justify-center items-center shadow-md my-10">
                <div className="w-full bg-white px-10 py-10">
                  {/* Orders Number */}
                  <div className="flex justify-between border-b pb-8">
                    <h1 className="font-semibold text-2xl">Your Orders</h1>
                    <h2 className="font-semibold text-2xl">
                      {ordersSelect?.orders?.orders?.length} Orders
                    </h2>
                  </div>
                  {/* Orders Number */}

                  {/* Row */}
                  <div className="flex mt-10 mb-5">
                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                      Order number
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                      Service Provider
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                      Review
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                      Status
                    </h3>
                  </div>
                  {/* Row */}

                  {ordersSelect?.orders?.orders &&
                    ordersSelect?.orders?.orders?.map((order) => (
                      <div
                        key={order?.id}
                        className="flex justify-center items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                      >
                        <div className="flex justify-start w-2/5">
                          <h3 className="ml-10">{order?.id}</h3>
                        </div>

                        <div className="flex justify-center w-1/5">
                          <h3>{order?.provider?.full_name}</h3>
                        </div>

                        <span className="text-center w-1/5 font-semibold text-sm">
                          {order?.review}
                        </span>

                        <span className="text-center w-1/5 font-semibold text-sm">
                          {order?.status?.name}
                        </span>
                      </div>
                    ))}

                  {/* <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
          <svg
            className="fill-current mr-2 text-indigo-600 w-4"
            viewBox="0 0 448 512"
          >
            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
          </svg>
          Continue Shopping
        </a> */}
                </div>

                {/* <div id="summary" className="w-1/4 px-8 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Items 3</span>
          <span className="font-semibold text-sm">590$</span>
        </div>
        <div>
          <label className="font-medium inline-block mb-3 text-sm uppercase">
            Shipping
          </label>
          <select className="block p-2 text-gray-600 w-full text-sm">
            <option>Standard shipping - $10.00</option>
          </select>
        </div>
        <div className="py-10">
          <label
            for="promo"
            className="font-semibold inline-block mb-3 text-sm uppercase"
          >
            Promo Code
          </label>
          <input
            type="text"
            id="promo"
            placeholder="Enter your code"
            className="p-2 text-sm w-full"
          />
        </div>
        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
          Apply
        </button>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>$600</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
            Checkout
          </button>
        </div>
      </div> */}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Orders;
