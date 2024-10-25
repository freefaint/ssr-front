import { Box, FormControlLabel, FormGroup, ListItemButton, Stack, Switch, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ChevronIcon } from "../icons";

const ChannelsPage = () => {

    const notificationChannels = [
        {
            id: '1',
            fullName: 'ВЭСП'
        },
        {
            id: '2',
            fullName: 'qweqwe'
        },
    ]

    const [state, setState] = React.useState({
        channels: [...notificationChannels],
        isAllChecked: false,
      });
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const getNotificationChannels = () => {
        return state.channels.map(ch => {
            return (
                <Box sx={{
                        bgcolor: "#FFFFFF0D",
                        borderRadius: "8px",
                        height: "54px",
                    }} key={ch.id}>
                    <Stack>
                        <Link to={`/channels/${ch.id}/${ch.fullName}`} style={{ color: "inherit", textDecoration: "none" }}>
                        <ListItemButton>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                                <Typography variant="h3">{ch.fullName}</Typography>
                                <ChevronIcon sx={{ width: "7px", height: "10px" }} viewBox='0 0 7 10' />
                            </Stack>
                        </ListItemButton>
                        </Link>
                    </Stack>
                </Box>
            )
        })
    }

    return (
        <Stack spacing={2}>
            <FormGroup>
                <FormControlLabel control={<Switch checked={state.isAllChecked} onChange={handleChange} name="isAllChecked" />} label={<Typography variant="h3">Все уведомления</Typography>} />
            </FormGroup>
            {getNotificationChannels()}
        </Stack>
    )
};

export default ChannelsPage;