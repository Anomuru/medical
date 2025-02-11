import {FC, memo} from 'react';



import cls from "./allPaymentHeader.module.sass";



interface IPatientFilter {
    filter?: {name: string , status: string}[],
    setActiveType: (arg: string) => void,
    activeType: string
}


export const AllPaymentHeader: FC<IPatientFilter> = memo(({filter , setActiveType , activeType}) => {


    // const handleCheckboxChange = (status: string) => {
    //     setActiveType((prev: string) => (prev === status ? null : status));
    // };

    // const filterRender = () => {
    //     return filter?.map((item, index) => (
    //         <div key={index} className={cls.header__filter_item}>
    //             <input
    //                 type="checkbox"
    //                 checked={activeType === item.status}
    //                 onChange={() => handleCheckboxChange(item.status)}
    //                 name="checkbox"
    //             />
    //             {item.name}
    //         </div>
    //     ));
    // };



    return (
        <div className={cls.header}>
            <h1>Список платежей</h1>
            <div className={cls.header__filter}>
            </div>
        </div>
    );
})
