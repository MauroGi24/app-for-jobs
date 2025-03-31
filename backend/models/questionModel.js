import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
  user: {
    type: String,
    required: [true, 'Inserisci il nome utente'],
    trim: true,
  },
  question: {
    type: String,
    required: [true, 'Inserisci il testo della domanda'],
    trim: true,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job', // Riferimento al modello Job per associare la domanda alla job
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}); 

export default model('Question', questionSchema);