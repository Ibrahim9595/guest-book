export default {
    env: 'dev',
    dev: {
        secret: '',
        port: 3300,
        database: {
            uri: 'mongodb://localhost:27017/test'
        }
    },
    prod: {
        secret: '',
        port: 80,
        database: {
            uri: 'mongodb://localhost:27017/production'
        }
    }
}
