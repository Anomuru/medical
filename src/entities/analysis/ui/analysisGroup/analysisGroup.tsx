import React, {FC} from "react";
import cls from "./analysisGroup.module.sass"


interface IItem {
    id: number,
    name: string,
}

interface IAnalysisGroupProps {
    data?: IItem[]
    setActiveEdit: (arg: boolean) => void
    setActiveEditItem: any,

}

export const AnalysisGroup: FC<IAnalysisGroupProps> = ({data, setActiveEdit, setActiveEditItem}) => {


    const renderData = () => {
        return data?.map(item => (
            <div className={cls.wrapper__box}>
                <div className={cls.wrapper__box_header}>
                    <div className={cls.wrapper__box_header_box}>
                        <span className={cls.wrapper__box_header_title}>{item.name}</span>
                        <div className={cls.wrapper__box_header_name}>
                            Группа 1
                        </div>
                    </div>

                    <div onClick={() => {
                        setActiveEdit(true)
                        setActiveEditItem(item)
                    }} className={cls.wrapper__box_header_edit}>
                        <i className={"fas fa-edit"}/>
                    </div>

                </div>



            </div>
        ))
    }

    const render = renderData()

    return (
        <div className={cls.wrapper}>

            {render}

        </div>
    );
};

