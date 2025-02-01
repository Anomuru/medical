import React, {FC, memo, useCallback} from 'react';

import cls from "./analysisPackage.module.sass";


interface IItem {
    id: number,
    name: string,

}

interface IAnalysisContainerProps {
    data?: IItem[]
    setActiveEdit: (arg: boolean) => void
    setActiveEditItem: any,

}

export const AnalysisPackage: FC<IAnalysisContainerProps> = memo(({data, setActiveEdit, setActiveEditItem}) => {

    console.log(data)
    const renderData = () => {
        return data?.map(item => (
            <div className={cls.wrapper__box}>
                <div className={cls.wrapper__box_header}>
                    <div className={cls.wrapper__box_header_box}>
                        <span className={cls.wrapper__box_header_title}>{item.name}</span>
                        <div className={cls.wrapper__box_header_name}>
                            Paket nomi
                        </div>
                    </div>

                    <div
                        onClick={() => {
                            setActiveEdit(true)
                            setActiveEditItem(item)
                        }}
                        className={cls.wrapper__box_header_edit}>
                        <i className={"fas fa-edit"}/>
                    </div>

                </div>


            </div>
        ))
    }


    return (
        <div className={cls.wrapper}>
            {renderData()}
        </div>
    );
})
