import mongoose from "mongoose";

const ShortnerSchema = new mongoose.Schema({
    link: { tyoe: String, required: true },
    hash: { tyoe: String, required: true },
    hits: { tyoe: Number, default: 0 },
    metadadata: [
        mongoose.SchemaTypes.Mixed
    ],
    ownerId: { type: mongoose.SchemaType.ObjectId, ref: 'user' }
}, {
    timestamps: true
})

const ShortnerModel = mongoose.model("shortner", ShortnerSchema)

export default ShortnerSchema