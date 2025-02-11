import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPriceSchema} from "../types/priceSchemas";
import {fetchDeviceList, fetchPriceType, fetchPriceTypes} from "../thunk/priceThunk";


const initialState: IPriceSchema = {
    loading: false,
    error: null,
    data: [],
    types: [],
    device: [],
    count: 0

}


const priceSlice = createSlice({
    name: "priceSlice",
    initialState,
    reducers: {


        onAddPriceType: (state, action) => {
            state.data = [...state.data, action.payload]

        },


        editAnalysisName: (state, action) => {

            // state.data = [...state.data.filter(item => item.id !== action.payload.id )  ,action.payload.data]

            state.data = state.data.map(item => {
                if (item.id === action.payload.id) {
                    return {...action.payload.data}
                }
                return item
            })
        },


        onDeleteAnalysisType: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        },


        onAddAnalysis: (state, action) => {

            state.data = state.data.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        id: item.id,
                        name: item.name,
                        analyses: [
                            action.payload.analyses,
                            ...item.analyses
                        ]
                    }
                }
                return item;
            });
        },


        onEditAnalysesName: (state, action) => {

            state.data = state.data.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        id: item.id,

                        name: item.name,

                        analyses: [...item.analyses.filter(analysis => analysis.id !== action.payload.analyses.id) , action.payload.analyses,]

                    };
                }
                return item;
            });
        },
        onRemoveAnalysis: (state, action) => {


            state.data = state.data.map((item) => {

                if (item.id === action.payload.id) {

                    return {
                        ...item,
                        analyses: item.analyses.filter(
                            analysis => analysis.id !== action.payload.analyses
                        )
                    };
                }
                return item;
            });
        }


    },
    extraReducers: builder =>
        builder
            .addCase(fetchPriceType.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPriceType.fulfilled, (state, action) => {
                state.data = action.payload.results
                state.count = action.payload.count
                console.log(action.payload.count)
                state.loading = false
                state.error = null
            })
            .addCase(fetchPriceType.rejected, state => {
                state.loading = false
                state.error = "error"
            })

            .addCase(fetchPriceTypes.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPriceTypes.fulfilled, (state, action) => {
                state.types = action.payload.results
                state.loading = false
                state.error = null
            })
            .addCase(fetchPriceTypes.rejected, state => {
                state.loading = false
                state.error = "error"
            })


            .addCase(fetchDeviceList.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchDeviceList.fulfilled, (state, action) => {
                state.device = action.payload.results
                state.loading = false
                state.error = null
            })
            .addCase(fetchDeviceList.rejected, state => {
                state.loading = false
                state.error = "error"
            })


})


// export const {
//     onAddPriceType,
//     onAddAnalysis,
//     editAnalysisName,
//     onDeleteAnalysisType,
//     onEditAnalysesName,
//     onRemoveAnalysis
// } = priceSlice.actions
// export default priceSlice.reducer

export const {reducer: priceReducer} = priceSlice
export const {actions: priceActions} = priceSlice