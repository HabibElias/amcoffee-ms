ALTER TABLE `order` ADD `user_id` integer NOT NULL REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `withdraw` ADD `user_id` integer NOT NULL REFERENCES user(id);