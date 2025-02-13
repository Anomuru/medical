export interface ISelected {
    packetId: number,
    analysisIdes: number[]
}

export interface IPaymentPacketSchema {
    selectedAnalysis: ISelected[],
    loading: boolean,
    error?: "error"
}