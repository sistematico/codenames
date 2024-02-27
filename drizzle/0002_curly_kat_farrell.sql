CREATE TABLE `cards` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`type` text,
	`game_session_id` integer,
	FOREIGN KEY (`game_session_id`) REFERENCES `game_sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `game_sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text,
	`is_active` integer,
	`winner` text
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`role` text,
	`team` text,
	`game_session_id` integer,
	FOREIGN KEY (`game_session_id`) REFERENCES `game_sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `sessions`;