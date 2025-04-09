import {Table} from "shared/ui/table";
import {Input} from "shared/ui/input";
import cls from "./groupList.module.sass"
import {FC, useEffect, useState} from "react";
import {GroupListInterface} from "entities/group/model/type/groupListType";
import {Select} from "shared/ui/select";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchGroupListData} from "entities/group/model/thunk/groupListThunk";
import {Button} from "shared/ui/button";
import {useSelector} from "react-redux";
import {getGroupListItemData} from "entities/group/model/selector/groupListSelector";


interface GroupListProps {
    groupListData: GroupListInterface[] | undefined,
    activeCheck?: number | string,
    activeItem?: number | string[],
    setActiveItem?: (arg: any) => void
}

const data = [

    {name: "zakaz", label: "Заказ"},
    {name: "konteyner", label: "Контейнер"},

    {name: "patient", label: "Пациент"},
    {name: "code", label: "Код"},
    {name: "research", label: "Исследование"},
    {name: "point", label: "Пункт забора"},
    {name: "workPlace", label: "Раб.место"},
    {name: "cito", label: "CITO"},
    {name: "pointReg", label: "Пункт Регистрации"},

    {name: "date", label: "Дата Регистрации"},
]


export const GroupList: FC<GroupListProps> = ({groupListData, activeCheck , activeItem, setActiveItem}) => {

    const branchId = localStorage.getItem("branch_id")
    const dispatch = useAppDispatch()

    useEffect(() => {

        if (branchId || activeCheck) {

            if (activeCheck === 4 || activeCheck === "4") {
                dispatch(fetchGroupListData({branchId: Number(branchId)}))
            }else {
                dispatch(fetchGroupListData({branchId: Number(branchId), type: activeCheck}))
            }
        }

    } , [activeCheck])

    return (
        <div className={cls.group}>
            <div className={cls.group__list}>
                <TopList groupListData={groupListData} setActiveItem={setActiveItem} activeItem={activeItem}/>
            </div>

            <div>
                <FooterList/>
            </div>

        </div>
    );
};


const TopList = ({groupListData, setActiveItem, activeItem}: {
    groupListData: GroupListInterface[] | undefined,
    setActiveItem: any
    activeItem: any
}) => {


    const [active, setActive] = useState("")


    const [selectedRow, setSelectedRow] = useState<number | null>(null);



    const handleRowClick = (id: number) => {
        setSelectedRow(prev => (prev === id ? null : id));
    };



    const toggleItem = (itemId: number) => {
        setActiveItem((prev: number[]) => {
            const isExist = prev.includes(itemId);
            return isExist ? prev.filter(id => id !== itemId) : [...prev, itemId];
        });
    };

    const toggleAll = () => {
        if (groupListData) {


            const enabledItems = groupListData.filter(item => item.status !== "black");

            if (activeItem.length === enabledItems.length) {
                setActiveItem([]);
            } else {
                setActiveItem(enabledItems.map(item => item.id));
            }
        }
    };

    const renderData = () => {
        return groupListData?.map(item => {

            function hexToRgb(hex: number | undefined | string) {
                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                if (typeof hex === "string") {
                    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                        return r + r + g + g + b + b;
                    });
                }

                if (typeof hex === "string") {
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                }
                // @ts-ignore
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            }


            const color1rgb = hexToRgb(item?.status ? item?.status : "#ffffff");


            // @ts-ignore
            const brightness = Math.round(((parseInt(color1rgb?.r) * 299) +
                // @ts-ignore
                (parseInt(color1rgb?.g) * 587) +
                // @ts-ignore
                (parseInt(color1rgb?.b) * 114)) / 1000);


            const style = {
                backgroundColor: item?.status ? item?.status : "white",
                color: brightness > 125 ? "black" : "white",
                height: "4rem",
                width: ".6rem",
                borderRadius: "0 10px 10px 0"
            }
            const isSelected = selectedRow === item.id;
            const rowStyle = {
                backgroundColor: isSelected ? item.status : "white",
                color: isSelected ? "white" : "black",
                cursor: "pointer",
            };





            return (
                // @ts-ignore
                <tr onClick={() => handleRowClick(item.id)} style={rowStyle} key={item.id}>
                    {/*// @ts-ignore*/}
                    <div style={style}></div>
                    <td>
                        <Input
                            extraLabelClass={cls.table__input}
                            name="checkbox"
                            type="checkbox"

                            disabled={item?.status === "black"}
                            checked={activeItem.includes(item.id)}
                            onChange={() => toggleItem(item.id)}
                        />
                    </td>
                    <td>{item.id}</td>
                    <td>{item?.analysis?.container?.name}</td>

                    <td>{item?.surname} {item?.name}</td>
                    <td>{item.analysis.code_name}</td>
                    <td>{item.analysis.packet?.name}</td>
                    <td>{item.start_branch}</td>
                    <td>{item.end_branch}</td>
                    <td>
                        <Input
                            extraLabelClass={cls.table__input}
                            name="checkbox"
                            type="checkbox"
                        />
                    </td>
                    <td>{item.analysis.device?.name}</td>
                    <td>{item.date}</td>

                </tr>
            )

        });
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
            case "workPlace" :
                return <Select setSelectOption={() => console.log("dsda")}/>
            case "pointReg" :
                return <Select setSelectOption={() => console.log("dsda")}/>
        }
    }

    return (
        <div className={cls.table__main}>
            <Table extraClass={cls.table__item}>
                <thead>
                <tr>
                    <th></th>
                    <th>
                        <Input
                            extraLabelClass={cls.table__input}
                            name="checkbox"
                            type="checkbox"
                            checked={


                                groupListData?.filter(item => item.status !== "black").length === activeItem.length &&
                                activeItem.length > 0
                            }
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

                <tbody>
                {renderData()}
                </tbody>

            </Table>

        </div>
    );
};


const FooterList = () => {

    const data = useSelector(getGroupListItemData)


    const renderData = () => {
        return data?.map((item, index) => {
            return (
                <tr>
                    <td>{item.name}</td>
                    <td>{item?.name}</td>
                    <td>{item?.name}</td>
                    <td>{item?.name}</td>
                    <td>{item?.name}</td>
                    <td>{item?.name}</td>
                    <td>{item?.name}</td>
                    <td>{item?.name}</td>
                    <td>{item?.name}</td>
                    <td>{item?.name}</td>

                </tr>
            )
        })
    }


    const renderFooterData  = ()=> {
        return [1 ,2 ,3 ,4 ,5 ,6 , 7].map((item, index) => {
            return (
                <tr>
                    <td>dasd</td>
                    <td>dasd</td>
                </tr>
            )
        })
    }

    return (
        <div className={cls.footer}>
            <div className={cls.footer__table}>
                <div className={cls.footer__table_left}>
                    <h2 className={cls.footer__title}>{data?.map(item => item.name)}</h2>

                    <Table>
                        <thead>
                        <tr>
                            <th>Код</th>
                            <th>Тест</th>
                            <th>Знак</th>
                            <th>Ед.Изм</th>
                            <th>Норма</th>
                            <th>Результат</th>
                            <th>Постановка</th>
                            <th>Статус</th>
                            <th>Группа</th>
                            <th>Инструмент</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderData()}
                        </tbody>
                    </Table>
                </div>
                <div className={cls.footer__table_right}>
                    <h2>Инфо о заказе </h2>

                    <div className={cls.footer__table_right_info}>
                        <Table>
                            <thead>
                            <tr>
                                <th>Прочее </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {renderFooterData()}
                            </tbody>
                        </Table>

                    </div>
                </div>
            </div>
        </div>
    )
}
