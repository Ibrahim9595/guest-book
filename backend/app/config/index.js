export default {
    env: 'dev',
    dev: {
        secret: '',
        port: 3000,
        database: {
            uri: 'mongodb://localhost:27017/test'
        }
    }
}
