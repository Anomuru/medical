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




    const [activeCheck, setActiveCheck] = useState<number>()
    const groupListData = useSelector(getGroupListData)



    return (
        <DynamicModuleLoader reducers={reducers}>
            <div style={{display: "flex" , flexDirection: "column" , gap: "2rem"}}>
                <GroupHeader
                    setActiveCheck={setActiveCheck}
                    activeCheck={activeCheck}
                />
                <GroupList groupListData={groupListData}/>


            </div>
        </DynamicModuleLoader>
    );
};
