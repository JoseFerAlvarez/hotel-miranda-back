"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsDelete = exports.bookingsPut = exports.bookingsPost = exports.bookingsDetail = exports.bookingsList = void 0;
const connection_1 = require("../db/connection");
const schemas_1 = require("../Schemas/schemas");
const bookingsList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const query = schemas_1.Booking.find();
    yield query.exec((err, bookings) => {
        if (err)
            return next(err);
        res.json(bookings);
    });
});
exports.bookingsList = bookingsList;
const bookingsDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const query = schemas_1.Booking.findOne({ "_id": req.params.idbooking });
    yield query.exec((err, booking) => {
        if (err)
            return next(err);
        res.json(booking);
    });
});
exports.bookingsDetail = bookingsDetail;
const bookingsPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const booking = req.body.booking;
    const userid = booking.user_id;
    const roomid = booking.room_id;
    if ((yield userExists(userid)) && (yield roomExists(roomid))) {
        yield schemas_1.Booking.create(booking);
        res.json({
            message: "New booking posted",
            newbooking: booking
        });
    }
    else {
        res.json({
            message: "Invalid data"
        });
    }
});
exports.bookingsPost = bookingsPost;
const bookingsPut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const booking = req.body.booking;
    const userid = booking.user_id;
    const roomid = booking.room_id;
    if ((yield userExists(userid)) && (yield roomExists(roomid))) {
        const query = schemas_1.Booking.findOneAndUpdate({ "_id": req.params.idbooking }, req.body.booking);
        yield query.exec((err, room) => {
            if (err)
                return next(err);
            res.json({
                message: "Booking put",
                oldbooking: room,
                newbooking: req.body.booking
            });
        });
    }
    else {
        res.json({
            message: "Invalid data"
        });
    }
});
exports.bookingsPut = bookingsPut;
const bookingsDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = schemas_1.Booking.findOneAndDelete({ "_id": req.params.idbooking });
    yield query.exec((err, booking) => {
        if (err)
            return next(err);
        res.json({
            message: "Room deleted",
            oldbooking: booking
        });
    });
});
exports.bookingsDelete = bookingsDelete;
/* Function helpers to check the user and room ids */
function userExists(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        const userQuery = schemas_1.User.findOne({ "_id": userid });
        return yield userQuery.exec()
            .then((result) => result ? true : false);
    });
}
function roomExists(roomid) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomQuery = schemas_1.Room.findOne({ "_id": roomid });
        return yield roomQuery.exec()
            .then((result) => result ? true : false);
    });
}
//# sourceMappingURL=bookingsController.js.map