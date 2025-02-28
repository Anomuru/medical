import {Select} from "shared/ui/select";
import {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router";

interface OverheadProps {
    routes: {name: string, path: string}[]

}

export const OverheadHeader: FC<OverheadProps> = ({routes}) => {

    const [select, setSelection] = useState("")

    const navigate = useNavigate()

    useEffect(() => {

        if (select) {
            routes.filter(item => item.name === select && navigate(`./../${item.path}`,))

        }

    }, [select , navigate ])

    return (
        <>
            <Select setSelectOption={setSelection} optionsData={routes}/>


        </>
    );
};

