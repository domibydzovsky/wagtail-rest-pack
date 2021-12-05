import React, { Fragment, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export interface Dialog {
    id?: number,
    title: string,
    onClose?: () => void
    text?: string,
    component?: React.ComponentType,
    componentProps?: any
    actions?: React.ComponentType<{ onClose: () => void }>
}

export interface Props {
    dialogs: Dialog[],
}

export function Dialogs(props: Props) {
    let dialogs = props.dialogs
    const opened = dialogs.length >= 1
    if (dialogs.length == 0) {
        dialogs = [getEmptyDialog()]
    }
    return (
        <React.Fragment>
            {dialogs.map((dialog) => {
                const Component = dialog.component
                const ActionComponent = dialog.actions
                return <Dialog open={opened} onClose={dialog.onClose} key={dialog.title}
                               aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{dialog.title}</DialogTitle>
                    <DialogContent>
                        {dialog.text && <DialogContentText>
                            {dialog.text}
                        </DialogContentText>}
                        {Component && <Component {...(dialog.componentProps || {})}/>}
                    </DialogContent>
                    {ActionComponent && <DialogActions>
                        <ActionComponent onClose={dialog.onClose ? dialog.onClose : ()=>{} }/>
                    </DialogActions>}
                </Dialog>
            })}
        </React.Fragment>
    );
}

function getEmptyDialog(): Dialog {
    return {
        title: "",
        text: "",
        onClose: () => {
        },
    }
}
