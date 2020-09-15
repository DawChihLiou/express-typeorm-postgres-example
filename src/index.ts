import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { createPostgresConnection } from './db'
import { routes } from './routes'
import { createLogger } from '@utils/logger'
import errorMiddleware from '@middlewares/errorMiddleware'

const log = createLogger('boostrap')

createPostgresConnection()
  .then(async () => {
    const app = express()
    app.use(bodyParser.json())

    routes.forEach((route) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      app[route.method](
        route.path,
        (req: Request, res: Response, next: NextFunction) => {
          route
            .action(req, res, next)
            .then(() => next)
            .catch((error: any) => next(error))
        }
      )
    })

    app.use(errorMiddleware)

    app.listen(3000)

    log('Application is running on port 3000')
  })
  .catch((error) => {
    log('Application failed to launch %O', error)
  })
