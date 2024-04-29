import mongoose, { Schema, Document } from "mongoose";

interface TodosAttrs {
  title: string;
  description: string;
  tags?: string[];
  completed?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  user: string; 
  thumbnail?: string; 
  attachments?: string[]; 
}

interface TodosModel extends mongoose.Model<TodosDoc> {
  build(attrs: TodosAttrs): TodosDoc;
}

interface TodosDoc extends Document {
  title: string;
  description: string;
  tags?: string[];
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: string;  
  thumbnail?: string;
  attachments?: string[];
}

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,  
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now, 
  },
  
  user: {
    type: String, 
    ref: 'User',
    required: true
  },
  thumbnail: { 
    type: String, 
    default: null
  },
  attachments: {
    type: [String], 
    default: []
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

todoSchema.pre<TodosDoc>('save', function (next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

todoSchema.statics.build = (attrs: TodosAttrs) => {
  return new Todos(attrs);
}

const Todos = mongoose.model<TodosDoc, TodosModel>("Todos", todoSchema);

export { Todos };
