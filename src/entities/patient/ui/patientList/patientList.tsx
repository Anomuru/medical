import {FC, useCallback} from 'react';

import {Table} from "shared/ui/table";

import cls from "./patientList.module.sass";
import {IPatient} from "../../model/patientSchema";
import {useNavigate} from "react-router";



interface IPatientListProps {
    data?: IPatient[],
    setActiveDeleteItem: (item: IPatient) => void,
    setActiveDelete: (arg: boolean) => void

}

export const PatientList: FC<IPatientListProps> = ({data , setActiveDeleteItem , setActiveDelete}) => {



    const navigate = useNavigate()

    const render = useCallback(() => {
        return data?.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td onClick={() => navigate(`../staff/profile/${item.id}`)}>
                        <div className={cls.item}>
                            <img className={cls.item__image} src="" alt=""/>
                            <div className={cls.item__info}>
                                <h3>{item.surname}</h3>
                                <p>{item.name}</p>
                            </div>
                        </div>
                    </td>
                    <td>{item.age}</td>
                    <td>{item.phone_number}</td>
                    <td>
                        <div className={cls.check}>
                            {item.status ? <i className="fa-solid fa-check"/> : <i className={`fa-solid fa-xmark ${cls.red}`}/>}
                        </div>
                    </td>
                    {!item.deleted && <td>
                        <div onClick={() => {
                            setActiveDeleteItem(item)
                            setActiveDelete(true)
                        }} style={{background: "#FAECEC"}} className={cls.check}>
                            <i style={{color: "#FF0000"}} className="fas fa-times"/>
                        </div>
                    </td>}
                </tr>
            )
        })
    }, [data])

    return (
        <Table>
            <thead>
            <tr>
                <th>№</th>
                <th>Имя пациента</th>
                <th>Возраст</th>
                <th>Контактный номер</th>
                <th>Оплаченный</th>
                <th>Удалить</th>
            </tr>
            </thead>
            <tbody>
            {render()}

            </tbody>
        </Table>
    );
}
