export {StaffList} from "./ui/staffList/staffList";

export {default as staffSlice} from "./model/slice/staffSlice";
export {type Staff, type StaffSchema} from "./model/types/staffSchema";

export {
    fetchStaffListData,
    deleteStaffData
} from "./model/thunk/staffThunk";
