import React,{ useEffect, useState } from 'react'
import Axios from 'axios';

function Favorite(props) {

    const [favoriteNumber, setfavoriteNumber] = useState(0);
    const [favorited, setfavorited] = useState(false);


    const movieId = props.movieId;
    const userFrom = props.userFrom
    const movieTitle=props.movieInfo.title;
    const moviePost=props.movieInfo.backdrop_path;
    const movieRunTime=props.movieInfo.runtime;

    const variables = {
        movieId,
        userFrom
    }

    useEffect(() => {
        Axios.post('/api/favorite/favoriteNumber', variables)
             .then(response=>{
                 if(response.data.success){
                    // console.log(response.data);
                    setfavoriteNumber(response.data.favoriteNumber);
                 } else {
                     alert('숫자 정보를 가져오지 못했습니다.')
                 }
             })
             
        Axios.post('/api/favorite/favorited', variables)
             .then(response=>{
                 if(response.data.success){
                    // console.log('favorited',response.data);
                    setfavorited(response.data.favorited);

                 } else {
                     alert('favorited 정보를 가져오지 못했습니다.')
                 }
             })
        

    }, [])
    return (
        <div>
            <button>{favorited ? "Not Favorited": "Add to Favorite"} {favoriteNumber} </button>
        </div>
    )
}

export default Favorite
