//import mongooseService from "../services/mongoose.js";
import userService from '../services/userService.js';

export default {
    async getAllUsers(req, res) {
        try {
            return res.status(200).send(await userService.getAllUsers());
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getUserById(req, res) {
        try {
            return res
                .status(200)
                .send(await userService.getUserById(req.params.id));
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async createUser(req, res) {
        try {
            return res.status(200).send(await userService.createUser(req.body));
        } catch (err) {
            res.status(500).send(err);
        }
    },
};
