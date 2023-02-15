"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingsController_1 = require("../controllers/bookingsController");
const routerBookings = express_1.default.Router();
routerBookings.get('/', bookingsController_1.bookingsList);
routerBookings.get(('/:idbooking'), bookingsController_1.bookingsDetail);
routerBookings.post(('/'), bookingsController_1.bookingsPost);
routerBookings.put(('/:idbooking'), bookingsController_1.bookingsPut);
routerBookings.delete(('/:idbooking'), bookingsController_1.bookingsDelete);
exports.default = routerBookings;
