import {useCallback} from 'react';
import classNames from "classnames";
import {useNavigate} from "react-router";

import {Table} from "shared/ui/table";
import {Staff} from "../../model/types/staffSchema";

import cls from "./staffList.module.sass";
import {useDispatch} from "react-redux";

interface StaffListProps {
    currentTableData?: Staff[],
    onDelete: (arg: boolean) => void,
    setActiveItem: (arg : any) => void
}

export const StaffList: React.FC<StaffListProps> = ({currentTableData, onDelete , setActiveItem}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const renderList = useCallback(() => {
        return currentTableData?.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td onClick={() => navigate(`profile/${item.id}`)}>
                        <div className={cls.profile}>
                            <img className={cls.profile__img} src={item.image} alt=""/>
                            <div className={cls.profile__info}>
                                <p className={cls.profile__title}>
                                    {item.name} {item.surname}
                                </p>
                                <span className={cls.profile__job}>{item.job}</span>
                            </div>
                        </div>
                    </td>
                    <td>{item.age}</td>
                    <td>{item.phone_number}</td>
                    <td>
                        <i
                            className={classNames(
                                "fa-solid fa-times",
                                cls.staffPage__delete
                            )}
                            onClick={() => {
                                onDelete(true)
                                setActiveItem(item)
                            }}
                        />
                    </td>
                </tr>
            )
        })
    }, [currentTableData, onDelete])

    return (
        <div className={cls.staffList}>
            <Table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Имя сотрудника</th>
                    <th>Возраст</th>
                    <th>Контактный номер</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                {renderList()}
                </tbody>
            </Table>
        </div>
    )
}
