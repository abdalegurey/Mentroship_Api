import express from "express";
import { getTasks, TaskCreate, UpdateTask,DeleteTask } from "../controllers/TasController.js";
import { taskValidationSchema } from "../Schemas/taskSchema.js";
import { validate } from "../Middlewares/validateZod.js";
import { protect } from "../Middlewares/auth.js";
const router = express.Router();

/**
 * @swagger
 * /Tasks/getTasks:
 *   get:
 *     summary: Get all tasks for the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks
 */

/**
 * @swagger
 * /Tasks/CreateTask:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *               dueDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */


router.get("/getTasks", protect, getTasks);

router.post("/CreateTask", protect, validate(taskValidationSchema),  TaskCreate);

/**
 * @swagger
 * /Tasks/UpdateTask/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put("/UpdateTask/:id", protect, validate(taskValidationSchema),UpdateTask); // Assuming you want to use the same controller for update

/**
 * @swagger
 * /Tasks/DeleteTask/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */

 router.delete("/DeleteTask/:id", protect, DeleteTask); // Uncomment if you implement a delete function

export default router;