const { StatusCodes } = require("http-status-codes");
const authService = require("../services/authService");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/authValidator");

const createCookie = (res, token) => {
	res.cookie("token", token, {
		httpOnly: true,
		secure: true,
		sameSite: "Lax",
		maxAge: 12 * 60 * 60 * 1000,
	});
};

const register = async (req, res) => {

	const { error } = registerSchema.validate(req.body);
	if (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
	}

	try {
		const { username, password, dob } = req.body;
		const user = await authService.register(username, password, dob);

		const token = jwt.sign(
			{ user_id: user.user_id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE || "12h" }
		);

		createCookie(res, token);
		res.status(StatusCodes.CREATED).json({ success: true });
	} catch (err) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
	}
};

const login = async (req, res) => {
	const { error } = loginSchema.validate(req.body);
	if (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
	}
	try {
		const { username, password } = req.body;
		const user = await authService.login(username, password);

		const token = jwt.sign(
			{ user_id: user.user_id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE || "12h" }
		);

		createCookie(res, token);
		res.status(StatusCodes.OK).json({ success: true });
	} catch (err) {
		res.status(StatusCodes.UNAUTHORIZED).json({ error: err.message });
	}
};

const logout = (req, res) => {
	res.clearCookie("token");
	res.status(StatusCodes.OK).json({ message: "Logged out" });
};

module.exports = {
	register,
	login,
	logout,
};
