import { mutation, query } from './_generated/server';  //I made this file
import { v } from 'convex/values';

export const listTodos = query(async ({ db }) => {
    return await db.query('todos').collect();
});

export const addTodo = mutation({
    args: {
        task: v.string(),
        priority: v.optional(v.string()),
        startDate: v.optional(v.number()),
        dueDate: v.optional(v.number()),
        description: v.optional(v.string()),
        status: v.optional(v.string()),
        categoryRole1: v.optional(v.string()),
        categoryRole2: v.optional(v.string()),
        department: v.optional(v.string()),
        team: v.optional(v.string()),
        project: v.optional(v.string()),
        fine: v.optional(v.string()),
        reasonUncomplete: v.optional(v.string()),
        deductionType: v.optional(v.string()),
        deductionAmount: v.optional(v.string()),
        assignedBy: v.optional(v.string()),
        reasonSelect: v.optional(v.string()),
        note: v.optional(v.string()),
        urgencyLevel: v.optional(v.string()),
        difficultyLevel: v.optional(v.string()),
        feedback: v.optional(v.string()),
        name: v.optional(v.string()),
        age: v.optional(v.number()),
        mobile: v.optional(v.string()),
        email: v.optional(v.string()),
        address: v.optional(v.string()),
    },
    handler: async (
        { db },
        {
            task,
            priority,
            startDate,
            dueDate,
            description,
            status,
            categoryRole1,
            categoryRole2,
            department,
            team,
            project,
            fine,
            reasonUncomplete,
            deductionType,
            deductionAmount,
            assignedBy,
            reasonSelect,
            note,
            urgencyLevel,
            difficultyLevel,
            feedback,
            name,
            age,
            mobile,
            email,
            address,
        }
    ) => {
        await db.insert('todos', {
            task,
            priority,
            startDate,
            dueDate,
            description,
            status,
            categoryRole1,
            categoryRole2,
            department,
            team,
            project,
            fine,
            reasonUncomplete,
            deductionType,
            deductionAmount,
            assignedBy,
            reasonSelect,
            note,
            completed: false,
            created_at: Date.now(),
            urgencyLevel,
            difficultyLevel,
            feedback,
            name,
            age,
            mobile,
            email,
            address,
        });
    },
});

export const toggleTodo = mutation({
    args: { id: v.id('todos') },
    handler: async ({ db }, { id }) => {
        const todo = await db.get(id);
        if (todo) {
            await db.patch(id, { completed: !todo.completed });
        }
    },
});

export const editTodo = mutation({
    args: {
        id: v.id('todos'),
        task: v.optional(v.string()),
        priority: v.optional(v.string()),
        startDate: v.optional(v.number()),
        dueDate: v.optional(v.number()),
        description: v.optional(v.string()),
        status: v.optional(v.string()),
        categoryRole1: v.optional(v.string()),
        categoryRole2: v.optional(v.string()),
        department: v.optional(v.string()),
        team: v.optional(v.string()),
        project: v.optional(v.string()),
        fine: v.optional(v.string()),
        reasonUncomplete: v.optional(v.string()),
        deductionType: v.optional(v.string()),
        deductionAmount: v.optional(v.string()),
        assignedBy: v.optional(v.string()),
        reasonSelect: v.optional(v.string()),
        note: v.optional(v.string()),
        urgencyLevel: v.optional(v.string()),
        difficultyLevel: v.optional(v.string()),
        feedback: v.optional(v.string()),
        name: v.optional(v.string()),
        age: v.optional(v.number()),
        mobile: v.optional(v.string()),
        email: v.optional(v.string()),
        address: v.optional(v.string()),
        completed: v.optional(v.boolean()),
    },
    handler: async ({ db }, args) => {
        const { id, ...updates } = args;
        await db.patch(id, updates);
    },
});