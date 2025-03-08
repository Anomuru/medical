import {Table} from "shared/ui/table";
import {Input} from "shared/ui/input";
import cls from "./groupList.module.sass"
import {FC, useEffect, useState} from "react";
import {GroupListInterface} from "entities/group/model/type/groupListType";
import {Select} from "shared/ui/select";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchGroupListData} from "entities/group/model/thunk/groupListThunk";



interface GroupListProps {
    groupListData: GroupListInterface[] | undefined
}

const data = [
    {name: "zakaz", label: "Заказ"},
    {name: "konteyner", label: "Контейнер"},
    {name: "date", label: "Дата Регистрации"},
    {name: "patient", label: "Пациент"},
    {name: "code", label: "Код"},
    {name: "research", label: "Исследование"},
    {name: "point", label: "Пункт забора"},
]


export const GroupList: FC<GroupListProps> = ({groupListData}) => {
    const [activeItem, setActiveItem] = useState([])

    useEffect(() => {
        if (activeItem.length) {

        }
    }, [activeItem])

    return (
        <div>
            <TopList groupListData={groupListData} setActiveItem={setActiveItem} activeItem={activeItem}/>


        </div>
    );
};


const TopList = ({groupListData, setActiveItem, activeItem}: {
    groupListData: GroupListInterface[] | undefined,
    setActiveItem: any
    activeItem: any
}) => {
    const branchId = localStorage.getItem("branch_id")

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (branchId) dispatch(fetchGroupListData(Number(branchId)))
    }, [])


    const [active, setActive] = useState("")

    const toggleItem = (itemId: number) => {
        setActiveItem((prev: number[]) => {
            const isExist = prev.includes(itemId);
            return isExist ? prev.filter(id => id !== itemId) : [...prev, itemId];
        });
    };

    const toggleAll = () => {
        if (groupListData) {
            if (activeItem.length === groupListData.length) {
                setActiveItem([]);
            } else {
                setActiveItem(groupListData.map(item => item.id));
            }
        }
    };

    const renderData = () => {
        return groupListData?.map(item => (
            <tr key={item.id}>
                <td>
                    <Input
                        extraLabelClass={cls.table__input}
                        name="checkbox"
                        type="checkbox"
                        checked={activeItem.includes(item.id)}
                        onChange={() => toggleItem(item.id)}
                    />
                </td>
                <td>{item.request}</td>
                <td>{item?.analysis_details?.map(item => (
                    <>{item.analysis.container.name}</>
                ))}</td>
                <td>{item.date}</td>
                <td>{item.analysis_details.map(item => (
                    <>{item.surname} {item.name}</>
                ))}</td>
                <td>{item.analysis_details.map(item => (
                    <>{item.analysis.code_name}</>
                ))}</td>
            </tr>
        ));
    };


    const renderItem = () => {
        switch (active) {
            case "zakaz" :
                return <Select setSelectOption={() => console.log("dsda")}/>
            case "konteyner" :
                return <Select setSelectOption={() => console.log("dsda")}/>
            case "date" :
                return <Input name={"date"} type={"date"}/>
            case "patient" :
                return <Select setSelectOption={() => console.log("dsda")}/>
            case "code" :
                return <Select setSelectOption={() => console.log("dsda")}/>
            case "research" :
                return <Select setSelectOption={() => console.log("dsda")}/>
            case "point" :
                return <Select setSelectOption={() => console.log("dsda")}/>
        }
    }

    console.log(active)

    return (
        <div className={cls.table__main}>
            <Table extraClass={cls.table__item}>
                <thead>
                <tr>
                    <th>
                        <Input
                            extraLabelClass={cls.table__input}
                            name="checkbox"
                            type="checkbox"
                            checked={groupListData?.length === activeItem.length && activeItem.length > 0}
                            onChange={toggleAll}
                        />
                    </th>
                    {data.map(item => (
                        <th

                        >
                            <div
                                // @ts-ignore

                                onClick={() => setActive(prev => (prev === item.name ? null : item.name))}>{item.label}</div>
                            {active === item.name &&
                                <div className={cls.table__popup}>
                                    {renderItem()}
                                </div>
                            }

                        </th>

                    ))}
                </tr>
                </thead>
                <tbody>{renderData()}</tbody>
            </Table>

        </div>
    );
};
