import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react'
import HelpIcon from '@mui/icons-material/Help';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { openHelp, openSettings, openStats } from '../redux/userSlice';


const MainContainer = styled(Box)(() => ({
    height: '84px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 22px',
    marginBottom: '87px',
    overflow: 'none'
}));

const MainHeading = styled(Typography)(() => ({
    textAlign: "center",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    letterSpacing: "3px",
}));

export default function Topbar() {
    const dispatch = useDispatch()
    const themeMode = useSelector((state) => state.theme.themeMode)

    return (
        <MainContainer sx={{
            background: themeMode === 'light' ? '#F3F3F3' : 'rgba(218, 220, 224, 0.03)',
            width: { xs: '100%', xs350: '100%', xs450: '100%', sm: '638px' },
            justifyContent: 'space-between',
            overflow: 'none'
        }}>

            <HelpIcon
                sx={{
                    color: themeMode === 'light' ? '#818181' : '#FFF',
                    fontSize: { xs: '18px', xs350: '25px', xs450: '30px', sm: '35px' },
                    marginRight: { xs: '8px', xs350: '8px', xs450: '0px' },
                    cursor: 'pointer'
                }}
                onClick={() => { dispatch(openHelp()) }}
            />

            <MainHeading sx={{
                color: themeMode === 'light' ? "#202537" : '#FFF',
                fontSize: { xs: '20px', xs350: '25px', xs450: '30px', sm: '40px' },
                marginRight: { xs: '8px', xs350px: '8px', xs450: '0px' },
            }}>
                FOREVERDLE
            </MainHeading>

            <Box sx={{
                gap: { xs: '10px', xs350px: '15px', xs450: '20px', sm: '30px' },
                display: 'flex'
            }}>
                <BarChartIcon
                    sx={{
                        color: themeMode === 'light' ? '#818181' : '#FFF',
                        fontSize: { xs: '18px', xs350: '25px', xs450: '30px', sm: '35px' },
                        cursor: 'pointer'
                    }}
                    onClick={() => { dispatch(openStats()) }}
                />
                <SettingsIcon
                    sx={{
                        color: themeMode === 'light' ? '#818181' : '#FFF',
                        fontSize: { xs: '18px', xs350: '25px', xs450: '30px', sm: '35px' },
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        // if (themeMode === 'light') {
                        //     dispatch(makeThemeDark())

                        // } else {
                        //     dispatch(makeThemeLight())
                        // }
                        dispatch(openSettings())
                    }}
                />
            </Box>

        </MainContainer>
    )
}
