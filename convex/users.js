import { v } from "convex/values";
import { mutation } from "@/convex/_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // if user already exists
    const userData = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    // if not then add new user
    if (userData?.length == 0) {
      const data = {
        name: args.name ?? "User",
        email: args.email,
        credits: 50000,
      };
      const result = await ctx.db.insert("users", {
        ...data,
      });
      // console.log(result);
      return data;
    }
    return userData[0];
  },
});

export const updateUserToken = mutation({
  args: {
    id: v.id("users"),
    credits: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      credits: args.credits,
    });
  },
});
