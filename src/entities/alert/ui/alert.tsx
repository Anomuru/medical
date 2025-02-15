import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {alertAction, alertReducer} from "../model/slice/alertSlice";
import cls from "./alert.module.sass";
import {getAlerts} from "../model/selector/alertSelectors";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";


interface AlertType {
    msg: string;
    type: string;
    status: boolean;
}

interface AlertItemProps {
    alert: AlertType;
    index: number;
}

const reducers: ReducersList = {
    AlertSlice: alertReducer

    // userSlice:
};
export const Alert: React.FC = () => {
    const alertsData = useSelector(getAlerts);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.alerts}>
                {alertsData?.map((alert, index) => (
                    <AlertItem key={index} alert={alert} index={index} />
                ))}
            </div>
        </DynamicModuleLoader>
    );
};

const AlertItem: React.FC<AlertItemProps> = React.memo(({ alert, index }) => {
    const nodeRef = useRef(null);
    const dispatch = useDispatch();

    const hideAlert = (index: number) => {
        dispatch(alertAction.onDeleteAlert({ index }));
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(alertAction.onDeleteAlert({ index }));
        }, (index + 1) * 3000);

        return () => clearTimeout(timeoutId);
    }, [alert, dispatch, index]);

    return (
        <CSSTransition
            in={alert.status}
            nodeRef={nodeRef}
            timeout={400}
            classNames="alert"
            unmountOnExit
        >
            <div
                ref={nodeRef}
                className={`${cls.alert} ${cls[alert.type]}`}
            >
                <p>{alert.msg}</p>
                <i
                    className="fa-solid fa-xmark"
                    onClick={() => hideAlert(index)}
                ></i>
            </div>
        </CSSTransition>
    );
});
