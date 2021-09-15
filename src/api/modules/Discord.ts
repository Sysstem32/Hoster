import { Strategy } from 'passport-discord'
import passport from 'passport'
import config from '../../config'

passport.serializeUser((user: any, done) => {
    done(null, user)
})

passport.deserializeUser((user: any, done) => {
    if (user) done(null, user)
})

export const DiscordStrategy = new Strategy(
    {
        clientID: config.client.id,
        clientSecret: config.client.secret,
        callbackURL: config.api.callback,
        scope: ['identify', 'guilds']
    },
    async (acessToken, refreshToken, profile, done) => {
        try {
            done(null, profile)
        } catch (err) {
            done(err, null)
        }
    }
)