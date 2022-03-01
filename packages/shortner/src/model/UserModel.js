import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "Bruno Ferreira" },
    email: { type: String, required: true, },
    state: {
        type: String,
        enum: ["PE", "AL", "PA", "BA", "MT", "Other"]
    },
    password: String,
    birthSate: Date,
    phones: [String]
}, {
    timestamps: true,
})

const UserModel = mongoose.model("user", UserSchema)

export default UserModel

// import crypto from 'crypto'

// const users = [{
//     id: crypto.randomUUID(),
//     name: 'Bruno',
//     city: 'Cuiabá'
// }]

// export default users;
