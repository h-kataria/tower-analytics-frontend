/*eslint camelcase: ["error", {properties: "never", ignoreDestructuring: true}]*/
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

import { useReducer } from 'react';
import moment from 'moment';

export const useQueryParams = initial => {
    const paramsReducer = (state, action) => {
        switch (action.type) {
            case 'SET_STARTDATE':
                return { ...state, startDate: action.startDate };
            case 'SET_ENDDATE':
                return { ...state, endDate: action.endDate };
            case 'SET_ID':
                if (!parseInt(action.id)) {
                    const { id: ignored, ...rest } = state;
                    return rest;
                }

                return { ...state, id: parseInt(action.id) };
            case 'SET_SORT_BY':
                if (action.sort === 'count:asc' || action.sort === 'count:desc') {
                    return { ...state, sort_by: action.sort };
                } else {
                    const { sort_by: ignored, ...rest } = state;
                    return rest;
                }

            case 'SET_LIMIT':
                if (!parseInt(action.limit)) {
                    const { limit: ignored, ...rest } = state;
                    return rest;
                }

                return { ...state, limit: parseInt(action.limit) };
            default:
                throw new Error();
        }
    };

    const [ queryParams, dispatch ] = useReducer(paramsReducer, { ...initial });

    return {
        queryParams,
        dispatch,
        setEndDate: () => {
            const endDate = moment.utc().format('YYYY-MM-DD');
            dispatch({ type: 'SET_ENDDATE', endDate });
        },
        setId: id => dispatch({ type: 'SET_ID', id }),
        setStartDate: days => {
            let startDate;
            if (days === 7) {
                startDate = moment
                .utc()
                .subtract(1, 'week')
                .format('YYYY-MM-DD');
            }

            if (days === 14) {
                startDate = moment
                .utc()
                .subtract(2, 'weeks')
                .format('YYYY-MM-DD');
            }

            if (days === 31) {
                startDate = moment
                .utc()
                .subtract(1, 'month')
                .format('YYYY-MM-DD');
            } else {
                startDate = moment
                .utc()
                .subtract(days, 'days')
                .format('YYYY-MM-DD');
            }

            dispatch({ type: 'SET_STARTDATE', startDate });
        },
        setSortBy: sort => dispatch({ type: 'SET_SORT_BY', sort }),
        setLimit: limit => dispatch({ type: 'SET_LIMIT', limit })
    };
};
