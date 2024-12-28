


import {createSlice} from "@reduxjs/toolkit";
import {JobListSchema} from "../types/jobListSchema";
import {getJobsThunk} from "entities/jobList/model/thunk/jobListThunk";

const initialState: JobListSchema = {
    jobs: [
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        },
        {
            name: "asdasd",
            id: 123
        }

    ],
    isLoading: false
}

const jobsListSlice = createSlice({
    name: "jobsListSlice",
    initialState,
    reducers: {
        addJobsList: (state,action) => {
            state.jobs = action.payload.jobs
        },
        addJob: (state,action) => {
            state.jobs = [...state.jobs, action.payload.job]
        },
        changeJob: (state,action) => {
            state.jobs = state.jobs.filter(job => {
                if (job.id === action.payload.id) {

                }
            })
        },
        deleteJob: (state,action) => {
            state.jobs = action.payload.jobs
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getJobsThunk.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getJobsThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(getJobsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
})

export const { actions: jobsListActions } = jobsListSlice;
export const { reducer: jobsListReducer } = jobsListSlice;
