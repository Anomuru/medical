import React from 'react';



interface CustomImgProps {
    img: File | string
}



const CustomImg = ({img} : CustomImgProps) => {
    if (typeof img === "string") {
        return <img src={img} alt=""/>;
    }


    return <img src={URL.createObjectURL(img)} alt=""/>;
};

export default CustomImg;