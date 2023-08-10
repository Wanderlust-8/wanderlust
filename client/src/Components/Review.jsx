import React from "react";
import { fetchComents } from "../Redux/Comments/commentsActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./ReviewRating";


function Review({tour}) {
 const {id} = tour
 console.log('el id', id)
  // const {tourId} = reviews.id
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comentsList)

// console.log('en review', review)

console.log('coment review', comments)

const reviews = comments.filter(el => el.idPackage === id)



useEffect(() => {
  dispatch(fetchComents())
},[id])

// const yellowstars = [];

// for (let i = 0; i < reviews.calification; i++) {
//   yellowstars.push(
//     <RiStarSFill
//       key={i}
//       className="text-yellow-500 text-xl mr-1 inline-flex"
//     />
//   );
// }

// const arr = []
// if(typeof comments === 'object'){
//   arr.push(comments)
// } 


// const coments = arr.length > 0 ? arr : comments;

// console.log('coment array', comments)


  return (
    <>
      <div className="mb-2 mt-8 md:p-2 md:px-2 ">
        <h1 className="text-xl font-bold text-left fontPoppins">
          Opiniones de otros viajeros:
        </h1>
      </div>
      {reviews.length > 0 ? reviews.map((el, index) =>(
         <section key= {index} className="my-2  dark:text-gray-100 fontPoppins">
         <div className="container grid grid-cols-2 gap-4 items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
           <div className="flex flex-col max-w-sm mx-4 my-2 shadow-lg rounded-xl ">
             <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-verdeFooter">
               <p className="relative px-6 py-1 text-lg italic text-center text-gray-100">
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 512 512"
                   fill="currentColor"
                   className="w-8 h-8 text-green-600"
                 >
                   <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                   <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                 </svg>
                 {el.testimony ? el.testimony : "Muy buena experiencia! Lo recomiendo."}
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 512 512"
                   fill="currentColor"
                   className="absolute right-0 w-8 h-8 text-green-600"
                 >
                   <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                   <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                 </svg>
               </p>
             </div>
             <div className="flex flex-col items-center justify-center p-8 rounded-b-lg  text-gray-900">
               {el.User.avatar ? <img
                 src={el.User.avatar}
                 alt=""
                 className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full bg-gray-500 "
               /> : null}

               <p className="text-xl font-semibold leadi">{el.User.name ? el.User.name + ' '+ el.User.lastName : "Juan Perez"}</p>
               
               
               <p className="text-xs mt-2">Calificación que le da este viajero:</p>
              <span className="inline-flex">
               <StarRating rating={el.calification}/>
              </span>

               <p className="text-sm uppercase mt-2">{el.createdAt.split('T')[0].toString()}</p>
             </div>
           </div>
             </div>
           </section> 
      
      )) : (<div className="mb-10 mt-6">
        <span className="fontPoppins text-l font-semibold bg-295943-light p-2">Aún ningún viajero ha dejado su comentario, sé el primero! </span>
        
        </div>)}
    </>
  );
}
export default Review;

