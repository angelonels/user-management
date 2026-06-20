CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`primary_mobile` varchar(15) NOT NULL,
	`secondary_mobile` varchar(15),
	`aadhaar` varchar(12) NOT NULL,
	`pan` varchar(10) NOT NULL,
	`date_of_birth` date NOT NULL,
	`place_of_birth` varchar(100) NOT NULL,
	`current_address` text NOT NULL,
	`permanent_address` text NOT NULL,
	`is_permanent_address_same_as_current` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_primary_mobile_unique` UNIQUE(`primary_mobile`),
	CONSTRAINT `users_aadhaar_unique` UNIQUE(`aadhaar`),
	CONSTRAINT `users_pan_unique` UNIQUE(`pan`)
);
--> statement-breakpoint
CREATE INDEX `users_deleted_at_idx` ON `users` (`deleted_at`);--> statement-breakpoint
CREATE INDEX `users_created_at_idx` ON `users` (`created_at`);--> statement-breakpoint
CREATE INDEX `users_name_idx` ON `users` (`name`);