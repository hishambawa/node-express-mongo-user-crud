const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { UserDao } = require("./repository/userDao");
const userHandler = require("./userHandler");

// parse the request body as JSON
app.use(express.json());

// custom middleware to log the request
app.use((req, res, next) => {
	console.log("Request logged:", req.method, req.path, JSON.stringify(req.body));
	next();
});

// error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		message: "Something went wrong",
		error: err.message,
	});
});

// crud routes
const userDao = new UserDao();
userHandler.addHandlers(app, userDao);

// start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
