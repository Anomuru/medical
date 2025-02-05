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
import {useForm} from "react-hook-form";
import {getJobsThunk} from "../../../../entities/jobList/model/thunk/jobListThunk";


interface JobCrudFormProps {
    onSuccess: () => void
    changedData?:  JobSchema
}



export const JobCrudForm = ( {changedData,onSuccess}: JobCrudFormProps)=> {

    const [name,setName] = useState<string>("")
    const [isChanging,setIsChanging] = useState(false)
    const [client, setClient] = useState<boolean>(false)
    const {setValue, handleSubmit, register} = useForm()
    const handleCheckboxChange = () => {
        setClient(!client);
    };

    useEffect(() =>{
        if (changedData && Object.keys(changedData).length) {
            setName(changedData.name)
            setIsChanging(true)
            setClient(changedData.has_client)
        }
    },[changedData])
    console.log(changedData, 'ssdsdsds')




    const dispatch = useAppDispatch()




    const onChangeName = (e: string) => {
        setName(e)
    };





    const onSubmit = () => {
        const data = {
            name: name,
            has_client: client
        };
        if (isChanging && changedData) {

            dispatch(changeJobThunk( {data, id: changedData.id}))
        } else {
            dispatch(addJobThunk(data))
        }





        onSuccess()

    }






    return (
        <div className={cls.jobCrud}>
            <Form id={"form"} extraClass={cls.form}  onSubmit={handleSubmit(onSubmit)}>


                <Input register={register} value={name} onChange={onChangeName}   name={"asds"} />
                <div>
                    <label className={cls.label}>
                        Has client
                        <input
                            className={cls.inputs}
                            title={"Has client"}
                            name={"client"}
                            type={"checkbox"}
                            checked={client}
                            onChange={handleCheckboxChange}
                        />
                    </label>

                </div>

                <div className={cls.btn}>
                    {
                        changedData && isChanging ?
                            <Button type={"success"} id={"form"} >Edit</Button> :
                            <Button type={"success"} id={"form"} >Add</Button>
                    }

                </div>

            </Form>




        </div>
    );
};

