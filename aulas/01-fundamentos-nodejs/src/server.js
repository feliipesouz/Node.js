import http from 'node:http'
import { Json } from './middlewares/json.js';
import { Database } from './database.js';

const database = new Database()

const server = http.createServer(async (request, response) => {
    const { method, url } = request;

    await Json(request, response)

    if (method === "GET" && url === '/users') {
        const users = database.select('users')
        return response
            .end(JSON.stringify(users))
    }

    if (method === "POST" && url === "/users") {
        const { name, email } = request.body

        const user = {
            id: 1,
            name,
            email
        }

        database.insert('users', user)

        return response.writeHead(201).end('Criação de usuário')
    }
    return response.writeHead(404).end()
})

server.listen(3333)