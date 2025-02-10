import {FC, memo} from 'react';



import cls from "./patientHeader.module.sass";



interface IPatientFilter {
    filter?: {name: string , status: string}[],
    setActiveType: React.Dispatch<React.SetStateAction<string>>,
    activeType: string
}


export const PatientHeader: FC<IPatientFilter> = memo(({filter , setActiveType , activeType}) => {


    const handleCheckboxChange = (status: string) => {
        setActiveType((prev: string) => (prev === status ? "" : status));
    };

    const filterRender = () => {
        return filter?.map((item, index) => (
            <div key={index} className={cls.header__filter_item}>
                <input
                    type="checkbox"
                    checked={activeType === item.status}
                    onChange={() => handleCheckboxChange(item.status)}
                    name="checkbox"
                />
                {item.name}
            </div>
        ));
    };



    return (
        <div className={cls.header}>
            <h1>Patient list</h1>
            <div className={cls.header__filter}>
                {filterRender()}

            </div>
        </div>
    );
})
