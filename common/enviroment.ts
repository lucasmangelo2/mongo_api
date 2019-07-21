export const enviroment = {
    server: {port : process.env.SERVER_PORT || 3005},
    db: {url: process.env.DB_URL || 'mongodb://localhost/api-test'},
    security:{ 
        saltRounds: process.env.SALT_ROUNDS || 10
    }
}