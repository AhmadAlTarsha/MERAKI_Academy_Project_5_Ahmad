import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import { GetAllPosts } from "../../Services/APIS/Posts/GetAllPosts";
import { setPosts } from "../../Services/Redux/Posts/index";
import { useEffect, useState } from "react";



const Home = () => {
  const [categories, setCategories] = useState([]);
  const limit = 3;
  const dispatch = useDispatch();
  const select = useSelector((state) => {
    return {
      post: state.post.post,
    };
  });

  useEffect(() => {
    GetAllPosts()
      .then((res) => {
        console.log(select);
        dispatch(setPosts(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {select?.post.map((newPost) => {
        return (
          <Post userName={newPost.user.fullName} body={newPost.description} />
        );
      })}
    </>
    // <div>
    //   {/* <p className="text-3xl font-bold underline">
    //     Lorem Ipsum is simply dummy text of the printing and typesetting
    //     industry. Lorem Ipsum has been the industry's standard dummy text ever
    //     since the 1500s, when an unknown printer took a galley of type and
    //     scrambled it to make a type specimen book. It has survived not only five
    //     centuries, but also the leap into electronic typesetting, remaining
    //     essentially unchanged. It was popularised in the 1960s with the release
    //     of Letraset sheets containing Lorem Ipsum passages, and more recently
    //     with desktop publishing software like Aldus PageMaker including versions
    //     of Lorem Ipsum.
    //   </p> */}

    // </div>
  );
};

export default Home;
