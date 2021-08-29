import React,{ useEffect, useState } from 'react'
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

    const [favoriteNumber, setfavoriteNumber] = useState(0);
    const [favorited, setfavorited] = useState(false);


    const movieId = props.movieId;
    const userFrom = props.userFrom
    const movieTitle=props.movieInfo.title;
    const moviePost=props.movieInfo.backdrop_path;
    const movieRunTime=props.movieInfo.runtime;

    const variables = {
        movieId : movieId,
        userFrom : userFrom,
        movieTitle : movieTitle,
        moviePost : moviePost,
        movieRunTime : movieRunTime
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

    const onClickFavorite = () => {
        
        if(favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                 .then(response=>{
                    if(response.data.success){
                        setfavoriteNumber(favoriteNumber - 1);
                        setfavorited(!favorited);
                    } else {
                        alert('Favorite 리스트에서 지우는걸 실패했습니다.');
                    }
                 })
        } else {
            Axios.post('/api/favorite/AddToFavorite', variables)
                 .then(response=>{
                    if(response.data.success){
                        setfavoriteNumber(favoriteNumber + 1);
                        setfavorited(!favorited);
                    } else {
                        alert('Favorite 리스트에서 추가하는걸 실패했습니다.');
                    }
                 })
        }

    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{favorited ? "Not Favorited": "Add to Favorite"} {favoriteNumber} </Button>
        </div>
    )
}

export default Favorite
