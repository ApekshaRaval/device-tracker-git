import { createServer } from 'http';
import { Server } from 'socket.io';
import multer from 'multer';
import express from 'express';
import pool from './db.js';
import cors from 'cors';
import HTTP_STATUS_CODE from './constants/constant.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

const checkAndCreateTable = async () => {
    const tableExistsQuery = `
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'users'
        );
    `;

    const createTableQuery = `
        CREATE TABLE users (
            id VARCHAR(50) PRIMARY KEY,
            name VARCHAR(100),
            lat FLOAT,
            lang FLOAT,
            profile_pic VARCHAR(255)
        );
    `;

    try {
        const result = await pool.query(tableExistsQuery);
        const tableExists = result.rows[0].exists;

        if (!tableExists) {
            await pool.query(createTableQuery);
            console.log('Table "users" created successfully.');
        }
    } catch (err) {
        console.error('Error checking or creating table:', err.message);
    }
};

app.post('/add-user', upload.single('profilePic'), async (req, res) => {
    await checkAndCreateTable();

    const { id, name, lat, lang } = req.body;
    const profilePic = req.file ? req.file.filename : null;

    if (!id || !name || !lat || !lang) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
            status: HTTP_STATUS_CODE.BAD_REQUEST,
            errorCode: "ERR400",
            message: "All fields are required",
            data: null,
            error: "",
        });
    }

    try {
        const newUser = await pool.query(
            'INSERT INTO users (id, name, lat, lang, profile_pic) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, name, lat, lang, profilePic]
        );

        const user = newUser.rows[0];
        io.emit('new-user', user);
        return res.status(HTTP_STATUS_CODE.OK).json({
            status: HTTP_STATUS_CODE.OK,
            errorCode: "SUC000",
            message: "User Added Successfully",
            data: user,
            error: "",
        });
    } catch (err) {
        console.error('Error adding user:', err.message);
        return res.status(HTTP_STATUS_CODE.SERVER_ERROR).json({
            status: HTTP_STATUS_CODE.SERVER_ERROR,
            errorCode: "ERR500",
            message: "Internal Server Error!",
            data: null,
            error: err,
        });
    }
});

app.get('/users', async (req, res) => {
    await checkAndCreateTable();

    try {
        const users = await pool.query('SELECT * FROM users');
        return res.status(HTTP_STATUS_CODE.OK).json({
            status: HTTP_STATUS_CODE.OK,
            errorCode: "SUC000",
            message: "Users Retrieved Successfully",
            data: users.rows,
            error: "",
        });
    } catch (err) {
        console.error('Error fetching users:', err.message);
        return res.status(HTTP_STATUS_CODE.SERVER_ERROR).json({
            status: HTTP_STATUS_CODE.SERVER_ERROR,
            errorCode: "ERR500",
            message: "Internal Server Error!",
            data: null,
            error: err,
        });
    }
});

app.get('/', (req, res) => {
    return res.status(HTTP_STATUS_CODE.OK).json({
        status: HTTP_STATUS_CODE.OK,
        errorCode: "SUC000",
        message: "Hello from here!",
        data: null,
        error: "",
    });
});

app.post('/logout', async (req, res) => {
    await checkAndCreateTable();

    const { id } = req.body;
    if (!id) {
        console.error('User ID not provided');
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
            status: HTTP_STATUS_CODE.BAD_REQUEST,
            errorCode: "ERR400",
            message: "User ID not provided",
            data: null,
            error: "",
        });
    }

    try {
        const deleteUser = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (deleteUser.rowCount === 0) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
                status: HTTP_STATUS_CODE.NOT_FOUND,
                errorCode: "ERR404",
                message: "User not found",
                data: null,
                error: "",
            });
        }
        return res.status(HTTP_STATUS_CODE.OK).json({
            status: HTTP_STATUS_CODE.OK,
            errorCode: "SUC000",
            message: "User Deleted Successfully",
            data: deleteUser.rows[0],
            error: "",
        });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        return res.status(HTTP_STATUS_CODE.SERVER_ERROR).json({
            status: HTTP_STATUS_CODE.SERVER_ERROR,
            errorCode: "ERR500",
            message: "Internal Server Error!",
            data: null,
            error: err,
        });
    }
});

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});

io.on('connection', (socket) => {
    console.log('socket user is connected: ', socket.id);

    socket.on('add-user', async (data) => {
        // Handle 'add-user' event
    });

    socket.on('send-location', async (data) => {
        const { id, lat, lang } = data;

        try {
            const updateLocation = await pool.query(
                'UPDATE users SET lat = $1, lang = $2 WHERE id = $3 RETURNING *',
                [lat, lang, id]
            );

            const updatedUser = updateLocation.rows[0];
            if (updatedUser) {
                io.emit('location', { id, lat, lang });
                console.log(`Updated location for user ${id}`);
            } else {
                console.error(`User with id ${id} not found`);
            }
        } catch (err) {
            console.error('Error updating location:', err.message);
        }
    });

    socket.on('disconnect', () => {
        io.emit('user-disconnect', socket.id);
    });
});
