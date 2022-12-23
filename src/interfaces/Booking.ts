interface Booking {
    id: number;
    photo: string;
    name: string;
    order: string;
    checkin: string;
    checkout: string;
    typeroom: string;
    numroom: number;
    price: number;
    request: string;
    amenities?: string[] | object[];
    photos?: object[];
    type: string;
    description: string;
    state: string;
}

export default Booking;
