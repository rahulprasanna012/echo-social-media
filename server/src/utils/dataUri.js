import DatauriParser  from "datauri/parser.js"

import path from "path"

const parser=new DatauriParser()

export const toDataUri=(file)=>{

   

    const ext= path.extname(file.originalname).toString();
    return parser.format(ext,file.buffer).content


}