/*
  defineSchema：定义整个数据库的 schema。
  defineTable：定义单张表的结构。

  当前 schema 含义：
  有一张表叫 users
  表里有一个字段 name，类型是 v.string()（字符串）
  Convex 会自动：

  为每张表生成 _id 字段
  为每条记录生成 _creationTime 字段
*/ 

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
  })
})