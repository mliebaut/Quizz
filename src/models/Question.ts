import mongoose, {Model, Schema, Types} from "mongoose";
import {User} from "./User";

export type Question = {
    _id: Types.ObjectId;
    question: string;
    answer: string;
    formatted(): QuestionFormatted
    updateQuestion(this: Question, dataToUpdate: QuestionUpdateData): Promise<Question>
    //save(): Promise<void>;
}

type QuestionStatic = Model<Question> & {
    all(): Promise<Question[]>
    //isExisting(question: string): Promise<boolean>
}

type QuestionFormatted = {
    id: string;
    question: string;
    answer: string;

}

export type QuestionUpdateData = {
    question?: string;
    answer?: string;
}

const questionSchema = new Schema<Question>({
    question: {type: String, required: true},
    answer: {type: String, required: true},
})

questionSchema.methods = {
    formatted(this: User): QuestionFormatted {
        return {
            id: this._id.toString(),
            question: this.question,
            answer: this.answer,
        }
    }
};

userSchema.statics = {

};

export const UserModel = mongoose.model<Question, UserStatic>('Question', userSchema);