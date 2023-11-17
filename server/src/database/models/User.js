const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        creationDate: {
            type: Date,
            required: true
        },
    }
)

const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;