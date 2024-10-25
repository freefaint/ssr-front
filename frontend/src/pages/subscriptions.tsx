import { Box, FormControlLabel, FormGroup, Stack, Switch, Typography } from "@mui/material";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { NotificationSubscription } from "../components/types";

export type SubscriptionProps = {
    notificationSubscription: NotificationSubscription;
    onChangeEnabled: () => void;
}

const SubscriptionsPage = () => {
    let notificationSubscriptions = [
        {
            userId: '',
            synapseId: '',
            creationDate: '',
            lastTriggerDate: '',
            id: '1',
            fullName: 'Бункера заполнены',
            subscriptionChannelId: '1',
            enabled: false
        },
        {
            userId: '',
            synapseId: '',
            creationDate: '',
            lastTriggerDate: '',
            id: '2',
            fullName: 'Остановка скипов',
            subscriptionChannelId: '1',
            enabled: false
        },
        {
            userId: '',
            synapseId: '',
            creationDate: '',
            lastTriggerDate: '',
            id: '3',
            fullName: 'Остановка клети',
            subscriptionChannelId: '1',
            enabled: false
        }
    ]

    const [state, setState] = React.useState({
        notifications: [...notificationSubscriptions],
        isAllChecked: false,
    });    
    const { id } = useParams();
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const getNotificationSubscriptions = (idChannel: string | undefined) => {
        return state.notifications.filter(sub => sub.subscriptionChannelId === idChannel).map(sub => {
            return (
                <Box sx={{
                        bgcolor: "#FFFFFF0D",
                        borderRadius: "8px",
                        height: "54px",
                    }} key={sub.id}>
                        <Stack sx={{height: "54px"}}>
                            <FormControlLabel sx={{height: "54px"}} control={<Switch checked={sub.enabled} onChange={() => changeEnabled(sub)} name="isAllChecked" />} label={<Typography variant="h3">{sub.fullName}</Typography>} />
                        </Stack>
                </Box>
            )
        })
    }

    const changeEnabled = (sub: NotificationSubscription) => {
        console.log(sub)
        setState({
            ...state,
            notifications: state.notifications.map(notSub => {
                return notSub.id === sub.id ? {...notSub, enabled: !sub.enabled} : notSub
            })
        })
        console.log(notificationSubscriptions)
    }

    return (
        <Stack spacing={2}>
            <FormGroup>
                <FormControlLabel control={<Switch checked={state.isAllChecked} onChange={handleChange} name="isAllChecked" />} label={<Typography variant="h3">Все уведомления</Typography>} />
            </FormGroup>
            {getNotificationSubscriptions(id)}
        </Stack>
    )
}
  
export default SubscriptionsPage;