import { defineSchema, defineTable } from 'convex/server';  //I made this file
import { authTables } from "@convex-dev/auth/server";
import { v } from 'convex/values';

export default defineSchema({
    ...authTables,
    todos: defineTable({
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
        completed: v.boolean(),
        created_at: v.number(),
        urgencyLevel: v.optional(v.string()),
        difficultyLevel: v.optional(v.string()),
        feedback: v.optional(v.string()),
        name: v.optional(v.string()),
        age: v.optional(v.number()),
        mobile: v.optional(v.string()),
        email: v.optional(v.string()),
        address: v.optional(v.string()),
    }),
});