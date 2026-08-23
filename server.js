const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');

require('dotenv').config();
dns.setServers([
    '8.8.8.8',
    '8.8.4.4'
]);

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)

.then(() => 
{
    console.log
    (
        'MongoDB connected successfully'
    );
})

.catch((error) => 
{

    console.log
    (
        'MongoDB connection error:',
        error
    );
});

const userSchema = new mongoose.Schema
({

    name: 
    {
        type: String,
        required: true
    },

    email: 
    {
        type: String,
        required: true
    },

    password: 
    {
        type: String,
        required: true
    },

    role: 
    {
        type: String,
        default: 'student'
    }
});

const User = mongoose.model
(
    'User',
    userSchema
);

const complaintSchema = new mongoose.Schema
({

    title: String,
    description: String,
    category: String,
    location: String,
    priority: String,
    status: 
    {
        type: String,
        default: 'Pending'
    },

    createdAt: 
    {
    type: Date,
    default: Date.now
    },

    userId: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

});

const Complaint = mongoose.model
(
    'Complaint',
    complaintSchema
);

app.get('/', (req, res) => 
{
    res.send
    (
        'Smart Campus Complaint System'
    );

});

app.post('/register', async (req, res) => 
{
    try 
    {

        const 
        {
            name,
            email,
            password,
            role
        } = req.body;

        const newUser = new User
        ({

            name: name,
            email: email,
            password: password,
            role: role || 'student'

        });

        const savedUser =
            await newUser.save();

        res.status(201).json
        (
            savedUser
        );
    }

    catch (error) 
    {

        res.status(500).json
        ({

            message:
                'Error registering user',
            error:
                error.message

        });
    }
});

app.get('/users', async (req, res) => 
{

    try 
    {

        const users =
            await User.find();
        res.json(users);

    }

    catch (error) 
    {

        res.status(500).json
        ({
            message:
                'Error getting users',
            error:
                error.message
        });
    }
});

app.post('/login', async (req, res) => 
    {

    try 
    {

        const 
        {
            email,
            password
        } = req.body;

        const user =
            await User.findOne
            ({
                email: email
            });

        if (!user) 
        {

            return res.status(404).json
            ({
                message:
                    'User not found'
            });
        }
        if 
        (
            user.password !== password
        ) 

        {
            return res.status(401).json
            ({

                message:
                    'Incorrect password'

            });

        }

        res.json
        ({

            message:
                'Login successful',
            user:
                user

        });

    }

    catch (error) 
    {

        res.status(500).json
        ({

            message:
                'Error logging in',
            error:
                error.message

        });

    }

});

app.post
(
    '/complaints',
    async (req, res) => 
    {

        try 
        {

            const 
            {

                title,
                description,
                category,
                location,
                priority,
                userId

            } = req.body;


            const newComplaint =
                new Complaint
                ({
                    title,
                    description,
                    category,
                    location,
                    priority,
                    userId
                });

            const savedComplaint =
                await newComplaint.save();

            res.status(201).json
            (
                savedComplaint
            );

        }

        catch (error) 
        {

            res.status(500).json
            ({

                message:
                    'Error creating complaint',

                error:
                    error.message

            });
        }
    }
);

app.get('/complaints', async (req, res) => 
{

    try 
    {
        const complaints =
            await Complaint.find()
                .populate('userId', 'name email');
        res.json(complaints);
    }

    catch (error) 
    {

        res.status(500).json
        ({
            message: 'Error getting complaints',
            error: error.message
        });

    }

});

app.get('/complaints/user/:userId', async (req, res) => 
    {

    try 
    {
        const complaints = await Complaint.find
        ({
            userId: req.params.userId
        });

        res.json(complaints);

    }

    catch (error) 
    {

        res.status(500).json
        ({

            message: 'Error getting user complaints',

            error: error.message

        });
    }
});

app.put
(
    '/complaints/:id',
    async (req, res) => 
        {
        try 
        {
            const updatedComplaint =
                await Complaint.findByIdAndUpdate
                (

                    req.params.id,
                    req.body,

                    {
                        new: true
                    }

                );


            if (!updatedComplaint) 
            {

                return res.status(404).json
                ({

                    message:
                        'Complaint not found'

                });

            }

            res.json
            (
                updatedComplaint
            );

        }

        catch (error) 
        {

            res.status(500).json
            ({

                message:
                    'Error updating complaint',

                error:
                    error.message

            });

        }

    }
);

app.delete
(
    '/complaints/:id',
    async (req, res) => 
        {
        try 
        {
            const deletedComplaint =
                await Complaint.findByIdAndDelete
                (
                    req.params.id
                );

            if (!deletedComplaint) 
            {

                return res.status(404).json
                ({
                    message:
                        'Complaint not found'

                });

            }

            res.json
            ({

                message:
                    'Complaint deleted successfully'

            });

        }

        catch (error) 
        {

            res.status(500).json
            ({
                message:
                    'Error deleting complaint',
                error:
                    error.message
            });
        }
    }
);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
