import React from 'react';
import {Button, Form, Input, Modal} from "antd";
import {RootState, useAppDispatch} from "../../store";
import {ContactsResponse} from "../../models/models";
import {editContact} from "../../store/slices/contactsSlice";
import {useSelector} from "react-redux";
import Error from "../Error/Error";

type EditFormType = {
    setIsEditVisible: (value: boolean) => void;
    isEditVisible: boolean;
    currentContact: ContactsResponse | null
}

type ValuesType = {
    username: string;
    email: string;
    phone: string;
}

const EditForm: React.FC<EditFormType> = ({isEditVisible, setIsEditVisible, currentContact}) => {
    const dispatch = useAppDispatch();
    const { status } = useSelector((state: RootState) => state.contacts)

    const handleOk = () => setIsEditVisible(false);
    const handleCancel = () => setIsEditVisible(false);

    const { phone, username, email, id} = currentContact!;

    const onFinish = (values: ValuesType) => {
        try {
            const { phone, username, email } = values;
            dispatch(editContact({phone, id, email, username}));
            setIsEditVisible(false);
        } catch (e) {
            console.log(e)
        }
    };

    /*const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };*/

    if(status === 'rejected') {
        return <Error />
    }

    return (
        <>
            <Modal
                title="Add new contact"
                visible={isEditVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >

                <Form
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    initialValues={{username, phone, email }}
                    onFinish={onFinish}
                    //onFinishFailed={onFinishFailed}
                >
                    <Form.Item label="Name:" name="username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email:" name="email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Phone:" name="phone" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label=" ">
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditForm;
