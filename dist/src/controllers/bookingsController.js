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
exports.bookingsCheckIn = exports.bookingsDelete = exports.bookingsPut = exports.bookingsPost = exports.bookingsDetail = exports.bookingsList = void 0;
const connection_1 = require("../db/connection");
const schemas_1 = require("../Schemas/schemas");
const bookingsList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)();
    const bookings = yield schemas_1.Booking
        .find()
        .exec()
        .catch((e) => next(e));
    res.json(bookings);
    yield (0, connection_1.disconnect)();
});
exports.bookingsList = bookingsList;
const bookingsDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)();
    const booking = yield schemas_1.Booking
        .findOne({ "_id": req.params.idbooking })
        .exec()
        .catch((e) => next(e));
    res.json(booking);
    yield (0, connection_1.disconnect)();
});
exports.bookingsDetail = bookingsDetail;
const bookingsPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)();
    const booking = req.body.booking;
    const userid = booking.user_id;
    const roomid = booking.room_id;
    let newbooking = null;
    if ((yield userExists(userid)) && (yield roomExists(roomid))) {
        newbooking = yield schemas_1.Booking.create(booking)
            .then((booking) => booking)
            .catch((e) => next(e));
        res.json({
            message: "New booking posted",
            newbooking: newbooking
        });
    }
    else {
        res.json({
            message: "Invalid data"
        });
    }
    yield (0, connection_1.disconnect)();
});
exports.bookingsPost = bookingsPost;
const bookingsPut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)();
    const booking = req.body.booking;
    const userid = booking.user_id;
    const roomid = booking.room_id;
    if ((yield userExists(userid)) && (yield roomExists(roomid))) {
        const booking = yield schemas_1.Booking
            .findOneAndUpdate({ "_id": req.params.idbooking }, req.body.booking)
            .exec()
            .catch((e) => next(e));
        res.json({
            message: "Booking put",
            oldbooking: booking,
            newbooking: req.body.booking
        });
    }
    else {
        res.json({
            message: "Invalid data"
        });
    }
    yield (0, connection_1.disconnect)();
});
exports.bookingsPut = bookingsPut;
const bookingsDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)();
    const booking = yield schemas_1.Booking
        .findOneAndDelete({ "_id": req.params.idbooking })
        .exec()
        .catch((e) => next(e));
    res.json({
        message: "Room deleted",
        oldbooking: booking
    });
    yield (0, connection_1.disconnect)();
});
exports.bookingsDelete = bookingsDelete;
const bookingsCheckIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)();
    const booking = yield schemas_1.Booking
        .findOne({ "reference": req.params.reference })
        .exec()
        .catch((e) => next(e));
    if (booking) {
        if (!booking.checked) {
            booking.checked = 1;
            yield schemas_1.Booking.findOneAndUpdate({ "reference": req.params.reference }, booking)
                .exec()
                .catch((e) => next(e));
            res.json({
                message: "Booking checked succesfully",
                booking: booking
            });
        }
        else {
            res.json({
                message: "The booking is already checked",
                booking: booking,
            });
        }
    }
    else {
        res.sendStatus(404);
    }
    yield (0, connection_1.disconnect)();
});
exports.bookingsCheckIn = bookingsCheckIn;
/* Function helpers to check the user and room ids */
function userExists(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield schemas_1.User
            .findOne({ "_id": userid })
            .exec()
            .then((result) => result ? true : false);
    });
}
function roomExists(roomid) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield schemas_1.Room
            .findOne({ "_id": roomid })
            .exec()
            .then((result) => result ? true : false);
    });
}
//# sourceMappingURL=bookingsController.js.map