const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");


//=================================
//             Favorite
//=================================


router.post('/favoriteNumber', (req,res)=>{

    //mongoDB에서 favorite 숫자를 받아온다.
    Favorite.find({ movieId: req.body.movieId})
            .exec((err, info)=>{
                if(err) return res.status(400).send(err)
                // 그 다음에 프론트에 다시 숫자를 보내준다.
                res.status(200).json({success:true, favoriteNumber: info.length})
            })
})


router.post('/favorited', (req,res)=>{

    //mongoDB에서 favorite 숫자를 받아온다.
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom})
            .exec((err, info)=>{
                if(err) return res.status(400).send(err)
                // 그 다음에 프론트에 다시 숫자를 보내준다.
                let result= false;
                if(info.length !== 0){
                    result = true;
                }
                    

                res.status(200).json({success:true, favorited : result})
            })
})



module.exports = router;
