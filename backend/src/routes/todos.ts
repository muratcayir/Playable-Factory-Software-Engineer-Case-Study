import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Todos } from "../models/todos";
import { currentUser } from "../middlewares/current-user";  
import multer, { FileFilterCallback } from "multer";
import { NextFunction } from "express-serve-static-core";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const imageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true); 
  } else {
    cb(null, false); 
 
  }
};

const uploadThumbnail = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
}).single('thumbnail');
const uploadFiles = multer({ storage });

router.post(
  "/todos",
  [
    body("title").notEmpty().withMessage("Title must not be empty"),
    body("description").notEmpty().withMessage("Description must not be empty"),
  ],
  currentUser,
  (req: Request, res: Response, next:NextFunction) => {
    uploadThumbnail(req, res, function (error) {
      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send('File too large');
        }
        return res.status(400).send(error.message);
      } else if (error) {
        return res.status(500).send(error.message);
      }
      next();
    });
  },
  uploadFiles.array('attachments', 5),
  validateRequest,
  async (req: Request, res: Response) => {
    if (!req.currentUser) {
      return res.status(401).send("Authentication required");
    }

    const { title, description, tags, completed } = req.body;
    const userId = req.currentUser?.id;

    try {
      const todo = new Todos({
        title,
        description,
        tags,
        completed,
        createdAt: new Date(),
        user: userId,
        thumbnail: req.file?.filename,
        attachments: Array.isArray(req.files) ? (req.files as Express.Multer.File[]).map(file => file.filename) : []
      });

      await todo.save();
      res.status(201).send(todo);
    } catch (error) {
      console.error("Error adding todo:", error);
      res.status(500).send("An error occurred while adding todo");
    }
  }
);
// Tüm to-do'ları listele endpoint'i
router.get("/todos", currentUser, async (req: Request, res: Response) => {
  if (!req.currentUser) {
    return res.status(401).send("Authentication required");
  }

  const userId = req.currentUser.id
  try {
    const todos = await Todos.find({ user: userId });
    res.send(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("An error occurred while fetching todos");
  }
});

// Belirli bir to-do'yu güncelleme endpoint'i
router.put(
  "/todos/:id",
  [
    body("title").optional().notEmpty().withMessage("Title must not be empty"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description must not be empty"),
    body("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be a boolean value"),
  ],
  currentUser,
  validateRequest,
  async (req: Request, res: Response) => {
    if (!req.currentUser) {
      return res.status(401).send("Authentication required");
    }
    const userId = req.currentUser.id
    const { id } = req.params;
    const { title, description, completed, tags } = req.body;
    try {
      const todo = await Todos.findOne({ _id: id, user: userId });
      if (!todo) {
        return res.status(404).send("Todo not found");
      }

      if (title) {
        todo.title = title;
      }
      if (description) {
        todo.description = description;
      }
      if (tags) {
        todo.tags = tags;
      }
      if (completed !== undefined) {
        todo.completed = completed;
      }

      await todo.save();
      res.send(todo);
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).send("An error occurred while updating todo");
    }
  }
);

// Belirli bir to-do'yu silme endpoint'i
router.delete("/todos/:id", currentUser, async (req: Request, res: Response) => {
  if (!req.currentUser) {
    return res.status(401).send("Authentication required");
  }

  const userId = req.currentUser.id
  const { id } = req.params;
  try {
    const todo = await Todos.findOneAndDelete({ _id: id, user: userId });
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("An error occurred while deleting todo");
  }
});


// Sunucu tarafında text search endpoint'i
router.get("/todos/search", async (req, res) => {
  const searchKeyword = req.query.keyword; //
  try {
    const todos = await Todos.find({
      $or: [
        { name: { $regex: searchKeyword, $options: "i" } },
        { description: { $regex: searchKeyword, $options: "i" } },
      ],
    });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error searching todos:", error);
    res.status(500).json({ error: "An error occurred while searching todos" });
  }
});


export { router as todoRouter };
