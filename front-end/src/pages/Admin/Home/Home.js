import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../Services/Redux/auth";
import { GetUser } from "../../../Services/APIS/User/GetUser";

const AdminHome = () => {
  const select = useSelector((state) => {
    return {
      user: state.auth,
    };
  });
  const dispatch = useDispatch();
  //   console.log("SELECT === >", select);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("localUser")) ?? {};
    
    return () => {
      GetUser(localUser.id)
        .then((res) => {
          console.log("RESULT ===>", res);
        })
        .catch((err) => {
          console.error("ERROR ===>", err);
        });
    };
  }, []);

  return <div>AdminHome</div>;
};

export default AdminHome;
