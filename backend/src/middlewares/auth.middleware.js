import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET


export const AuthMiddleware = (request, response, next) => {//posso exporta diretamente a constatne porque é a unica importação no arquivo
    const { authorization } = request.headers
    console.log(request.url);

    if (request.url === "/api/login" || (request.url === "/api/users" && request.method === "POST")) {
        return next()
    }

    if (!authorization) {
        return response.status(401).json({ message: "Authorization not faound" })
    }

    const [, token] = authorization.split(" ")

    try {
        const payload = jsonwebtoken.verify(token, JWT_SECRET)

        request.loggedUser = payload;//compartilhando informações atraves do contexto pelo request
    } catch (error) {
        return response.status(401).json({ message: "Token Invalid" })
    }

    next()
}