export default {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "b00b00",
    DB: 'TestTaskHighLoad',
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}