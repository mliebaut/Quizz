import mongoose, {Model, Schema, Types} from "mongoose";

export enum GenreEnum {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export type User = {
    _id: Types.ObjectId;
    firstName: string;
    name: string;
    genre: GenreEnum;
    birthDate: number;
    email: string;
    password: string;
    createdAt: number;
    updatedAt: number;
    formatted(): UserFormatted
    updateUser(this: User, dataToUpdate: UserUpdateData): Promise<User>
    save(): Promise<void>;
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

export type UserUpdateData = {
    firstName?: string;
    name?: string;
    genre?: GenreEnum;
    birthDate?: number;
    email?: string;
    password?: string;
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
    async updateUser(this: User, dataToUpdate: UserUpdateData): Promise<User> {
        this.email = dataToUpdate.email ?? this.email;
        this.password = dataToUpdate.password ?? this.password;
        this.name = dataToUpdate.name ?? this.name;
        this.firstName = dataToUpdate.firstName ?? this.firstName;
        this.genre = dataToUpdate.genre ?? this.genre;
        await this.save();
        return this;
    }
};

userSchema.statics = {
    async all(): Promise<User[]> {
        return UserModel.find({});
    },
    async isExisting(email: string): Promise<boolean> {
        const existingUser = await UserModel.find({email});
        return existingUser !== null;
    }
};

export const UserModel = mongoose.model<User, UserStatic>('User', userSchema);