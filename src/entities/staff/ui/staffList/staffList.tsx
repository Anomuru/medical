import {useCallback} from 'react';
import classNames from "classnames";

import {Table} from "shared/ui/table";
import {Staff} from "../../model/types/staffSchema";

import cls from "./staffList.module.sass";

interface StaffListProps {
    currentTableData: Staff[],
    onDelete: (arg: number) => void
}

export const StaffList: React.FC<StaffListProps> = ({currentTableData, onDelete}) => {

    const renderList = useCallback(() => {
        return currentTableData.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>
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
                    <td>{item.phone}</td>
                    <td>
                        <i
                            className={classNames(
                                "fas fa-times",
                                cls.staffPage__delete
                            )}
                            onClick={() => onDelete(item.id)}
                        />
                    </td>
                </tr>
            )
        })
    }, [currentTableData])

    return (
        <div className={cls.staffList}>
            <Table>
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Staff Name</th>
                    <th>Age</th>
                    <th>Contact Number</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {renderList()}
                </tbody>
            </Table>
        </div>
    )
}