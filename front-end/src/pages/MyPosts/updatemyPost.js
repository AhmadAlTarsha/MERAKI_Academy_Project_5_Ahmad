import React, { useState ,useEffect} from 'react'
import Button from '../../components/Button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { UpdatePost } from '../../Services/APIS/Posts/Update_post';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPosts, GetPostsByUserId } from '../../Services/APIS/Posts/GetAllPosts';
import { GetCategories, GetSubCategoriesOnCategory } from '../../Services/APIS/Category/Get_Categories';
import { setCategories } from '../../Services/Redux/Category';
import { setPosts } from '../../Services/Redux/Posts';
import { setSubCategories } from '../../Services/Redux/Sub_Categories';


const className =
"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const UpdatemyPost = () => {
//  GetPostsByUserId()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {id}=useParams()
  const select = useSelector((state) => {
    return {
      post: state.post.post,
      comments: state.post.comments,
      categories: state.categories.categories,
      subCategories: state.subCategories.subCategories,
    }});
    const selectcategory = useSelector((state) => {
      return {
        categories: state?.categories?.categories?.categories,
        subcategories: state?.subCategories?.subCategories
      
        
        
      };
    });

    useEffect(() => {
      GetCategories(0, 0, 0)
        .then((result) => {
          dispatch(setCategories(result));
        })
        .catch((err) => {
         console.log(err);
          // console.error("ERROR GETING CATEGORIES ===> ".err);
        })
        
    }, []);
  

    // useEffect(() => {
      
    //     GetAllPosts(0, 0, 0)
    //       .then((res) => {
    //         console.log(res);
    //         dispatch(setPosts(res));
         
    //       })
    //       .catch((err) => {
    //       console.log(err);
    //       })
        
    // }, []);
    

const currentPost= select.post.filter((currentpost)=>{
  return currentpost.id==id
})
const currentCategory= selectcategory?.categories?.filter((currentcat)=>{
  return currentcat.id==currentPost[0].category_id


})

  const [updatePost,setUpdatePost]=useState({
   

  })

  const handleChange=(e)=>{
setUpdatePost({
  ...updatePost,
      [e.target.name]: e.target.name === "image" ? e.target.files[0] : e.target.value

})
  }
  return (
    <div><Input  onChange={(e)=>{
    handleChange(e)
    }} labelName={`current description :${currentPost[0]?.description} `}
    labelClassName={
      "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    }
    divClassName={""}
    name={"description"}
    type={"text"}
    inputClassName={className}
    placeHolder={"updeat your description "}/>
    <label>{`current category : ${currentCategory[0]?.name}`}</label>
    <br></br>
    <select  onClick={(e)=>{

             handleChange(e)
             GetSubCategoriesOnCategory(e?.target?.value)
             .then((result) => {
               // console.log(result);
               dispatch(setSubCategories(result));

             }).catch((err) => {
               console.log(err);
             })
            
            }} name={`category_id`}>
             
              <option disabled value="">update</option>
              {selectcategory?.categories?.map((sub_cat, i) => {
                return <option key={i} value={sub_cat?.id}>{sub_cat.name}</option>
              })}
            </select>
            <br></br>
            <label for="Subcategory">{`current sub_cat `}</label>
            <br></br>
            <select onClick={(e)=>{
              handleChange(e)
              console.log(e.target.value);
            }} name="sub_category_id">
          
                <option disabled value="">select sub_category</option>
              {selectcategory?.subcategories?.subCategories?.map((sub_cat, i) => {
                return <option key={i} value={sub_cat?.id}>{sub_cat.name}</option>
              })}</select>
    
      <Button buttonName={"update"} buttonClassName={className} onClick={(e)=>{


console.log(id);
//console.log(currentPost[0]);
console.log(select.post);
console.log(selectcategory.categories);
console.log(currentCategory);
console.log(updatePost);
e.preventDefault();
UpdatePost(id,updatePost)
      ;
       // navigate("/")
      }

      }/>
    </div>
  )
}

export default UpdatemyPost