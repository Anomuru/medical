export interface AlertType {
    msg: string;
    type: string;
    status: boolean;
}

export interface IAlertState {
    alert: AlertType[];
    loading: boolean;
    error: string | null;
}