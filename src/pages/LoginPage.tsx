import {Button, Checkbox, Form, Input, Typography} from 'antd';
import React, {useState} from 'react';
import axios from "axios";
import {USERS_URL} from "../urls";
import {IUsersResponse} from "../models/models";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {isLogin, isLogout} from "../store/slices/authSlice";
import {currentUserLogin} from "../store/slices/usersSlice";
import {RootState} from "../store";
import Error from "../components/Error/Error";

type FinishProps = {
    password: string;
    remember: boolean;
    username: string;
}

type ErrorFields = {
    errors: string[]
    name: string[]
    warnings: []
}

type FinishFailedProps = {
    errorFields?: ErrorFields[];
    outOfDate?: boolean;
    values?: {
        username: string;
        password: string;
        remember: boolean;
    }
}



const LoginPage: React.FC = () => {
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status } = useSelector((state: RootState) => state.users)

    const onFinish = async (values: FinishProps) => {
        try {
            const { data } = await axios.get<IUsersResponse[]>(USERS_URL);
            const findUser = data.find(item => item.username === values.username);

            if(findUser) {
                setIsError(false);
                dispatch(currentUserLogin(findUser));
                dispatch(isLogin());
                navigate('/main')
            } else {
                dispatch(isLogout());
                setIsError(true);
            }
        } catch (e) {
            console.log(e)
        }

    };

    const onFinishFailed = () => {
        console.log('Error');
    };

    if(status === 'rejected') {
        return <Error />
    }

    return (
        <div style={{display: 'flex', justifyContent: "center", alignItems: "center", height: '100vh'}}>
            <div>
                <Typography.Title style={{textAlign: "center"}}>Authorization</Typography.Title>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        validateStatus={isError ? "error" : 'success'}
                        help={isError ? 'This username does not exist' : ''}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ message: 'Please input your password!' }]}
                    >
                        <Input.Password disabled/>
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;