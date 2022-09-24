import {Button, Card, CardContent, CardHeader, TextField} from "@mui/material";
import React from "react";
import {useState} from "react";
import {userData} from "../../Data/Data";
import {useDispatch} from "react-redux";
import {successLogin} from "../../redux/reducers/auth.reducer";
import { useNavigate  } from "react-router-dom";

export const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [uname, setUname] = useState('')
    const [pass, setPass] = useState('')
    const [errorMessage, setErrorMessage] = useState({})
    const data = userData
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorMessage({})
        const userData = data.find(user => user.userName === uname)
        if (userData) {
            if (userData.password !== pass) {
                setErrorMessage({pass: true, message:'invalid'})
            } else {
                dispatch(successLogin({
                    user: userData.userName,
                    token: 'Baerer token'
                }))
                navigate('/');
                console.log('logeado')
            }
        } else {
            setErrorMessage({uname: true})
        }
    }

    const handleChangePass = (e) => {
        const value = e.currentTarget.value;
        if (value === '') {
            setPass(null)
        } else {
            setPass(value)
        }
    }
    const handleChangeUname = (e) => {
        const value = e.currentTarget.value;
        if (value === '') {
            setUname(null)
        } else {
            setUname(value)
        }
    }

    return <>

        <Card sx={{maxWidth: 345}}>
            <CardHeader
                title='Login'
                style={{textAlign: 'center'}}
            >

            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="uname"
                        error={errorMessage['uname']}
                        value={uname}
                        fullWidth label={'User'}
                        onChange={handleChangeUname}
                        id="margin-dense"
                        margin="dense"/>
                    <TextField
                        name="pass"
                        value={pass}
                        error={errorMessage['pass']}
                        onChange={handleChangePass}
                        fullWidth
                        label={'Password'}
                        id="margin-dense"
                        margin="dense"/>
                    <Button
                        color="primary"
                        type={'submit'}
                        fullWidth

                        variant="outlined"
                        size='large'>SingIn</Button>
                </form>
            </CardContent>

        </Card>
    </>

}