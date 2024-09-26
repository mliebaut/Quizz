import mongoose, {Model, Schema, Types} from "mongoose";

export enum GenreEnum {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

type User = {
    _id: Types.ObjectId;
    firstName: string;
    name: string;
    genre: GenreEnum;
    birthDate: number;
    email: string;
    password: string;
    createdAt: number;
    updatedAt: number;
    save(): Promise <void>;
    formatted(): UserFormatted
    updateUserInfos(dataToUpdate: {
        firstname?: string,
        name?: string,
        genre?: GenreEnum,
        birthDate?: number,
        email?: string
    }): Promise <void>;
    deleteUser(): Promise <void>;
}

type UserStatic = Model<User> & {
    all(): Promise<User[]>
    isExisting(email: string): Promise<boolean>
}

type UserFormatted = {
    id: string;
    firstName: string;
    name: string;
    genre: GenreEnum;
    birthDate: number;
    email: string;
    createdAt: number;
    updatedAt: number;
}

const userSchema = new Schema<User>({
    firstName: {type: String, required: true},
    name: {type: String, required: true},
    genre: {type: String, enum: Object.values(GenreEnum), required: true},
    birthDate: {type: Number, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Number, required: true, default: Date.now},
    updatedAt: {type: Number, required: true, default: Date.now}
})

userSchema.methods = {
    formatted(this: User): UserFormatted {
        return {
            id: this._id.toString(),
            firstName: this.firstName,
            name: this.name,
            genre: this.genre,
            birthDate: this.birthDate,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    },
    async updateUserInfos(this: User,
                          dataToUpdate: {
                              firstname?: string,
                              name?: string,
                              genre?: GenreEnum,
                              birthDate?: number,
                              email?: string
                          })
    {
        this.firstName = dataToUpdate.firstname === undefined ? this.firstName :dataToUpdate.firstname
        this.name = dataToUpdate.name === undefined ? this.name :dataToUpdate.name
        this.genre = dataToUpdate.genre === undefined ? this.genre :dataToUpdate.genre
        this.birthDate = dataToUpdate.birthDate === undefined ? this.birthDate :dataToUpdate.birthDate
        this.email = dataToUpdate.email === undefined ? this.email :dataToUpdate.email
        await this.save();
    },

    async deleteUser(this: User)
    {
        const query = {id: this._id};
        console.log("Tentative de suppression user")
        console.log(query)
        console.log(query.id)
        UserModel.deleteOne(query.id);
    }

};

userSchema.statics = {
    async all(): Promise<User[]> {
        return UserModel.find({});
    },
    async isExisting(email: string): Promise<boolean> {
        const existingUser = await UserModel.findOne({email: email})
        return existingUser !== null;
    }
}
export const UserModel = mongoose.model<User, UserStatic>('User', userSchema);