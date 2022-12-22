interface Room {
    id: number;
    number: number;
    photo: string;
    type: string;
    amenities?: string[];
    price: number;
    offer: number;
    status: boolean;
}

export { Room }
