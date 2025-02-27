import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Table} from "shared/ui/table";
import cls from './jobList.module.sass'
import {JobSchema} from "shared/types/oftenUsedTypes";
import {useSelector} from "react-redux";
import {getJobList} from "entities/jobList/model/selectors/jobListSelector";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {jobsListReducer} from "../model/slice/jobListSlice";
import {API_URL_DOC} from "shared/api/base";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {getJobsThunk} from "entities/jobList/model/thunk/jobListThunk";





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


    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getJobsThunk())
    },[])



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
                    <div className={cls.job}>
                        <span className={cls.job__name}>{item?.name}</span>
                    </div>

                </td>


                <td>
                    {
                        item.can_delete &&
                        <div onClick={() => onClickChange(item)} className={cls.edit}>
                            Edit
                        </div>
                    }

                </td>


                <td >
                    {
                        item.can_delete && <div onClick={() => onClickDelete(item)} className={cls.delete}>
                            Delete
                        </div>
                    }

                </td>
                <td>
                    {
                        item.has_client ?
                            (
                                <div className={cls.haveWork}>
                                    <i className="fa-solid fa-circle-check"></i>
                                </div>
                            ) :
                            (
                                <div className={cls.notWork}>
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </div>
                            )
                    }
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
                        <th>Имя</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                        <th>Клиент</th>
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
