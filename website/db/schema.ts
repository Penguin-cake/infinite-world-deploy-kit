import {sqliteTable,text,integer,index} from "drizzle-orm/sqlite-core";
export const submissions=sqliteTable("submissions",{
 id:text("id").primaryKey(),team:text("team").notNull(),title:text("title").notNull(),world:text("world").notNull(),
 entryPath:text("entry_path").notNull(),externalUrl:text("external_url"),description:text("description").notNull(),exitHook:text("exit_hook").notNull(),
 slot:integer("slot"),byteSize:integer("byte_size").notNull(),fileCount:integer("file_count").notNull(),hasRelay:integer("has_relay").notNull(),
 status:text("status").notNull().default("pending"),reviewNote:text("review_note").notNull().default(""),createdAt:text("created_at").notNull(),
},t=>[index("submissions_status_slot").on(t.status,t.slot),index("submissions_status_date").on(t.status,t.createdAt)]);
export const routes=sqliteTable("routes",{id:text("id").primaryKey(),title:text("title").notNull(),stages:text("stages").notNull(),createdAt:text("created_at").notNull()});
export const settings=sqliteTable("settings",{key:text("key").primaryKey(),value:text("value").notNull()});
