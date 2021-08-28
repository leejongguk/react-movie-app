import React,{ useEffect } from 'react'
import Axios from 'axios';

function Favorite(props) {

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
                    
                 } else {
                     alert('숫자 정보를 가져오지 못했습니다.')
                 }
             })
        

    }, [])
    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite
