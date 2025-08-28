import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

export const Rating = ({value}) => {
    const starCount=5;
  
    const stars=Array.from({length:starCount},(index)=><FaStar color='grey' key={index}/>);
    //const stars=Array(5).fill().map((index)=><FaStar color='grey' key={index} />)
    let i;
    for(i=0;i<value;i++)
    {
        stars[i]=<FaStar key={i} color='yellow' />;
    }
    if(value%1!=0){
        stars[i-1]=<FaStarHalfAlt key={i} color='yellow' />
    }
  return (
    <div className="flex gap-1">
      {stars}
    </div>
  )
}


// export const Rating = ({ value }) => {
//   const starCount = 5;
//   const stars = [];

//   for (let i = 1; i <= starCount; i++) {
//     if (value >= i) {
//       stars.push(<FaStar key={i} color="yellow" />);
//     } else if (value >= i - 0.5) {
//       stars.push(<FaStarHalfAlt key={i} color="yellow" />);
//     } else {
//       stars.push(<FaStar key={i} color="grey" />);
//     }
//   }

//   return <div className="flex gap-1">{stars}</div>;
// };
