export interface Geo {
    lat: string;
    lng: string;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IUsersResponse {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export type ContactsResponse =  {
    id: string;
    username: string;
    email: string;
    phone: string
}

export type PostUserResponse = {
    username: string;
    email: string;
    phone: string;
}

export type PutUserResponse = {
    username: string;
    email: string;
    phone: string;
    id: string;
}