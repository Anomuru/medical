import React, {useCallback, useEffect, useMemo} from 'react';
import classNames from "classnames";

import {usePagination, DOTS} from "shared/lib/hooks/usePagination";

import cls from "./pagination.module.sass";

interface IUser {
    user: { name: string; surname: string; job: string; image: string; };
    age: number;
    phone: string;
}

interface IPaginationProps {
    users: IUser[],
    onPageChange: (arg: number) => void,
    siblingCount?: number,
    currentPage: number,
    pageSize: number,
    className?: string,
    setCurrentTableData: (arg: () => []) => void,
    type?: string
}

export const Pagination: React.FC<IPaginationProps> = (props) => {

    const {
        users,
        onPageChange,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
        setCurrentTableData,
        type = "basic"
    } = props;


    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return users.slice(firstPageIndex, lastPageIndex);
    }, [pageSize, currentPage, users]);

    // @ts-ignore
    const paginationRange: number[] | (string & number)[] = usePagination({
        currentPage,
        totalCount: users?.length,
        siblingCount,
        pageSize
    });

    const renderPageNumbers = useCallback(() => {
        return paginationRange.map((pageNumber, index) => {
            // @ts-ignore
            if (pageNumber === DOTS) {
                return <li key={index} className={classNames(cls.pagination_item, "dots")}>&#8230;</li>;
            }

            return (
                <li
                    key={index}
                    className={classNames(cls.pagination_item, {
                        [cls.selected]: pageNumber === currentPage && type === "basic",
                        [cls.customSelected]: pageNumber === currentPage && type === "custom"
                    })}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </li>
            );
        });
    }, [currentPage, onPageChange, paginationRange, type]);

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    const renderedPages = renderPageNumbers();

    return (
        <div className={cls.pagination}>
            <h1 className={cls.pagination__info}>
                Showing {currentPage} to {paginationRange[paginationRange.length - 1]} of {pageSize} entries
            </h1>
            <ul className={classNames(cls.pagination_container, {className})}>
                <li
                    key={10000}
                    className={classNames(cls.pagination_item, cls.arrow, {
                        [cls.disabled]: currentPage === 1
                    })}
                    onClick={onPrevious}
                >
                    <i className="fas fa-arrow-left"></i>
                </li>
                <div className={cls.numbers}>
                    {renderedPages}
                </div>

                <li
                    key={100001}
                    className={classNames(cls.pagination_item, cls.arrow, {
                        [cls.disabled]: currentPage === lastPage
                    })}
                    onClick={onNext}
                >
                    <i className="fas fa-arrow-right"></i>
                </li>
            </ul>
        </div>
    );
}