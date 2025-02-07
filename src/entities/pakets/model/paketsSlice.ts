import {createSlice} from "@reduxjs/toolkit";
import {IPacketsSchema} from "./paketsSchema";

const initialState: IPacketsSchema = {
    data: [
        {
            id: 1,
            name: "Boshqa",
            price: 0,
            extra: true,
            analysis: []
        },
    ],
    loading: false,
    error: undefined
}

const packetsSlice = createSlice({
    name: "packetsSlice",
    initialState,
    reducers: {
        deleteAnalysis: (state, action) => {
            state.data =
                state.data
                    .map(item => {
                        if (item.id === action.payload.packageId) {
                            return {
                                id: item.id,
                                name: item.name,
                                price: action.payload.packagePrice,
                                analysis: item.analysis.filter((item, index) =>
                                    index !== action.payload.analysisId)
                            }
                        } else return item
                    })
                    .filter(item => item.analysis.length !== 0)
        },
        deletePacket: (state, action) => {
            state.data =
                state.data.filter((item, index) =>
                    index !== action.payload)
        },
        addPacket: (state, action) => {
            state.data = [action.payload, ...state.data]
        },

        addPackets: (state, action) => {
            const filtered = state.data.filter(item => item.extra)[0]

            state.data = [filtered,...action.payload]

        },
        addAnalysis: (state, action) => {
            state.data = state.data.map(item => {
                if (item.extra) {
                    return {
                        ...item,
                        price: item.price + action.payload.price,
                        analysis: [
                            ...item.analysis,
                            action.payload
                        ]
                    }
                }
                return item
            })
        },
        addMultipleAnalysis: (state, action) => {
            console.log(action.payload,"actionPayload")
            state.data = state.data.map(item => {
                if (item.extra) {


                    console.log(item,"item")
                    return {
                        ...item,
                        price:  action.payload.price,
                        analysis: [
                            ...action.payload.analysis
                        ]
                    }
                }
                return item
            })
        }
    }
})

export const {reducer: packetsReducer} = packetsSlice
export const {actions: packetsActions} = packetsSlice