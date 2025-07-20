const { StatusCodes } = require("http-status-codes")
const authService = require("../services/authService")

const register = async (req, res) => {
	try {
		const { username, password, dob } = req.body
		const user = await authService.register({ username, password, dob })
		res.status(StatusCodes.CREATED).json({ user })
	} catch (err) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: err.message })
	}
}

const login = async (req, res) => {
	try {
		const { username, password } = req.body
		const { user, token } = await authService.login(username, password)
		res.status(StatusCodes.OK).json({ user, token })
	} catch (err) {
		res.status(StatusCodes.UNAUTHORIZED).json({ error: err.message })
	}
}

module.exports = {
	register,
	login
}