const multer=require("multer")
const path=require("path")
const crypto=require("crypto")

//disk storage
//setting file path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  //settin file name
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, name) {
      const fn=name.toString("hex")+path.extname(file.originalname)
        cb(null,fn)
    })
  }
})

const upload = multer({ storage: storage })

//create upload variable and then upload it
module.exports=upload;
