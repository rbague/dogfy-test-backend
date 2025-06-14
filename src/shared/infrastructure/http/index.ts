import express from "express"
import helmet from "helmet"

import routes from "./routes.ts"

const app = express()
app.use(express.json())
app.use(helmet())
app.use(routes)

export default function start (port: number) {
  app.listen(port, "0.0.0.0", (error?: Error) => {
    if (error) console.error(error)
      else console.log(`Server listening on http://0.0.0.0:${port}`)
  })
}