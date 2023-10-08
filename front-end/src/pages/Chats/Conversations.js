import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationRedux } from "../../Services/Redux/Chats";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";

const Conversations = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const conversationsSelector = useSelector((state) => {
    return {
      conversations: state.chats.conversations,
    };
  });

  useEffect(() => {
    dispatch(getConversationRedux())
      .then((result) => {})
      .catch((err) => {
        console.log("CONVERSATIONS ERROR ===> ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // console.log("SELECTOR ====> ", conversationsSelector?.conversations);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="overflow-auto flex flex-col justify-center items-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <>
          <div>
            {conversationsSelector?.conversations?.map((conversation) => (
              <Button
                key={conversation?.id}
                buttonName={`${conversation.customer.full_name}`}
                buttonClassName={`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
                onClick={() => {
                  navigate(
                    `/chats/${conversation?.id}/${conversation?.customer?.id}`
                  );
                }}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Conversations;
