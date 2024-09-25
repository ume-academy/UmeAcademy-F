export interface Tuser{
    id: number,
    fullname: string,
    email:string,
    password:string,
    created_at?: Date
    role?: number,
    status?:number
}