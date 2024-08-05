import http from 'node:http'
import { Json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = http.createServer(async (request, response) => {
    const { method, url } = request;

    await Json(request, response)

    const route = routes.find(route => {
        return route.method === method && route.path === url
    })

    if (route) {
        return route.handle(request, response)
    }

    return response.writeHead(404).end()
})

server.listen(3333)