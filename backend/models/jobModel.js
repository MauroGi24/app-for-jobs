import { Schema, model } from 'mongoose'

const jobSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Inserisci un titolo'],
    minlength: [3, 'Il titolo deve avere almeno 3 caratteri'],
    maxlength: [100, 'Il titolo non può superare i 100 caratteri'],
    trim: true
  },
  salary: {
    base: {
      type: Number,
      required: [true, 'Inserisci lo stipendio base'],
      min: [0, 'Lo stipendio base deve essere un numero positivo'],
      validate: {
        validator: Number.isInteger,
        message: 'Lo stipendio base deve essere un numero intero'
      }
    },
    equity: {
      type: String,
      trim: true,
    },
    bonus: {
      type: Number,
      validate: {
        validator: function(value) {
          return value === null || Number.isInteger(value); // Aggiungiamo null per superare validazione se l'utente lascia il campo vuoto
        },
        message: 'Il bonus deve essere un numero intero',
      }
    },
  },
  benefits: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Inserisci una descrizione'],
    minlength: [10, 'La descrizione deve avere almeno 10 caratteri'],
    trim: true,
  },
  team_info: {
    type: String,
    trim: true,
  },
  stock_options: {
    percentage: {
      type: Number,
      min: [0, 'La percentuale di stock options deve essere tra 0 e 100'],
      max: [100, 'La percentuale di stock options deve essere tra 0 e 100'],
    },
    estimated_value: {
      type: Number,
      min: [0, 'Il valore stimato delle stock options deve essere un numero positivo'],
    },
  },
    
}, {
  timestamps: true, // Abilita la gestione automatica di updatedAt
  toJSON: { virtuals: true }, // Assicura che le virtuals siano incluse nel JSON
  toObject: { virtuals: true }, // Assicura che le virtuals siano incluse negli oggetti
});

jobSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'job',
});

export default model("Job", jobSchema);

