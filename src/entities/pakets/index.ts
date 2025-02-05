export {PacketsList} from "./ui/packetsList/paketsList";
export {PacketsUserList} from "./ui/packetsUserList/packetsUserList";

export type {IPackets, IPacketsSchema} from "./model/paketsSchema";
export {packetsReducer, packetsActions} from "./model/paketsSlice";
export {getPacketsData, getPacketsLoading, getPacketsError} from "./model/paketsSelector";