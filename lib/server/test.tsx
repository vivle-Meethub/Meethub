// import React, { useState } from 'react';
// import {useEffect} from "react";
// import axios from 'axios';

// const Test = () => {

//   const [items,setItems] = useState<any>([]);
//   const [hasMore,sethasMore] = useState(true);
//   const [page,setPage] = useState(2);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios({
//           method: 'get',
//           url: `http://localhost:3000/api/testAPI`,
//           timeout: 2000,
//         });
//         console.log(response.data);
//         setData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     fetchData();
//   }, []);
  
//       return(
//       <div>
//           <ul> 
//             {data && data.map((item:any) => (
//               <li key={item.id}>
//                 {item.title}
//                 <img alt='img' src={`https://firebasestorage.googleapis.com/v0/b/meethub-image.appspot.com/o/post-images%2F${item.img}?alt=media`}/>
//                 </li>
//               ))}
//         </ul>
//       </div>
//       )
// }





// export default Test
