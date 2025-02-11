// import React, {useCallback, useEffect} from 'react';
// import classNames from "classnames";
//
// import {usePagination, DOTS} from "shared/lib/hooks/usePagination";
//
// import cls from "./pagination.module.sass";
//
// interface IUser {
//     user: { name: string; surname: string; job: string; image: string; };
//     age: number;
//     phone: string;
// }
//
// interface IPaginationProps {
//     users: any[],
//     onPageChange: (arg: number) => void,
//     siblingCount?: number,
//     currentPage: number,
//     pageSize: number,
//     className?: string,
//     setCurrentTableData: (arg: () => []) => void,
//     types?: string
// }
//
// export const Pagination: React.FC<IPaginationProps> = (props) => {
//
//     const {
//         users,
//         onPageChange,
//         siblingCount = 1,
//         currentPage,
//         pageSize,
//         className,
//         setCurrentTableData,
//         types = "basic"
//     } = props;
//
//
//     useEffect(() => {
//         setCurrentTableData(() => {
//             const firstPageIndex = (currentPage - 1) * pageSize;
//             const lastPageIndex = firstPageIndex + pageSize;
//             return users?.slice(firstPageIndex, lastPageIndex);
//         })
//     }, [pageSize, currentPage, users, setCurrentTableData])
//
//     const paginationRange: number[] | (string & number)[] = usePagination({
//         currentPage,
//         totalCount: users?.length,
//         siblingCount,
//         pageSize
//     });
//
//     const renderPageNumbers = useCallback(() => {
//         return paginationRange?.map((pageNumber, index) => {
//             if (pageNumber === DOTS) {
//                 return <li key={index} className={classNames(cls.pagination_item, "dots")}>&#8230;</li>;
//             }
//
//             return (
//                 <li
//                     key={index}
//                     className={classNames(cls.pagination_item, {
//                         [cls.selected]: pageNumber === currentPage && types === "basic",
//                         [cls.customSelected]: pageNumber === currentPage && types === "custom"
//                     })}
//                     onClick={() => onPageChange(pageNumber)}
//                 >
//                     {pageNumber}
//                 </li>
//             );
//         });
//     }, [currentPage, onPageChange, paginationRange]);
//
//     if (currentPage === 0 || paginationRange?.length < 2) {
//         return null;
//     }
//
//     const onNext = () => {
//         onPageChange(currentPage + 1);
//     };
//
//     const onPrevious = () => {
//         onPageChange(currentPage - 1);
//     };
//
//
//     const renderedPages = renderPageNumbers();
//     let lastPage = paginationRange?.length ? paginationRange[paginationRange?.length - 1] : 0;
//
//     return (
//         <div className={cls.pagination}>
//             <h1 className={cls.pagination__info}>
//                 Showing {currentPage} to {lastPage} of {pageSize} entries
//             </h1>
//             <ul className={classNames(cls.pagination_container, {className})}>
//                 <li
//                     key="prev"
//                     className={classNames(cls.pagination_item, cls.arrow, {
//                         [cls.disabled]: currentPage === 1
//                     })}
//                     onClick={onPrevious}
//                 >
//                     <i className="fas fa-arrow-left"></i>
//                 </li>
//                 <div className={cls.numbers}>
//                     {renderedPages}
//                 </div>
//                 <li
//                     key="next"
//                     className={classNames(cls.pagination_item, cls.arrow, {
//                         [cls.disabled]: currentPage === lastPage
//                     })}
//                     onClick={onNext}
//                 >
//                     <i className="fas fa-arrow-right"></i>
//                 </li>
//             </ul>
//         </div>
//     );
// }

import React, { useCallback } from 'react';
import classNames from 'classnames';
import { usePagination, DOTS } from 'shared/lib/hooks/usePagination/usePagination';
import cls from './pagination.module.sass';

interface IPaginationProps {
    totalCount: number;
    onPageChange: (page: number) => void;
    currentPage: number;
    pageSize: number;
    className?: string;
}

export const Pagination: React.FC<IPaginationProps> = ({
                                                    totalCount,
                                                    onPageChange,
                                                    currentPage,
                                                    pageSize,
                                                    className
                                                }) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount: 1,
        pageSize,
    });

    const onNext = () => {
        if (currentPage < Math.ceil(totalCount / pageSize)) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const renderPageNumbers = useCallback(() => {
        return paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
                return <li key={index} className={classNames(cls.pagination_item, 'dots')}>&#8230;</li>;
            }
            if (typeof pageNumber === "number") {
                return (
                    <li
                        key={index}
                        className={classNames(cls.pagination_item, {
                            [cls.selected]: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            }
        });
    }, [currentPage, onPageChange, paginationRange]);

    if (!totalCount) return null;

    return (
        <div className={cls.pagination}>
            <ul className={classNames(cls.pagination_container, className)}>
                {currentPage > 1 && (
                    <li
                        className={classNames(cls.pagination_item, cls.arrow)}
                        onClick={onPrevious}
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                    </li>
                )}
                {renderPageNumbers()}
                {currentPage < Math.ceil(totalCount / pageSize) && (
                    <li
                        className={classNames(cls.pagination_item, cls.arrow)}
                        onClick={onNext}
                    >
                        <i className="fa-solid fa.arrow-right"></i>
                    </li>
                )}
            </ul>
        </div>
    );
};
