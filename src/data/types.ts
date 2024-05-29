export type RoomTreeNode = {
  id: number
  parentId?: number
  name: string
}
export type Room = {
  name: string
  client_id: number
  floor?: string
  room_name?: string
  room_no?: string
  source?: string
}
export type Rooms = Record<number, Room>
