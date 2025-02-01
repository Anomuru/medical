import React, {FC} from "react";
import cls from "./analysisContainer.module.sass"



interface IItem {
    id: number,
    name: string,
    color: string,
    size: string
}

interface IAnalysisContainerProps {
    data?: IItem[]
    setActiveEdit: (arg: boolean) => void
    setActiveEditItem: any,

}

export const AnalysisContainer: FC<IAnalysisContainerProps> = ({data, setActiveEdit, setActiveEditItem}) => {


    const renderData = () => {
        return data?.map(item => (
            <div className={cls.wrapper__box}>
                <div className={cls.wrapper__box_header}>
                    <div className={cls.wrapper__box_header_box}>
                        <span className={cls.wrapper__box_header_title}>{item.name}</span>
                        <div className={cls.wrapper__box_header_name}>
                            Container nomi
                        </div>
                    </div>

                    <div onClick={() => {
                        setActiveEdit(true)
                        setActiveEditItem(item)
                    }} className={cls.wrapper__box_header_edit}>
                        <i className={"fas fa-edit"}/>
                    </div>

                </div>

                <ul className={cls.wrapper__box_list}>
                    <li>Hajm : <div>{item.size}</div></li>
                    <li>Rang : <div
                        style={{width: "2rem", height: "2rem", background: item.color, borderRadius: "50%"}}></div></li>
                </ul>


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

