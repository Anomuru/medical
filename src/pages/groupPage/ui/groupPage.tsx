import {GroupHeader} from "features/groupFeature";
import {DynamicModuleLoader} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {groupFilterReducer, GroupList, groupListReducer} from "entities/group";
import {useSelector} from "react-redux";
import {
    getFilterRadioItem,
    getFilterSelectResearch,
    getFilterSelectWorkplace
} from "entities/group/model/selector/groupFilterSelector";
import {useEffect, useState} from "react";
import {getGroupListData} from "entities/group/model/selector/groupListSelector";


const reducers = {
    groupFilterSlice: groupFilterReducer,
    groupListSlice: groupListReducer
}

export const GroupPage = () => {


    const groupListData = useSelector(getGroupListData)

    const filterRadioItem = useSelector(getFilterRadioItem)
    const [activeCheck, setActiveCheck] = useState<number | string>();
    const [activeItem, setActiveItem] = useState([])
    useEffect(() => {
        if (filterRadioItem?.length) {
            setActiveCheck(filterRadioItem[0]?.id);
        }
    }, [filterRadioItem]);



    return (
        <DynamicModuleLoader reducers={reducers}>
            <div style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                <GroupHeader
                    filterRadioItem={filterRadioItem}
                    setActiveCheck={setActiveCheck}

                    activeItem={activeItem}
                />
                <GroupList setActiveItem={setActiveItem} activeItem={activeItem} activeCheck={activeCheck} groupListData={groupListData}/>


            </div>
        </DynamicModuleLoader>
    );
};
