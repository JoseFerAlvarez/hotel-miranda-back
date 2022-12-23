"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerContacts = exports.routerUsers = exports.routerPublic = exports.routerRooms = exports.routerBookings = void 0;
const routesBookings_1 = __importDefault(require("./routesBookings"));
exports.routerBookings = routesBookings_1.default;
const routesRooms_1 = __importDefault(require("./routesRooms"));
exports.routerRooms = routesRooms_1.default;
const routesPublic_1 = __importDefault(require("./routesPublic"));
exports.routerPublic = routesPublic_1.default;
const routesUsers_1 = __importDefault(require("./routesUsers"));
exports.routerUsers = routesUsers_1.default;
const routesContacts_1 = __importDefault(require("./routesContacts"));
exports.routerContacts = routesContacts_1.default;
//# sourceMappingURL=routes.js.map