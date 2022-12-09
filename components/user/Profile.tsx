import axios from "axios";
import {useEffect,useState } from "react";
import React from "react";
import Layout from "../../components/layout";
import PostDetail from "../../components/user/PostDetail";


const User = ({postId}:any) => {

    const [post,setPost] = useState();

    useEffect(() => {

        // const getPostDetail = async() => {

        //   try {
            
        //     const response = await axios.get(`/api/post/${postId}`,{
        //       method: 'get',
        //       timeout: 2000, 
        //     });
        //     console.log(response.data);
        //     setPost(response.data);
        //   } catch (error) {
        //     console.error(error);
        //   }
        // };
      
        // getPostDetail();
      }, []);

  return (
    <>
      <Layout>
      </Layout>
    </>
  );
};

export default User;
