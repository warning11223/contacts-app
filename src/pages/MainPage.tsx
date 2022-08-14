import {Avatar, Button, List, Typography,} from 'antd';
import React, {useEffect, useState} from 'react';
import {RootState, useAppDispatch} from "../store";
import {useSelector} from "react-redux";
import {deleteContact, fetchContacts} from "../store/slices/contactsSlice";
import AddForm from "../components/AddForm/AddForm";
import EditForm from "../components/EditForm/EditForm";
import {ContactsResponse} from "../models/models";
import SearchInput from "../components/Search/Search";
import Error from "../components/Error/Error";


const MainPage: React.FC = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [currentContact, setCurrentContact] = useState<ContactsResponse | null>( null);
    const [filteredContacts, setFilteredContacts] = useState<ContactsResponse[]>([]);
    const [isFiltering, setIsFiltering] = useState(false);

    const dispatch = useAppDispatch();
    const { status, contacts } = useSelector((state: RootState) => state.contacts);

    useEffect(() => {
       try {
           dispatch(fetchContacts())
               .then(() => {
                   setInitLoading(false);
               })
       } catch (e) {
           console.log(e)
       }
    }, []);



    const deleteUserHandler = (id: string) => {
        try {
            dispatch(deleteContact(id));
        } catch (e) {
            console.log(e)
        }
    }

    const modalHandler = () => {
        setIsModalVisible(true);
    }

    const editHandler = (contact: ContactsResponse) => {
        setIsEditVisible(true);
        setCurrentContact(contact);
    }

    if(status === 'rejected') {
        return <Error />
    }

    return (
            <div style={{maxWidth: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 auto', marginTop: '20px', maxHeight: '600px'}}>
                <Typography.Title style={{textAlign: "center"}}>List of contacts</Typography.Title>

                <SearchInput contacts={contacts} setFilteredContacts={setFilteredContacts} setIsFiltering={setIsFiltering}/>

                <List
                    bordered
                    className="demo-loadmore-list"
                    loading={status === 'pending'}
                    itemLayout="horizontal"
                    dataSource={isFiltering ? filteredContacts : contacts}
                    style={{maxHeight: '600px', overflowY: 'scroll'}}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <a key="list-loadmore-edit" onClick={() => editHandler(item)}>edit</a>,
                                <a key="list-loadmore-more" onClick={() => deleteUserHandler(item.id)}>delete</a>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                                title={<a href="#">{item.username}</a>}
                                description={`Email: ${item.email}`}
                            />
                            <div>{item.phone}</div>
                        </List.Item>
                    )}
                />
                <Button
                    style={{maxWidth: '200px', height: '80px', margin: '0 auto', marginTop: '20px'}}
                    onClick={modalHandler}
                >Add contact</Button>

                {isModalVisible && <AddForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>}

                {isEditVisible && <EditForm isEditVisible={isEditVisible} setIsEditVisible={setIsEditVisible} currentContact={currentContact}/>}
            </div>
    );
};

export default MainPage;