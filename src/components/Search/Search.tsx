import React, {useState} from 'react';
import {Input} from 'antd'
import {useAppDispatch} from "../../store";
import {ContactsResponse} from "../../models/models";

const { Search } = Input;

type SearchInput = {
    contacts: ContactsResponse[];
    setFilteredContacts: (contacts: ContactsResponse[]) => void;
    setIsFiltering: (value: boolean) => void;

}

const SearchInput: React.FC<SearchInput> = ({contacts, setFilteredContacts, setIsFiltering }) => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useAppDispatch();


    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target.value).toLowerCase();
        setInputValue(e.target.value);

        if(value) {
            setIsFiltering(true);
            const searchContacts = contacts.filter(item => {
                return item.username.toLowerCase().includes(value) || item.phone.toLowerCase().includes(value);
            });
            setFilteredContacts(searchContacts);
        } else {
            setIsFiltering(false);
            setFilteredContacts(contacts);
        }

    }

    return (
        <>
            <Search
                placeholder="input contact name or phone"
                style={{marginBottom: '20px'}}
                value={inputValue}
                onChange={inputHandler}
            />
        </>
    );
};

export default SearchInput;
