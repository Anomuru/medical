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

    const [name,setName] = useState<string>("")
    const [isChanging,setIsChanging] = useState(false)


    useEffect(() =>{
        if (changedData && Object.keys(changedData).length) {
            setName(changedData.name)
            setIsChanging(true)
        }
    },[changedData])




    const dispatch = useAppDispatch()




    const onChangeName = (e: string) => {
        setName(e)
    };





    const onSubmit = (e: Event) => {

        const data = new FormData()

        e.preventDefault()


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


                <Input value={name} onChange={onChangeName}   name={"asds"} />

                <div className={cls.btn}>


                    <Button type={"success"} id={"form"} >Add</Button>
                </div>

            </Form>




        </div>
    );
};

