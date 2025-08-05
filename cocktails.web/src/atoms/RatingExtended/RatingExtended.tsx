import { Rating, RatingOwnProps } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useLayoutEffect, useState } from 'react';

interface RatingExtendedProps extends RatingOwnProps {
    indicatorValue: number;
}

const RatingExtended = React.memo(({ indicatorValue, ...props }: RatingExtendedProps) => {
    const [indicatorOffset, setIndicatorOffset] = useState((6 - indicatorValue) * 91);

    useLayoutEffect(() => {
        setIndicatorOffset((6 - indicatorValue) * 18.2 * -1);
        // setRendered(true);
    }, [indicatorValue]);

    return (
        <>
            <Rating {...props} />
            {indicatorValue > 0 && (
                <ArrowDropDownIcon
                    data-testid={`rating-indicator-${indicatorValue.toLocaleString()}`}
                    aria-label='My rating value'
                    fontSize={props.size}
                    htmlColor='black'
                    sx={{
                        position: 'relative',
                        top: -10,
                        left: indicatorOffset
                    }}
                />
            )}
        </>
    );
});

RatingExtended.displayName = 'RatingExtended';
export default RatingExtended;
