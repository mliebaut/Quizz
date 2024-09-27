import mongoose, {Model, Schema, Types} from "mongoose";

export type Question = {
    _id: Types.ObjectId;
    question: string;
    answer: string;
    formatted(): QuestionFormatted
    updateQuestion(this: Question, dataToUpdate: QuestionUpdateData): Promise<Question>
    deleteQuestion(this: Question): Promise <void>;
    getByRandomId(this: Question): Promise<Question[]>
    save(): Promise<void>;
}

type QuestionStatic = Model<Question> & {
    all(): Promise<Question[]>
    isExisting(question: string): Promise<boolean>
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
    formatted(this: Question): QuestionFormatted {
        console.log("-formattage ")
        return {
            id: this._id.toString(),
            question: this.question,
            answer: this.answer,
        }
    },
    async updateQuestion(this: Question,
                         dataToUpdate: {
                             question?: string,
                             answer?: string,
                         }) {
        this.question = dataToUpdate.question === undefined ? this.question : dataToUpdate.question
        this.answer = dataToUpdate.answer === undefined ? this.answer : dataToUpdate.answer
        console.log("je suis dans la méthode updateQuestion")
        await this.save();
    },

    async deleteQuestion(this: Question) {
        const query = {id: this._id};
        console.log("coucou depuis la méthode deleteQuestion")
        console.log(query)
        console.log(query.id)

        await QuestionModel.deleteOne(query.id);
    },
    async getByRandomId(this: Question){
        console.log("in getrandomId")
    }
};

questionSchema.statics = {
    async all(): Promise<Question[]> {
        return QuestionModel.find({});
    },
    async isExisting(question: string): Promise<boolean> {
        const existingQuestion = await QuestionModel.findOne({question: question});
        return existingQuestion !== null;
    }
};

export const QuestionModel = mongoose.model<Question, QuestionStatic>('Question', questionSchema);