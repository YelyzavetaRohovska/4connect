export type AssetTreeNode = {
  id: number
  parentId: number
  name: string
}
export type Asset = {
  name: string
  client_id: number
  floor?: string
  room_name?: string
  room_no?: string
  source?: string
}
export type Assets = Record<number, Asset>
