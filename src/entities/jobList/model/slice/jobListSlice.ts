


import {createSlice} from "@reduxjs/toolkit";
import {JobListSchema} from "../types/jobListSchema";
import {getJobsThunk} from "entities/jobList/model/thunk/jobListThunk";

const initialState: JobListSchema = {
    jobs: [],
    isLoading: false
}

const jobsListSlice = createSlice({
    name: "jobsListSlice",
    initialState,
    reducers: {
        addJobsList: (state,action) => {
            state.jobs = action.payload.results
        },
        addJob: (state,action) => {
            state.jobs = [...state.jobs, action.payload]
        },
        changeJob: (state,action) => {
            state.jobs = state.jobs.map(job => {
                if (job.id === action.payload.id) {
                    return action.payload
                }
            })
        },
        deleteJob: (state,action) => {
            state.jobs = state.jobs.filter(job => job.id !== action.payload.job)
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
