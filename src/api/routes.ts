import { Router } from 'express'
import { mainController } from './useCases/Main'

import passport from 'passport'
import { isLogged } from './middlewares/Authentication'
import { dashboardController } from './useCases/Dashboard'
import { createInstanceController } from './useCases/CreateInstance'
import file from 'express-fileupload'

const router = Router()

router.get(
    '/oauth/login',
    passport.authenticate('discord')
)

router.get(
    '/oauth/redirect',
    passport.authenticate('discord', {
        failureRedirect: '/oauth/error'
    }),
    (request, response) => {
        response.redirect('/')
    }
)

router.get('/', async(request, response) => {
    return mainController.handle(request, response)
})

router.get('/dashboard', async(request, response) => {
    return await dashboardController.handle(request, response)
})

router.post('/new-instance', file(), async(request, response) => {
    return await createInstanceController.handle(request, response)
})

router.get('/support', async(request, response) => {
    return await response.redirect('https://discord.gg/')
})

export default router
