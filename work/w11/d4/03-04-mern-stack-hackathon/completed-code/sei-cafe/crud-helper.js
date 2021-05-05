require('dotenv').config();
require('./config/database');

const User = require('./models/user');
const Item = require('./models/item');
const Category = require('./models/category');
const Order = require('./models/order');

let u, i, c, o;

