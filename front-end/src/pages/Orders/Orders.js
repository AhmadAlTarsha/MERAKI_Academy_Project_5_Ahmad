import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOrders } from "../../Services/APIS/Orders/GetOrders";
import { setOrders } from "../../Services/Redux/Orders";
import { GetOrdersCustomer } from "../../Services/Redux/Orders/index";
import Pop_up from "../../components/Dialog_Modal/Pop-up";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { addConversationRedux } from "../../Services/Redux/Chats";
import { useNavigate } from "react-router";

const Orders = () => {
  const localUser = JSON.parse(localStorage.getItem("localUser")) ?? {};
  const navigate = useNavigate();
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

                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-center text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Order number
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Service Provider
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Review
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersSelect?.orders?.orders &&
                        ordersSelect?.orders?.orders?.map((order) => (
                          <tr
                            key={order?.id}
                            className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {order?.id}
                            </th>
                            <td className="px-6 py-4">
                              {order?.provider?.full_name}
                            </td>
                            <td className="px-6 py-4">{order?.review}</td>
                            <td className="px-6 py-4">{order?.status?.name}</td>
                            <td className="px-6 py-4">
                              <Button
                                buttonName={"Cancel"}
                                buttonClassName={`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
                                onClick={() => {}}
                              />

                              {localUser?.role === 3 && (
                                <Button
                                  buttonName={`Chat With ${order?.provider?.full_name}`}
                                  buttonClassName={`focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900`}
                                  onClick={() => {
                                    dispatch(
                                      addConversationRedux({
                                        providerId: order?.provider?.id,
                                        customerId: order?.customer?.id,
                                      })
                                    )
                                      .then((result) => {
                                        navigate(
                                          `/chats/${result?.payload?.conversation_id}/${order?.provider?.id}/${order?.provider?.full_name}`
                                        );
                                      })
                                      .catch((err) => {
                                        setIsError(true);
                                      })
                                      .finally(() => {
                                        setIsLoading(false);
                                      });
                                  }}
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  {/* {ordersSelect?.orders?.orders &&
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
                    ))} */}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Orders;
