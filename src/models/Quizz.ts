import mongoose, {Model, Schema, Types} from "mongoose";

export type Quizz = {
    _id: Types.ObjectId;
    title: string;
    questions: Types.ObjectId[];
    currentQuestionIndex: number;
    formatted(): QuizzFormatted;
    deleteQuizz(this: Quizz): Promise <void>;
}

type QuizzStatic = Model<Quizz> & {
    all(): Promise<Quizz[]>
    isExisting(quizz: string): Promise<boolean>
}

type QuizzFormatted = {
    id: string;
    title: string;
    questions: Types.ObjectId[];
}

const quizzSchema = new Schema<Quizz>({
    title: {type: String, required: true},
    questions: { type: [Schema.Types.ObjectId], required: true }
})

quizzSchema.methods = {
    formatted(this: Quizz): QuizzFormatted {
        console.log("-formattage ")
        return {
            id: this._id.toString(),
            title: this.title,
            questions: this.questions
        }
    },
    async deleteQuizz(this: Quizz) {
        const query = {id: this._id};
        console.log("coucou depuis la methode deleteQuizz")
        console.log(query)
        console.log(query.id)

        await QuizzModel.deleteOne(query.id)
    }
}

quizzSchema.statics = {
    async all(): Promise<Quizz[]> {
        return this.find({});
    },
    async isExisting(title: string): Promise<boolean> {
        const existingQuizz = await this.findOne({ title });
        return existingQuizz !== null;
    }
}

export const QuizzModel = mongoose.model<Quizz, QuizzStatic>('Quiz', quizzSchema);