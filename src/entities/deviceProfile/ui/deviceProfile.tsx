import React, {useCallback, useEffect, useMemo, useState} from 'react';
import cls from "./deviceProfile.module.sass";
import {Box} from "shared/ui/box";
import deviceImg from "shared/assets/images/device.png";
import deviceIcon from "shared/assets/icon/device.png";
import {Table} from "shared/ui/table";
import {Pagination} from "features/pagination";
import {Input} from "shared/ui/input";
import {useDispatch, useSelector} from "react-redux";
import {
    deviceAnalisThunk,
    deviceProfileThunk,
    deviceProfileUsersThunk
} from "entities/deviceProfile/model/thunk/deviceProfileThunk";
import {getProfile, getProfileUsers} from "entities/deviceProfile/model/selector/deviceProfileSelector";
import classNames from "classnames";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Button} from "shared/ui/button";
import {useNavigate, useParams} from "react-router";
import {ConfirmModal} from "../../../shared/ui/confirm";
import {headers, useHttp} from "../../../shared/api/base";

import {useDropzone} from "react-dropzone";
import {deviceProfileActions, deviceProfileReducer} from "../model/slice/deviceProfileSlice";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {workTableReducer} from "../../workTable";
import {deviceListActions} from "../../deviceList";


interface IList {
    id: number,
    name: string,
    surname: string,
    user_analysis: string
}

interface IDeviceUserResponse {
    count: number;
    next?: string;
    previous?: string;
    results?: IList[];
}

const reducers: ReducersList = {
    deviceProfileSlice: deviceProfileReducer,

    // userSlice:
};

export const DeviceProfile = () => {


    const [currentPage, setCurrentPage] = useState<number>(1)
    const pageSize = useMemo(() => 10, [])
    const [userId, setUserId] = useState<string>("")
    const [portal, setPortal] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [ip, setIp] = useState<string>('')
    const [img, setImg] = useState<string>('')

    const formData = new FormData()

    const navigate = useNavigate()

    const [files, setFiles] = useState<any>(null);
    const [currentFiles, setCurrentFiles] = useState<any>(null);


    const [activeDelete, setActiveDelete] = useState<boolean>(false)


    const dispatch: any = useDispatch()
    const getData: any = useSelector(getProfile)
    //@ts-ignore
    const getUsers = useSelector(getProfileUsers) as IDeviceUserResponse
    const {id} = useParams()
    const {request} = useHttp()

    useEffect(() => {
        // @ts-ignore
        dispatch(deviceProfileThunk(id))
        // @ts-ignore
        dispatch(deviceProfileUsersThunk(id))
    }, [id])

    useEffect(() => {

        // @ts-ignore
        if (userId) dispatch(deviceAnalisThunk(userId))
    }, [userId])

    const onClick = (portal: boolean) => {
        setPortal(!portal)
        console.log(portal)
    }


    const onEditModal = (e: React.MouseEvent) => {


        formData.append("img", files[0])

        formData.append("name", name)
        if (ip) formData.append("ip_address", ip)


        e.preventDefault()
        console.log(files[0], name, ip)

        request({
            url: `device/crud/update/${id}/`,
            method: "PATCH",
            body: formData,
            headers: headers()
        })
            .then(res => {
                dispatch(deviceListActions.onEditDevice({id: id, data: res}))
                dispatch(deviceProfileActions.onEditName(res))
                console.log(res)
                setPortal(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onDelete = () => {


        request({
            url: `device/crud/delete/${id}/`,
            method: "DELETE",
            headers: headers()
        })
            .then(res => {
                dispatch(deviceListActions.onDeleteDevice(id))
                navigate(-1)

                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    }

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });
    const renderPatientsData = useCallback(() => {
        return getUsers?.results?.map((item, index) => (
            <tr onClick={() => setUserId(item?.user_analysis)} className={cls.profileContainer__leftSight__arounder__head__users}>
                <td>{index + 1}</td>
                <td>
                    <div className={cls.profile}>
                        <img className={cls.profile__img} src="" alt=""/>
                        <div className={cls.profile__info}>
                            <p className={cls.profile__title}>
                                {item?.name} {item?.surname}
                            </p>
                        </div>
                    </div>
                </td>
            </tr>
        ))
    }, [getUsers])


    return (
       <DynamicModuleLoader reducers={reducers}>
           <div className={cls.profileContainer}>
               <div className={cls.profileContainer__leftSight}>
                   <Box extraClass={cls.profileContainer__leftSight__deviceBox}>
                       <div className={cls.profileContainer__leftSight__deviceBox__content}>
                           <div className={cls.profileContainer__leftSight__deviceBox__content__imgBox}>
                               <img className={cls.profileContainer__leftSight__deviceBox__content__imgBox__img}
                                    src={getData?.img || deviceImg} alt=""/>
                           </div>
                           <h1 className={cls.profileContainer__leftSight__deviceBox__content__text}>
                               <img src={deviceIcon} alt=""/>
                               {getData?.name}</h1>
                       </div>
                       <i onClick={() => {
                           onClick(portal)
                       }} className={classNames("fas fa-list", cls.colorsEd)}/>
                       {getData?.can_delete &&
                           <i onClick={() => setActiveDelete(true)} className={classNames("fas fa-trash", cls.colors)}/>}
                   </Box>
                   <h1 className={cls.profileContainer__leftSight__content}>Patients</h1>
                   <div className={cls.profileContainer__leftSight__arounder}>
                       <Table>
                           <thead className={cls.profileContainer__leftSight__arounder__head}>
                           <tr>
                               <th>Number</th>
                               <th>Name/Surname</th>
                           </tr>
                           </thead>
                           <tbody>
                           {renderPatientsData()}
                           </tbody>
                       </Table>
                       <Pagination
                           totalCount={getUsers?.count}
                           onPageChange={setCurrentPage}
                           currentPage={currentPage}
                           pageSize={pageSize}
                       />
                   </div>
               </div>
               <Box extraClass={cls.profileContainer__rightContainer}>
                   <h1 className={cls.profileContainer__rightContainer__content}>Analiz</h1>
                   <h1 className={cls.profileContainer__rightContainer__content}>Standart</h1>
                   <div className={cls.profileContainer__rightContainer__analizBox}>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                           name="oxygen"
                           placeholder="7.56-7.80"
                           title="Oksigen (O₂) miqdori"/>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                           name="heartCount"
                           placeholder="80-100 mmHg"
                           title="pH darajasi"/>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                           name="heartCount"
                           placeholder="80-100 mmHg"
                           title="Positive End-Expiratory Pressure"/>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                           name="heartCount"
                           placeholder="80-100 mmHg"
                           title="Tidal hajm (VT)"/>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                           name="heartCount"
                           placeholder="80-100 mmHg"
                           title="Karbondioksid (CO₂)"/>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                           name="heartCount"
                           placeholder="80-100 mmHg"
                           title="Nafas olish tezligi (RR)"/>
                   </div>
                   <div className={cls.profileContainer__rightContainer__nameBox}>
                       <h1 className={cls.profileContainer__rightContainer__nameBox__content}>
                           Javoblari
                       </h1>
                       <h1 className={cls.profileContainer__rightContainer__nameBox__content}>
                           John Smith
                       </h1>
                   </div>
                   <div className={cls.profileContainer__rightContainer__analizCurrentBox}>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizCurrentBox__disabledInput}
                           name="oxygen"
                           placeholder="7.56-7.80"
                           title="Oksigen (O₂) miqdori"/>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizCurrentBox__disabledInput}
                           name="heartCount"
                           placeholder="80-100 mmHg"
                           title="pH darajasi"/>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizCurrentBox__disabledInput}
                           name="heartCount"
                           placeholder="80-100 mmHg"
                           title="Positive End-Expiratory Pressure"/>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizCurrentBox__disabledInput}
                           name="heartCount"
                           placeholder="80-100 mmHg"
                           title="Tidal hajm (VT)"/>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizBox__disabledInput}
                           name="heartCount"
                           placeholder="80-100 mmHg"
                           title="Karbondioksid (CO₂)"/>
                       <Input
                           extraClass={cls.profileContainer__rightContainer__analizCurrentBox__disabledInput}
                           name="heartCount"
                           placeholder="80-100 mmHg"
                           title="Nafas olish tezligi (RR)"/>
                   </div>
               </Box>
               <Modal extraClass={cls.profileContainer__modal} active={portal} setActive={setPortal}>
                   <Form extraClass={cls.profileContainer__modal__form}>
                       <div {...getRootProps({className: cls.dropzone})}>
                           <input  {...getInputProps()}/>

                           {!files ? <div className={cls.editDrop}>
                                   <i className={classNames("fas fa-upload",)}></i>
                               </div> :

                               <img style={{width: "30rem", height: "20rem"}}
                                    src={files?.map((item: { preview: any; }) => item?.preview)}
                                    alt=""/>

                           }
                       </div>
                       <Input title={"Change name"} extraClass={cls.profileContainer__modal__form__input} name={"name"}
                              onChange={setName}/>
                       <Input title={"Change address"} extraClass={cls.profileContainer__modal__form__input}
                              name={"ip_address"} onChange={setIp}/>
                       <Button extraClass={cls.profileContainer__modal__form__input} onClick={onEditModal}>Apply
                           changes</Button>
                   </Form>
               </Modal>
               <ConfirmModal setActive={setActiveDelete} active={activeDelete} type={"delete"}
                             title={"Rostanham o'chirmoqchimisiz"} onClick={onDelete}/>
           </div>

       </DynamicModuleLoader>
    );
};