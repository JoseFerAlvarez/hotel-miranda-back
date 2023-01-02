const bookingsList = (req, res) => {
    res.json({});
}

const bookingsDetail = (req, res) => {
    res.json({});
}

const bookingsPost = (req, res) => {
    res.json({
        message: "New room posted"
    });
}

const bookingsPut = (req, res) => {
    res.json({
        message: "Room put"
    });
}

const bookingsDelete = (req, res) => {
    res.json({
        message: "Room delete"
    });
}

export {
    bookingsList,
    bookingsDetail,
    bookingsPost,
    bookingsPut,
    bookingsDelete
}
