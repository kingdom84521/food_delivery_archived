const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const salt = 8
const Schema = mongoose.Schema

const userSchema = new Schema({
    id: { type: String, required: true, unique: true },
    account: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    birth: { type: Date, required: true },
    auth: { 
            type: [String],
            required: true,
            enum: ["USER","STORE","EMPLOYEE","VILLAGECHIEF"] 
          },
    employee_id: { type: Schema.Types.ObjectId, ref: "Employee" }
}, {
    timestamps: true
})

userSchema.methods.setPassword = async function( pswd ) {
    const hashpswd = await bcrypt.hash( pswd, salt )
    this.password = hashpswd
}

userSchema.methods.checkPassword = async function( pswd ) {
    const result = await bcrypt.compare( pswd, this.password )
    return result
}

module.exports = mongoose.model( "User", userSchema )

