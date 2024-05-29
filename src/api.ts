import { rooms } from "./data/rooms"
import { tree } from "./data/tree"
import { Rooms, Room, RoomTreeNode } from "./data/types"

let _instance = null
const API_DELAY_MS = 500

class Api {
  rooms: Rooms = { ...rooms }
  tree: RoomTreeNode[] = [...tree]

  constructor() {
    if (_instance === null) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      _instance = this
    }
    return _instance
  }

  /**
   * List of RoomTreeNode elements that can be used to build a tree
   */
  getRooms(): Promise<RoomTreeNode[]> {
    return new Promise<RoomTreeNode[]>((resolve) => setTimeout(resolve, API_DELAY_MS, tree));
  }

  /**
   * fetch a single Room
   * @param id
   */
  getRoom(id: number): Promise<Room> {
    return new Promise<Room>((resolve) => setTimeout(resolve, API_DELAY_MS, this.rooms[id]));
  }

  /**
   * Update a single Room
   * @param id
   * @param room
   */
  setRoom(id: number, room: Room): Promise<Room> {
    this.rooms[id] = room
    return this.getRoom(id)
  }
}
