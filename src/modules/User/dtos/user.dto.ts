export interface UserDTO {
    id: string
    name: string
    email: string
    password: string
    role?: string
    createdAt: Date
}

export interface HTTP_RESPONSE {
    success: boolean
    status: number
    message?: object | string
}