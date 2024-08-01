import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'map',
    password: 'ztlab128',
    port: 5432,
});

export default pool;
