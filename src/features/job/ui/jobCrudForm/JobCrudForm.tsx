import React, {useRef, useState} from 'react';
import {Input} from "shared/ui/input";


import cls from "./JobCrudForm.module.sass"

import imgIcon from "shared/assets/icon/img.svg"
import {Form} from "shared/ui/form";
import {Button} from "shared/ui/button";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {addJobThunk} from "features/job/model/thunk/addJobThunk";


export const JobCrudForm = () => {



    const [img,setImg] = useState("")
    const [name,setName] = useState<string>("")


    const inputRef = useRef<HTMLInputElement>(null)



    const dispatch = useAppDispatch()



    const onClickImg = () => {
        if (inputRef.current) {

            inputRef.current.click()
        }
    }


    const onChangeName = (e: string) => {
        setName(e)
    }







    const onSubmit = () => {

        const data = new FormData()



        data.append("img", img)
        data.append("name", name)

        dispatch(addJobThunk({data}))



    }




    return (
        <div className={cls.jobCrud}>
            <Form extraClass={cls.form}>
                <div className={cls.image} onClick={onClickImg}>
                    <input type="file" ref={inputRef}/>
                    {
                        img ? <img src={img} alt=""/> : <img src={imgIcon} alt=""/>
                    }

                </div>

                <Input onChange={onChangeName}   name={"asds"} />

                <div className={cls.btn}>


                    <Button  onClick={onSubmit}>Add</Button>
                </div>
            </Form>




        </div>
    );
};

