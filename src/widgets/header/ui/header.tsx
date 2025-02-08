import React, {useCallback, useEffect, useState} from 'react';
import classNames from "classnames";

import {Input} from "shared/ui/input";

import cls from "./header.module.sass";
import logo from "shared/assets/logo/medicalLogo.png";
import profileImage from "shared/assets/images/loginImage.png";
import {Select} from "../../../shared/ui/select";
import {useSelector} from "react-redux";
import {
    fetchBranchData,
    fetchLocationData,
    getBranchesData,
    getLocationsData,
    oftenUsedActions
} from "entities/oftenUsed";
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {getUserId, getUserRole, getUserName, getUserSurname} from "../../../entities/user";
import {useNavigate} from "react-router";
import {ROLES} from "shared/const/roles";

export const Header = () => {

    const dispatch = useAppDispatch()
    const navigation = useNavigate()
    const {fetchSelectedLocation, onBranch} = oftenUsedActions
    const [location, setLocation] = useState<number>()
    const [branch, setBranch] = useState<number>()

    useEffect(() => {
        dispatch(fetchLocationData())
    }, [])

    useEffect(() => {
        if (location) {
            dispatch(fetchBranchData({id: location}))
            dispatch(fetchSelectedLocation(location))
        }

    }, [location])

    useEffect(() => {
        if (branch)
            dispatch(onBranch(branch))
        console.log(branch, 'data')
    }, [branch])

    const branchData = useSelector(getBranchesData)
    const locationData = useSelector(getLocationsData)
    const userSurname = useSelector(getUserSurname)
    const userName = useSelector(getUserName)
    const userId = useSelector(getUserId)
    const userRole = useSelector(getUserRole)

    const getLocation = useCallback((arg: number) => setLocation(arg), [])
    const getBranch = useCallback((arg: number) => setBranch(arg), [])

    return (
        <div className={cls.header}>
            <img
                className={cls.header__logo}
                src={logo}
                alt=""
            />
            <div className={cls.setting}>
                {userRole === ROLES.mainAdmin && (
                    <>
                        <Select optionsData={locationData} title={"Location"} setSelectOption={getLocation}/>
                        <Select optionsData={branchData} title={"Branch"} setSelectOption={getBranch}/>
                    </>
                )}
                {/*<div className={cls.setting__search}>*/}
                {/*    <i className={classNames("fa-solid fa-search", cls.setting__icon)}/>*/}
                {/*    <Input extraClass={cls.setting__input} name={"search"}/>*/}
                {/*</div>*/}
                {/*<div className={cls.setting__notifications}>*/}
                {/*    <i className={classNames("fa-solid fa-bell", cls.setting__notification)}/>*/}
                {/*    <div className={cls.setting__newMessage}/>*/}
                {/*</div>*/}
                <div
                    onClick={() => navigation(`/platform/staff/profile/${userId}`, {replace: true})}
                    className={cls.profile}
                >
                    <img
                        className={cls.profile__image}
                        src={profileImage}
                        alt="profileImage"
                    />
                    <h2 className={cls.profile__surname}>{userSurname} {userName}</h2>
                </div>
            </div>
        </div>
    )
}
