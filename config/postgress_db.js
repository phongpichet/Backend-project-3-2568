const express = require('express');
const Sequelize = require('sequelize');
const app = express();

// parse incoming requests
app.use(express.json());

//set db url
const dbUrl = 'postgres://webadmin:EMBbtb44770@node42125-pannawat.proen.app.ruk-com.cloud:11511/Books'

// create aconnection to the Database
const sequelize = new Sequelize(dbUrl);