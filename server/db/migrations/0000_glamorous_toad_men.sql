CREATE TABLE `player` (
	`steam_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`player_uid` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
