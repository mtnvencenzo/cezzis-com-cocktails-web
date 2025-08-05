import { Rating, RatingOwnProps } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import React, { useLayoutEffect, useState } from 'react';

interface RatingExtendedProps extends RatingOwnProps {
    indicatorValue: number;
    indicatorPosition: 'Top' | 'Bottom';
}

const RatingExtended = React.memo(({ indicatorValue, indicatorPosition, ...props }: RatingExtendedProps) => {
    const [indicatorOffsetX, setIndicatorOffsetX] = useState((6 - indicatorValue) * 91);
    const [indicatorOffsetY, setIndicatorOffsetY] = useState(-10);

    useLayoutEffect(() => {
        let YMagnitude = 1;
        let XMagnitude = 1;

        if (props.size === 'medium') {
            YMagnitude = 1.35;
            XMagnitude = 1.325;
        } else if (props.size === 'large') {
            YMagnitude = 1.9;

            if (indicatorValue === 1){
                XMagnitude = 1.67;

            } else if (indicatorValue === 2) {
                XMagnitude = 1.67;

            } else if (indicatorValue === 5) {
                XMagnitude = 1.76;

            } else {
                XMagnitude = 1.7;
            }
        }

        setIndicatorOffsetX(((6 - indicatorValue) * 18.2 * -1) * XMagnitude);

        if (indicatorPosition === 'Top') {
            setIndicatorOffsetY(-10 * YMagnitude);
        } else {
            setIndicatorOffsetY(10 * YMagnitude);
        }
    }, [indicatorValue, indicatorPosition, props.size]);

    return (
        <>
            <Rating {...props} />
            {indicatorValue > 0 && indicatorPosition === 'Top' && (
                <ArrowDropDownIcon
                    data-testid={`rating-indicator-${indicatorValue.toLocaleString()}`}
                    aria-label='My rating value'
                    fontSize={props.size}
                    htmlColor='black'
                    sx={{
                        position: 'relative',
                        top: indicatorOffsetY,
                        left: indicatorOffsetX
                    }}
                />
            )}
            {indicatorValue > 0 && indicatorPosition === 'Bottom' && (
                <ArrowDropUpIcon
                    data-testid={`rating-indicator-${indicatorValue.toLocaleString()}`}
                    aria-label='My rating value'
                    fontSize={props.size}
                    htmlColor='black'
                    sx={{
                        position: 'relative',
                        top: indicatorOffsetY,
                        left: indicatorOffsetX
                    }}
                />
            )}
        </>
    );
});

RatingExtended.displayName = 'RatingExtended';
export default RatingExtended;
