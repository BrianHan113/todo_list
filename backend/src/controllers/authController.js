const { StatusCodes } = require("http-status-codes")
const authService = require("../services/authService")

const register = async (req, res) => {
	try {
		const { username, password, dob } = req.body
		const { token, user } = await authService.register(username, password, dob)
		res.status(StatusCodes.CREATED).json({ token, user })
	} catch (err) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: err.message })
	}
}

const login = async (req, res) => {
	try {
		const { username, password } = req.body
		const { token, user } = await authService.login(username, password)
		res.status(StatusCodes.OK).json({ token, user })
	} catch (err) {
		res.status(StatusCodes.UNAUTHORIZED).json({ error: err.message })
	}
}

module.exports = {
	register,
	login
}