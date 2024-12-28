import React, {useCallback, useMemo, useState} from 'react';
import {Table} from "shared/ui/table";
import cls from './jobList.module.sass'
import {JobSchema} from "shared/types/oftenUsedTypes";
import {useSelector} from "react-redux";
import {getJobList} from "entities/jobList/model/selectors/jobListSelector";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {jobsListReducer} from "../model/slice/jobListSlice";





interface JobListProps {
    setChangeActive: () => void;
    setDeleteActive: () => void;
    setChangingData: (item: JobSchema ) => void;
}

const initialReducers: ReducersList = {
    jobList: jobsListReducer,
};
export const JobList = ({setChangeActive,setDeleteActive,setChangingData}: JobListProps) => {



    const jobs = useSelector(getJobList) || []


    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentTableData, setCurrentTableData] = useState<JobSchema[]>([])
    const pageSize = useMemo(() => 10, [])



    const onClickChange = (item: JobSchema) => {
        setChangeActive()
        setChangingData(item)
    }


    const onClickDelete = (item: JobSchema) => {
        setDeleteActive()
        setChangingData(item)
    }


    const renderDoctors = useCallback(() => {
        return jobs.map((item, index) => (
            <tr>
                <td>{index + 1}</td>
                <td>
                    <span className={cls.profile__job}>{item.name}</span>
                </td>

                <td onClick={() => onClickChange(item)}>

                    <div className={cls.edit}>
                        Edit
                    </div>
                </td>


                <td onClick={() => onClickDelete(item)}>

                    <div className={cls.delete}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </td>
            </tr>
        ))
    }, [jobs])

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true} >
            <div className={cls.tableBox}>
                <Table>
                    <thead className={cls.theadBody}>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody className={cls.thBody}>
                    {
                        renderDoctors()
                    }
                    </tbody>
                </Table>
            </div>

            {/*<Pagination*/}
            {/*    users={list}*/}
            {/*    onPageChange={page => {*/}
            {/*        setCurrentPage(page)*/}
            {/*    }}*/}
            {/*    currentPage={currentPage}*/}
            {/*    pageSize={pageSize}*/}
            {/*    setCurrentTableData={setCurrentTableData}*/}
            {/*/>*/}
        </DynamicModuleLoader>


    );
};
