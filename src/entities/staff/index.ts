export {StaffList} from "./ui/staffList/staffList";

export {default as staffSlice} from "./model/slice/staffSlice";
export {
    default as staffProfileSlice,
    getStaffProfileId
} from "./model/slice/staffProfileSlice";

export {
    type Staff,
    type StaffListSchema,
    type StaffProfileSchema
} from "./model/types/staffSchema";

export {
    fetchStaffListData,
    deleteStaffData
} from "./model/thunk/staffThunk";
export {
    fetchStaffProfileData
} from "./model/thunk/staffProfileThunk";

export {
    getStaffListData,
    getStaffLoading,
    getStaffError
} from "./model/selector/staffSelector";
export {
    getStaffId,
    getStaffProfileData,
    getStaffProfileLoading,
    getStaffProfileError
} from "./model/selector/staffProfileSelector";

