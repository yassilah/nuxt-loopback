import { Nuxt, Builder } from 'nuxt'

import express from 'express'
import loopback from 'loopback'
import boot from 'loopback-boot'
import explorer from 'loopback-component-explorer'
import cookieParser from 'cookie-parser'
import config from './nuxt.config'

import { apiURL, host, port } from './config.json'

/* Set API */
const app = loopback()

/* Build Nuxt */
config.dev = !(process.env.NODE_ENV === 'production')
const nuxt = new Nuxt(config)

/* Build Loopback */
boot(app, 'server')
app.use(cookieParser('super-secret-key'))
app.use(loopback.token({
    cookies: ['AuthToken'],
    model: app.models.AccessToken
}))
app.enableAuth()

/* Build DEV environment */
if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
    const mountPath = `${apiURL}/explorer`
    explorer(app, { basePath: apiURL, mountPath })
    app.get(apiURL, app.loopback.status())
    console.log('Explore your REST API at %s%s\n', `${host}:${port}`, mountPath)
}

/* Use loopback for all requests starting with `/api` ... */
app.all(new RegExp(`^${apiURL}.*`), app.loopback.Router())

/* ... and Nuxt renderer for other requests */
app.all(new RegExp(`^(?!${apiURL}).*`), nuxt.render)

/* Listen to the app */
app.listen(port, host)
