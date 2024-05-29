import {rooms} from "./data/rooms";
import {tree} from "./data/tree";
import {Room, RoomTreeNode} from "./data/types";

export const getRooms = ():Promise<RoomTreeNode[]>=> {
    return Promise.resolve(tree).delay(2000);
}

export const getRoom = (id: number):Promise<Room>=> {
    return Promise.resolve(rooms[id]).delay(2000);
}