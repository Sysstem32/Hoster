import { config } from 'dotenv'
config()

export default {
    client: {
        id: '886040334277148692',
        secret: 'p0EMUOoB1GF39cltJETh-RptG_nkhoE1'
    },
    api: {
        secret: 'fkWkgwkagOAWgkWGkoqKGWOQGka',
        callback: 'https://3000-moccasin-catshark-spomxjkt.ws-us15.gitpod.io/oauth/redirect',
        prefix: '/'
    },
    database: {
        uri: process.env.DATABASE_URI
    }
}