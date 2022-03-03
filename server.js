const express = require('express');     //syntax known as common js to import modules
const connectDB = require('./config/db');
const path = require('path');

//initialise express in a variable app
const app = express();

//connecting Database
connectDB();

app.use(express.json());

//mount route file
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/thought', require('./routes/thought'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
