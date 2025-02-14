import React, {useState} from 'react';
import cls from "./workerProfile.module.sass"
import {Box} from "shared/ui/box";
import userImg from "shared/assets/images/woman.png"
import {Select} from "../../../shared/ui/select";
import increase from "shared/assets/icon/increase.png"
import dicrease from "shared/assets/icon/dicrease.png"
export const WorkerProfile = () => {

    const [selected, setSelected] = useState<string>()

    return (
        <div className={cls.profileBox}>
            <div className={cls.profileBox__leftSight}>
                <h1>Доброе утро <strong>Alexander Thomas!</strong></h1>
                <Box extraClass={cls.profileBox__leftSight__box}>
                    <div className={cls.profileBox__leftSight__box__wrapper}>
                        <h1 className={cls.profileBox__leftSight__box__wrapper__content}>Visits for today</h1>
                        <h1 className={cls.profileBox__leftSight__box__wrapper__number}>104</h1>
                        <div className={cls.profileBox__leftSight__box__wrapper__arounder}>
                            <Box extraClass={cls.profileBox__leftSight__box__wrapper__arounder__container}>
                                <h1 className={cls.profileBox__leftSight__box__wrapper__arounder__container__content}>New patients</h1>
                                <span className={cls.profileBox__leftSight__box__wrapper__arounder__container__span}>
                                    <h1 className={cls.profileBox__leftSight__box__wrapper__arounder__container__span__content}>40</h1>
                                    <span className={`${cls.profileBox__leftSight__box__wrapper__arounder__container__span__indicator} ${cls.increase}`}>
                                        51%
                                        <img className={cls.profileBox__leftSight__box__wrapper__arounder__container__span__indicator__img} src={increase} alt=""/>
                                    </span>
                                </span>
                            </Box>
                            <Box extraClass={cls.profileBox__leftSight__box__wrapper__arounder__container}>
                                <h1 className={cls.profileBox__leftSight__box__wrapper__arounder__container__content}>New patients</h1>
                                <span className={cls.profileBox__leftSight__box__wrapper__arounder__container__span}>
                                    <h1 className={cls.profileBox__leftSight__box__wrapper__arounder__container__span__content}>40</h1>
                                    <span className={`${cls.profileBox__leftSight__box__wrapper__arounder__container__span__indicator} ${cls.dicrease}`}>
                                        51%
                                        <img className={cls.profileBox__leftSight__box__wrapper__arounder__container__span__indicator__img} src={dicrease} alt=""/>
                                    </span>
                                </span>
                            </Box>
                        </div>
                    </div>
                    <img className={cls.profileBox__leftSight__box__userImg} src={userImg} alt=""/>
                </Box>
                <div className={cls.profileBox__leftSight__listBox}>
                    <div className={cls.profileBox__leftSight__listBox__patientListBox}>
                        <div className={cls.profileBox__leftSight__listBox__patientListBox__header}>
                            <h1 className={cls.profileBox__leftSight__listBox__patientListBox__header__content}>    Patient List</h1>
                            <Select
                                title={"Nimadir"}
                                setSelectOption={setSelected}
                                optionsData={[]}
                            />
                        </div>
                        <div className={cls.profileBox__leftSight__listBox__patientListBox__header}>
                            <div className={cls.profileBox__leftSight__listBox__patientListBox__header__wrapper}>
                                <span className={cls.profileBox__leftSight__listBox__patientListBox__header__wrapper__userName}>SM</span>
                                <div className={cls.profileBox__leftSight__listBox__patientListBox__header__wrapper__nameBox}>
                                    <h1>Stacy Mitchell</h1>
                                    <h3> Week Visit</h3>
                                </div>
                            </div>
                            <span className={cls.profileBox__leftSight__listBox__patientListBox__header__timeBox}>
                                9:15 AM
                            </span>
                        </div>
                    </div>
                    <div className={cls.profileBox__leftSight__listBox__injectionBox}>

                    </div>
                </div>

            </div>
            <div className={cls.profileBox__rightSight}>

            </div>
        </div>
    );
};

