import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
    top: 0,
    color: theme.palette.mode === 'dark' ? '#3880ff' : 'black',
    maxHeight: 2,
    padding: '0 0 0 0 ',
    margin: 0,
    '& .MuiSlider-thumb': {
        height: 45,
        width: 45,
        border: '2px solid black',
        backgroundColor: '#AD6A30',
        boxShadow: iOSBoxShadow,
        '&:focus, &:hover, &.Mui-active': {
            height: 50,
            width: 50,

            boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
            },
        },
    },
    '@media (pointer: coarse)': {
        // overide default padding behaviour with touch https://github.com/mui/material-ui/issues/21231
        padding: '0'
    },
    '& .MuiSlider-valueLabel': {
        fontSize: "1rel",
        // fontWeight: 'bold',
        top: 28,
        position: 'relative',
        backgroundColor: 'unset',
        color: theme.palette.text.primary,
        '&:before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            fontWeight: 600,
            textShadow: '1px 1px rgba(0, 0, 0, 1)',
            color: theme.palette.mode === 'dark' ? '#fff' : 'white',
    },
},
    '& .MuiSlider-track': {
    border: 'none',
    height: 3
},
    '& .MuiSlider-rail': {
    opacity: 0.5,
    height: 3,
    backgroundColor: 'grey',
},
    '& .MuiSlider-markLabel': {
    opacity: 0.5,
    top: -8
},
    '& .MuiSlider-mark': {
    top: -5,
    backgroundColor: "lightgrey",
    height: 5,
    width: 1,
    '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: 'grey',
    },
},
}));

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const valueLabel = months
    // .map((x, i) => ({ value: i + 1, label: x}))
    .map((x, i) => ({ value: i + 1, label: '' }))

const getText = (value) => `${value}`;

const getMonth = (val) => {
    return months[val - 1]
}

const d = new Date();

export default function CustomizedSlider({ setMonth }) {

    const changeMonth = (event, value) => {
        console.log("month:", value)
        setMonth(value);
    };

    return (
        <div style={{ width: '100%', zIndex: '1', position: 'absolute', top: '65px', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '90%', padding: '0', margin: '0' }}>
                <IOSSlider
                    onChangeCommitted={changeMonth}
                    aria-label="ios slider"
                    defaultValue={d.getMonth() + 1}
                    min={1}
                    valueLabelFormat={getMonth}
                    max={12}
                    step={1}
                    marks={valueLabel}
                    valueLabelDisplay="on"
                    getAriaValueText={getText}
                />
            </Box>
        </div>
    );
}