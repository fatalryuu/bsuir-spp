CREATE SCHEMA "spp";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spp"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"avatar_url" varchar(255) NOT NULL,
	"admin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
