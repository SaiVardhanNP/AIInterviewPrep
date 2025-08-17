import Question from "../models/Question.js";
import Session from "../models/Session.js";

export const addQuestionsToSession = async (req, res) => {
    try{
            const { sessionId, questions} = req.body;
            if (!sessionId || !questions || !Array.isArray(questions)) {
                return res.status(400).json({ message: "Invalid request data" });
            }
            const session = await Session.findById(sessionId);
            if (!session) {
                return res.status(404).json({ message: "Session not found" });
            }
            const createdQuestions= await Question.insertMany(questions.map(q => ({ 
                session: sessionId,
                question: q.question,
                answer: q.answer,
            })));
            
            session.questions.push(...createdQuestions.map(q => q._id));
            await session.save();
            res.status(201).json({ message: "Questions added to session", questions: createdQuestions });
    }
    catch(error){
        console.error("Error adding questions to session:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const togglePinQuestion = async (req, res) => {
    try{
        const question=await Question.findById(req.params.id);
        if(!question){
            return res.status(404).json({ message: "Question not found" });
        }
        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({ message: "Question pin status updated", question });
    }
    catch(error){
        console.error("Error toggling pin question:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}

export const updateQuestionNote = async (req, res) => {
    try{
            const { note } = req.body;
            const question = await Question.findById(req.params.id);
            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }
            question.note = note;
            await question.save();
            res.status(200).json({ message: "Question note updated", question });
            
    }
    catch(error){
        console.error("Error updating question note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
