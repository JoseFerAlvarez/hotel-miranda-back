interface IntBooking {
    idbooking?: number;
    nameuser: string;
    bookingorder: string;
    checkin: string;
    checkout: string;
    typeroom: number;
    numroom: number;
    price: number;
    request?: string;
    amenities?: string;
    photos?: string;
    description?: string;
    status: number;
}

export default IntBooking;
