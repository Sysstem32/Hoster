import { User } from 'discord.js'
import { NextFunction, Request, Response } from 'express'

export async function isLogged(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const user = request.user as User

    if (!user)
        return response.redirect('/oauth/login')

    next()
}

export async function isOwner(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const user = request.user as User

    if (user.id !== process.env.OWNER)
        return response.redirect('/')
    
    next()
}

export async function isBotOwner(
    request: Request,
    response: Response,
    next: NextFunction
) {
    next()
}