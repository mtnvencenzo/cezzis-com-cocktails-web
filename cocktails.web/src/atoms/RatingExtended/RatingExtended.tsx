import { Rating, RatingOwnProps } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useState } from 'react';

interface RatingExtendedProps extends RatingOwnProps {
    indicatorValue: number;
}

const RatingExtended = React.memo(({ indicatorValue, ...props }: RatingExtendedProps) => {
    const [indicatorOffset] = useState((6 - indicatorValue) * 91);

    return (
        <>
            <Rating {...props} />
            {indicatorValue && indicatorValue > 1 && (
                <ArrowDropDownIcon
                    data-testid='rating-indicator'
                    aria-label='My rating value'
                    fontSize={props.size}
                    htmlColor='black'
                    sx={{
                        position: 'relative',
                        top: 0,
                        left: 0,
                        transform: `translate(-${indicatorOffset}%, -60%)`
                    }}
                />
            )}
        </>
    );
});

RatingExtended.displayName = 'RatingExtended';
export default RatingExtended;
