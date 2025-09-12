import multer from "multer";

const storage=multer.memoryStorage();

const fileFilter=(req,file,cb)=>{
   
    

    const allowed=["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif"];

    if (allowed.includes(file.mimetype)) cb(null,true)
    else cb(new Error("Only image files are allowed (jpg, png, webp, gif)"),false)

}

export const upload=multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 10 * 1024 * 1024 
    },
})