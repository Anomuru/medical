export {DeviceProfile} from "./ui/deviceProfile"

export {type IDeviceProfile, type DeviceProfileSchema} from './model/types/deviceProfileSchema'
export {deviceProfileThunk, deviceProfileUsersThunk, deviceAnalisThunk} from './model/thunk/deviceProfileThunk'
export {getProfile, getProfileUsers,getUserAnalis} from './model/selector/deviceProfileSelector'
