
export const getRegisterRoute = () => `register`
export const getDashboardRoute = (id?:string) => `dashboard`
export const getStaffRoute = (id?:string) => `staff`
export const getHospitalRegRoute = () => `hospitalReg`
export const getPaymentRoute = () => `payment`
export const getPlatformHomePage = () => `platformHomePage`
export const getPricePageRoute = () => `pricePage`
export const getProfileRoute = (id?:string) => `staff/profile/${id}`
export const getJobListRoute = () => `jobPage`
export const getDevicePageRoute = () => `devicePage`
export const getDeviceProfileRoute = (id?:string) => `devicePage/deviceProfile/:id`
export const getWorkTableRoute = () => `table`
export const getWorkerProfile = (id?:string) => `table/workerProfile`

export const getAnalysisRoute = () => "analysisGroup/*"
export const getPatientRoute = (id?:string) => "patient"
