const config = {
    user: 'viethq',
    password: '123456',
    server: 'localhost',
    database: 'icool_karaoke_v7',
    pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 30000
    },
    parseJSON: true
};

module.exports = config;
