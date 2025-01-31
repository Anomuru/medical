import {memo, useCallback} from 'react';

import cls from "./analysisPackage.module.sass";

export const AnalysisPackage = memo(() => {

    const render = useCallback(() => {
        return [1,2,3,4,5,6,7,8,9,0].map(item => {
            return (
                <div className={cls.package__item}>
                    <h3>КОАГУЛОЛОГИЯ</h3>
                    <p>Paket nomi</p>
                </div>
            )
        })
    },[])

    return (
        <div className={cls.package}>
            {render()}
        </div>
    );
})
