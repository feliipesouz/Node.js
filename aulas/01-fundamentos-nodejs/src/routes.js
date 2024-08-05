import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()
export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/users"),
        handle: (req, res) => {
            const users = database.select('users')
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handle: (req, res) => {
            const { name, email } = req.body

            const user = {
                id: randomUUID(),
                name,
                email
            }

            database.insert('users', user)

            return res.writeHead(201).end('Criação de usuário.')
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath('/users/:id'),
        handle: (req, res) => {
            return res.end()
        }
    }
] 