import {rooms} from "./data/assets";
import {tree} from "./data/tree";

export const getRooms = ():Promise<any>=> {
    return Promise.resolve(tree).delay(2000);
}

export const getRoom = (id: number):Promise<any>=> {
    return Promise.resolve(rooms[id]).delay(2000);
}