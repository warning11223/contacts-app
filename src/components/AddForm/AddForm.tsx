import React from 'react';
import {Button, Form, Input, Modal} from "antd";
import {RootState, useAppDispatch} from "../../store";
import {addContact} from "../../store/slices/contactsSlice";
import {useSelector} from "react-redux";
import Error from "../Error/Error";

type AddFormType = {
    isModalVisible: boolean;
    setIsModalVisible: (value: boolean) => void;
}

type ValuesType = {
    username: string;
    email: string;
    phone: string;
}

const AddForm: React.FC<AddFormType> = ({isModalVisible, setIsModalVisible}) => {
    const dispatch = useAppDispatch();
    const { status } = useSelector((state: RootState) => state.contacts)

    const handleOk = () => setIsModalVisible(false);
    const handleCancel = () => setIsModalVisible(false);

    const onFinish = (values: ValuesType) => {
        try {
            const { phone, username, email} = values;
            dispatch(addContact({phone, username, email}));
            setIsModalVisible(false);
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
                visible={isModalVisible}
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
                    initialValues={{username: '', phone: '', email: ''}}
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

export default AddForm;
