import { app } from './app'

export async function initializeServer(port: number) {
    app.listen(port, () => {
        console.log('[DASHBOARD] Ready')
    })
}