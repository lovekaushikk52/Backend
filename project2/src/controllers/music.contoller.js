const musicModel = require("../models/music.model");
const albumModel=require("../models/album.model")
const { uploadFile } = require("../services/storage.service");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id,
    });

    res.status(201).json({
      message: "music created successfully",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
}

async function createAlbum(req,res){

    const {title,musics}=req.body;

    const album=await albumModel.create({
      title,
      artist:req.user.id,
      musics:musics,
    })

  res.status(201).json({
    message:"album created successfully",
    album:{
      id:album.id,
      title:album.title,
      artist:album.artist,
      musics:album.musics,
     }
   })
  }

async function getAllMusics(req,res){
  const musics=await musicModel
  .find()
  //.skip(1) //skips number of songs
  .limit(2)
  .populate("artist","username email") //populate will give all data related to artist

  res.status(200).json({
    message:"music fetched successfully",
    musics:musics
  })
}

async function getAllAlbums(req,res){

  const albums=await albumModel.find().select("title artist").populate("artist","username email").populate("musics")

  res.status(200).json({
    message:"albums fetched successfully",
    albums:albums,
  })
}

async function getAlbumById(req,res){

  const albumId=req.params.albumId;

  const album=await albumModel.findById(albumId).populate("artist","username email").populate("musics")

  return res.status(200).json({
    message:"album fetched successfully",
    album:album
  })
}

module.exports = { createMusic,createAlbum,getAllMusics,getAllAlbums,getAlbumById };











// async function createMusic(req, res) {

//     console.log("COOKIES:", req.cookies);

//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({
//             message: "token not found"
//         });
//     }

//     try {

//         console.log("TOKEN:", token);
//         console.log("SECRET EXISTS:", !!process.env.JWT_SECRET);

//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         console.log("DECODED TOKEN:", decoded);

//         if (decoded.role !== "artist") {
//             return res.status(403).json({
//                 message: "you are not allowed to create a music"
//             });
//         }

//         const { title } = req.body;
//         const file = req.file;

//         console.log("FILE:", file);

//         if (!file) {
//             return res.status(400).json({
//                 message: "music file is required"
//             });
//         }

//         const result = await uploadFile(
//             file.buffer.toString("base64")
//         );

//         const music = await musicModel.create({
//             uri: result.url,
//             title,
//             artist: decoded.id
//         });

//         return res.status(201).json({
//             message: "music created successfully",
//             music: {
//                 id: music._id,
//                 uri: music.uri,
//                 title: music.title,
//                 artist: music.artist
//             }
//         });

//     } catch (err) {

//         console.log("ERROR:", err);

//         return res.status(401).json({
//             message: "unauthorized",
//             error: err.message
//         });
//     }
// }

// module.exports={createMusic}