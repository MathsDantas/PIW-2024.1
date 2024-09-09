import  express  from 'express'
import userRoutes from './routes/userRoutes'
import { AppDataSource } from './DataSource'
import authRotes from './routes/authRouter'
import postoRoutes from './routes/postoRoutes'


async function startServer () {
    try{
        await AppDataSource.initialize()

    
        const app = express()
        const port = 3000
        
        app.use(express.json())
        app.use('/', authRotes)
        app.use('/users', userRoutes)
        app.use('/postos', postoRoutes)
        
        
        app.listen(port, () => {
            console.log(`Servidor escutanto na porta ${port} em http://localhost:${port}`)
        })
    }
    catch(e) {
        throw e
    }
         
    }


startServer()

