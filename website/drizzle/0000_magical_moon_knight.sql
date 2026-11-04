CREATE TABLE `routes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`stages` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`team` text NOT NULL,
	`title` text NOT NULL,
	`world` text NOT NULL,
	`entry_path` text NOT NULL,
	`description` text NOT NULL,
	`exit_hook` text NOT NULL,
	`byte_size` integer NOT NULL,
	`file_count` integer NOT NULL,
	`has_relay` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`review_note` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `submissions_status_date` ON `submissions` (`status`,`created_at`);