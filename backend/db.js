// import pkg from 'pg';
// const { Pool } = pkg;

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'map',
//     password: 'ztlab128',
//     port: 5432,
// });

// export default pool;
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

export default pool