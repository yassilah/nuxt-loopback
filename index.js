import { Nuxt, Builder } from 'nuxt'

import express from 'express'
import loopback from 'loopback'
import boot from 'loopback-boot'
import explorer from 'loopback-component-explorer'
import bodyParser from 'body-parser'
import config from './nuxt.config'

import { apiURL, host, port } from './config.json'

/* Set API */
const api = loopback(), app = express()

/* Build Nuxt */
config.dev = !(process.env.NODE_ENV === 'production')
const nuxt = new Nuxt(config)

/* Build Loopback */
boot(api, 'server')
api.enableAuth()

/* Build DEV environment */
if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()

    const mountPath = `${apiURL}/explorer`
    explorer(api, { basePath: apiURL, mountPath })
    api.get(apiURL, api.loopback.status())
    console.log('Explore your REST API at %s%s\n', `${host}:${port}`, mountPath)
}

/* Use loopback for all requests starting with `/api` and Nuxt renderer for the rest */
app.all(`${apiURL}*`, api)
app.use(nuxt.render)

app.listen(port, host)
