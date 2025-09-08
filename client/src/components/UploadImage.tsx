import  React, { type ReactElement } from "react";


type UploadImageProps={
    id:string,
    image?:ReactElement,
    title:string,
    classAdd?:string|undefined
}
const UploadImage:React.FC<UploadImageProps> = ({id,image,title,classAdd }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`flex items-center font-medium gap-2 border border-purple-200 text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md cursor-pointer ${classAdd}`}
      >
        {image}

        <span>{title}</span>
      </label>

      <input type="file" className="hidden" id={id} />
    </div>
  );
};

export default UploadImage;
