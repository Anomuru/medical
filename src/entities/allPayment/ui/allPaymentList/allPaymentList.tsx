import {FC, useCallback} from 'react';
import {Table} from "shared/ui/table";
import cls from "./allPaymentList.module.sass";
import {useNavigate} from "react-router";
import {IAllPayment} from "../../model/types/allPaymentSchema";




interface IPatientListProps {
    data?: IAllPayment[],
    setActiveDeleteItem: (item: IAllPayment) => void,
    setActiveDelete: (arg: boolean) => void
    setActiveEdit: (arg: boolean) => void
    setActiveEditItem: any,

}



export const AllPaymentList: FC<IPatientListProps> = (
    {data ,
        setActiveDeleteItem ,
        setActiveDelete,
        setActiveEditItem,
        setActiveEdit

    }) => {

    const navigate = useNavigate()

    const render = useCallback(() => {
        return data?.map((item, index) => {
            return (

                <tr>
                    {
                        !item.deleted &&
                        <>
                            <td>{index + 1}</td>
                            <td onClick={() => navigate(`../staff/profile/${item.id}`)}>
                                <div className={cls.item}>
                                    <div className={cls.item__info}>
                                        <h3>{item.user}</h3>
                                        <p>{item.user}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{item.date}</td>

                            <td>
                                <div onClick={() => {
                                    setActiveEditItem(item)
                                    setActiveEdit(true)
                                }} style={{background: "#edfaec"}} className={cls.check}>
                                    {item.payment_type?.payment_type}
                                </div>
                            </td>
                            <td>{item.amount}</td>
                            <td>
                                <div onClick={() => {
                                    setActiveDeleteItem(item)
                                    setActiveDelete(true)
                                }} style={{background: "#FAECEC"}} className={cls.check}>
                                    <i style={{color: "#FF0000"}} className="fas fa-times"/>
                                </div>
                            </td>
                        </>
                    }

                </tr>
            )
        })
    }, [data])

    return (
        <Table>
            <thead>
            <tr>
                <th>№</th>
                <th>Имя и фамилия</th>
                <th>Дата оплаты</th>
                <th>Оплата</th>
                <th>Тип оплаты</th>
                <th>Сумма</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {render()}

            </tbody>
        </Table>
    );
}
