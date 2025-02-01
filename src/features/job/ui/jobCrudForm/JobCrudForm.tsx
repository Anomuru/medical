import React, {useEffect, useRef, useState} from 'react';
import {Input} from "shared/ui/input";


import cls from "./JobCrudForm.module.sass"

import imgIcon from "shared/assets/icon/img.svg"
import {Form} from "shared/ui/form";
import {Button} from "shared/ui/button";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {addJobThunk} from "features/job/model/thunk/addJobThunk";
import {JobSchema} from "shared/types/oftenUsedTypes";
import CustomImg from "shared/ui/customImg/CustomImg";
import {changeJobThunk} from "features/job/model/thunk/changeJobThunk";


interface JobCrudFormProps {
    onSuccess: () => void
    changedData?:  JobSchema
}




export const JobCrudForm = ( {changedData,onSuccess}: JobCrudFormProps)=> {

    const [img,setImg] = useState<File | string>("")
    const [name,setName] = useState<string>("")
    const [isChanging,setIsChanging] = useState(false)



    const inputRef = useRef<HTMLInputElement>(null)



    useEffect(() =>{
        if (changedData && Object.keys(changedData).length) {
            setName(changedData.name)
            setImg(changedData.img)
            setIsChanging(true)
        }
    },[changedData])




    const dispatch = useAppDispatch()



    const onClickImg = () => {
        if (inputRef.current) {

            inputRef.current.click()
        }
    }


    const onChangeName = (e: string) => {
        setName(e)
    };

    const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImg(e.target.files[0]);
        }
    };




    const onSubmit = (e: Event) => {

        const data = new FormData()

        e.preventDefault()

        if (typeof img !== "string") {
            data.append("img", img)
        }

        data.append("name", name)



        if (isChanging && changedData) {

            dispatch(changeJobThunk({data,id: changedData.id}))
        } else {


            dispatch(addJobThunk({data}))
        }





        onSuccess()

    }






    return (
        <div className={cls.jobCrud}>
            <Form id={"form"} extraClass={cls.form}  onSubmit={onSubmit}>
                <div className={cls.image} onClick={onClickImg} >
                    <input type="file" ref={inputRef} onChange={onChangeImg} />
                    {
                        img ? <CustomImg img={img}/> : <img src={imgIcon} alt=""/>
                    }

                </div>

                <Input value={name} onChange={onChangeName}   name={"asds"} />

                <div className={cls.btn}>


                    <Button type={"success"} id={"form"} >Add</Button>
                </div>

            </Form>




        </div>
    );
};

