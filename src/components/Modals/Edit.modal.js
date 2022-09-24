import React, {useEffect, useState} from "react";
import {
    Alert,
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal, NativeSelect,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {actionsConst, openModal, success} from "../../redux/reducers/product.reducer";
import {SelectInput} from "../Forms/select";
import {condition, connection_tipe, owner, storage_system} from "../../Data/Data";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const initialState = {
    connection_type: '',
    storage_system: '',
    condition: '',
    owner: '',
    location: '',
    search: '',
    manufacturer: '',
    purchase: '',
    i_max: '',
    i_b: '',
    i_n: '',
    seals: ''
}

export const ModalEdit = ({open, handleClose, isEditing}) => {
    const dispatch = useDispatch()
    const [fileds, setFields] = useState(initialState)
    const rowEditing = useSelector((state) => state.product.rowEditing)
    const statusSaved = useSelector(state => state.product.statusSaved)
    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (Object.entries(fileds).length > 0) {
            if (isEditing) {
                dispatch({type: actionsConst.PATCH_PRODUCT, payload: fileds})
            } else {
                dispatch({type: actionsConst.POST_PRODUCT, payload: fileds})
            }
        } else {
            alert('the fields has required')
        }
    }
    const handleChange = (e) => {
        const {value, name} = e.target
        setFields({...fileds, [name]: value})
    }

    useEffect(() => {
        if (Object.entries(statusSaved).length > 0 && !statusSaved.hasOwnProperty('detail')) {
            setFields(initialState)
            dispatch({type: actionsConst.FETCH_ALL})
        }
    }, [statusSaved])

    useEffect(() => {
        if(isEditing) {
            setFields(rowEditing)
        }else {
            setFields(initialState)
        }
    }, [isEditing])
    return (
        <div>
            <Modal
                open={open}
                onClose={() => handleClose(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >


                <Box sx={style}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '25ch'},
                        }}
                        onSubmit={handleSubmit}
                        noValidate
                        autoComplete="off"
                    >
                        {statusSaved && statusSaved.hasOwnProperty('detail') && (
                            <Alert severity="error" onClose={() => {
                                dispatch(success({}))
                            }}>This is an info alert — check it out!</Alert>
                        )}
                        {Object.entries(statusSaved).length > 0 && !statusSaved.hasOwnProperty('detail') && (
                            <Alert severity="success" onClose={() => {
                                dispatch(success({}))
                            }}>This is an info alert — check it out!</Alert>
                        )}
                        <h1>{isEditing ? 'Edit' : 'Create'}</h1>

                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            <Grid item xs={2} sm={4} md={4}>
                                <SelectInput
                                    variant="standard"
                                    name='connection_type'
                                    label="Conditioon type"
                                    value={fileds.connection_type}
                                    onChange={handleChange}
                                    data={connection_tipe}
                                />

                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <SelectInput
                                    name="storage_system"
                                    label="storage_system"
                                    onChange={handleChange}
                                    value={fileds.storage_system}
                                    defaultValue={''}
                                    data={storage_system}
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <SelectInput
                                    name="condition"
                                    label="Condition"
                                    value={fileds.condition}
                                    onChange={handleChange}
                                    data={condition}
                                    defaultValue={''}
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <SelectInput
                                    name="owner"
                                    label="owner"
                                    value={fileds.owner}
                                    onChange={handleChange}
                                    defaultValue=""
                                    data={owner}
                                />

                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="location"
                                    onChange={handleChange}
                                    value={fileds.location}
                                    label="location"
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="manufacturer"
                                    label="manufacturer"
                                    value={fileds.manufacturer}
                                    onChange={handleChange}
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="purchase"
                                    label="purchase"
                                    value={fileds.purchase}
                                    onChange={handleChange}
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="i_max"
                                    label="i_max"
                                    value={fileds.i_max}
                                    onChange={handleChange}
                                    defaultValue=""
                                    type={'number'}
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="i_b"
                                    label="i_b"
                                    value={fileds.i_b}
                                    onChange={handleChange}
                                    type={'number'}
                                    defaultValue=""
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="i_n"
                                    label="i_n"
                                    value={fileds.i_n}
                                    onChange={handleChange}
                                    type={'number'}
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    name="seals"
                                    label="seals"
                                    value={fileds.seals}
                                    onChange={handleChange}
                                    type={'number'}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs>
                                <Button type={'submit'} variant={'contained'}>Save</Button>
                            </Grid>
                            <Grid item xs>
                                <Button onClick={() => handleClose(false)}>Close</Button>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Modal>
        </div>

    )
}