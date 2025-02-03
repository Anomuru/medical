import {createSlice} from "@reduxjs/toolkit";
import {IPacketsSchema} from "./paketsSchema";

const initialState: IPacketsSchema = {
    data: [
        {
            id: 1,
            title: "packagesName",
            price: 25000,
            packages: [
                {
                    name: "hello",
                    code_name: "hello code",
                    type: "type",
                    packet: "packet",
                    device: "device",
                    container: "container",
                    id: 1,
                    price: "10000"
                },
                {
                    name: "hello 2",
                    code_name: "hello code 2",
                    type: "type 2",
                    packet: "packet 2",
                    device: "device 2",
                    container: "container 2",
                    id: 2,
                    price: "15000"
                }
            ]
        },
        {
            id: 2,
            title: "packagesName 2",
            price: 250000,
            packages: [
                {
                    name: "hello",
                    code_name: "hello code",
                    type: "type",
                    packet: "packet",
                    device: "device",
                    container: "container",
                    id: 3,
                    price: "100000"
                },
                {
                    name: "hello 2",
                    code_name: "hello code 2",
                    type: "type 2",
                    packet: "packet 2",
                    device: "device 2",
                    container: "container 2",
                    id: 4,
                    price: "150000"
                }
            ]
        }
    ],
    loading: false,
    error: undefined
}

const packetsSlice = createSlice({
    name: "packetsSlice",
    initialState,
    reducers: {
        deleteAnalysis: (state, action) => {
            console.log(action.payload, "action.payload")
            state.data =
                state.data
                    .map(item => {
                        if (item.id === action.payload.packageId) {
                            return {
                                id: item.id,
                                title: item.title,
                                price: action.payload.packagePrice,
                                packages: item.packages.filter(item =>
                                    item.id !== action.payload.analysisId)
                            }
                        } else return item
                    })
                    .filter(item => item.packages.length !== 0)
        },
        deletePacket: (state, action) => {
            state.data =
                state.data.filter(item => item.id !== action.payload)
        },
        addPacket: (state, action) => {
            state.data = [action.payload, ...state.data]
        },
        addAnalysis: (state, action) => {
            state.data =
                [
                    {
                        id: action.payload.id,
                        title: "Boshqa",
                        price: action.payload.price,
                        packages: [action.payload]
                    },
                    ...state.data
                ]
        }
    }
})

export const {reducer: packetsReducer} = packetsSlice
export const {actions: packetsActions} = packetsSlice