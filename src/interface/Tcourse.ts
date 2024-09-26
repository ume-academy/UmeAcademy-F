import { UploadFile } from "antd"
import { Tlanguage } from "./Tlanguage"
import { Tlevel } from "./Tlevel"
import { Tuser } from "./Tuser"

export interface Tcourse {
    id?: number
    key?: number
    title: string
    description: string
    thumbnail: null | UploadFile
    old_price: number
    new_price: number
    category_id: number
    user_id: number
    created_at: string
    total_student: number
    teacher: Tuser //Sửa lại thay cho user_Id
    language_id: Tlanguage
    level_id: Tlevel
    status: number
    _method?: string
}