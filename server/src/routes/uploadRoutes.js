const path = require('path');
const express = require('express');
const multer = require('multer');
const { runInNewContext } = require('vm');
const router = express.Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Validation Error: Images Only! (jpg/jpeg/png/webp)'));
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
router.post('/', upload.single('image'),(req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const cleanPath = req.file.path.replace(/\\/g, '/');
  
  res.json({
    message: 'Image Uploaded Successfully',
    imageUrl: `http://localhost:5000/${cleanPath}`
  });
});
module.exports = router;
const storage=multer.diskStorage({
  destination(req,file,cb){
    cb(null,path.join(__dirname,'..','uploads'));
  },
  filename(req,file,cb){
    cb(null,'${file.filename}-${Date.now()}${path.extname(file.originalname)}');
  },
});
function checkFileType(file,cb){
  const filestypes=/jpeg|jpg|webp/;
  const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimwtypw=filetypes.test(file.mimetype);
  if(extname && mimetype){
    return cb(null,true);
  }
  else{
    cb(new Error('validation Error:Only uploaded a correct format of image like jpg,png,webp,jpeg etc'));
  }
}
const upload=multer({
  storage,fileFilter:function(req,file,cb){ checkFileType(file,cb);},
});
router.post('/',upload.single('image'),(req,res)=>{
  if(!req.file){return res.status(400).json({message:"No file uploaded"});
  }
  const cleanPath=req.file.path.replace(/\\/g,'/');
  res.json({message:"Image uploaded successfully", imageUrl:'https://localhost:500/${cleanPath}'
  });
});
const storage=multer.diskStorage({
  destination(req,file,cb){
    cb(null,path.join(__dirname,'..','uploads'));
  },
  filename(req,file,cb){
    cb(null,path.join(__dirname,'..','uploads'));
  },
  filename(req,file,cb){
    cb(null,'${file.filename}-${Date.now()}${path.extname(file.originalname)}');
  },
});
function checkFileType(file,cb){
  const filestypes=/jpg|jpeg|png/;
  const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype=filetypes.test(file.mimetype);
  if(extname && mimetype){
    return cb(null,true);
  }else{
    cb(new Error("validation Error:Only uploaded a correct fromat of image jpg,png jpeg,webp etc"));
  }
}
const upload=multer({
  storage,fileFilter:function(req,file,cb){
    checkFileType(file,cb);
  },
});
router.post('/',upload.single('image'),(req,res)=>{
  if(!req,file){return res.status(400).json({message:"No file uploaded"});}
const cleanPath=req.file.path.replace(/\\/g,'/');
res.json({message:"Image uploaded succesfully",imageUrl:"https://localhost:500/${cleanPath}"
});
});
const storage=multer.diskStorage({
  destination(req,file,cb){
    cb(null,path.join(__dirname,'..','uploads'));
  },
  filename(req,file,cb){
    cb(null,path.join(__dirname,'..','uploads'))
  },
  filename(req,file,cb){
    cb(null,'${file.filename}-${Date.now()}${path.extname(file.originalname)}');
  },
});
function checkFileType(file,cb){
  const filestypes=/jpg|jpeg|png/;
  const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype=filetypes.test(file.mimetype);
  if(extname && mimetype){
    return cb(null,true);
  }
  else{
    cb(new Error("Validation Error:only uploaded a correct fromat of image jpg,png,webp etc"));
  }
}
const upload=multer({
  storage,fileFilter:function(req,file,cb){
    checkFileType(file,cb);
  },
});
router.post('/',upload.single('image'),(req,res)=>{
  if(!req,file){
    return res.status(400).json({message:"No file uploaded"});
  }
  const cleanPath=req.file.path.replace(/\\/g,'/');
  res.json({message:"Image uploaded succesfully",imageUrl:"https://localhost:500/${cleanPath}"});
});
const storage=multer.diskStorage({
  
})