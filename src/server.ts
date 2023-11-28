import { app } from "./app"
import { config } from "./config"
import { mongodbConnection } from "./database/mongodb.connect"


export const startServer = async () => {

    await mongodbConnection()

    app.listen(config.port, () => {
        console.log(`Food haven app listening on port ${config.port}`)
    })
}

startServer()