CREATE TABLE "favourite_locations" (
	"user_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"latitude" numeric(9,6),
	"longitude" numeric(9,6),
	"timezone" text NOT NULL,
	"city" text NOT NULL,
	"province" text NOT NULL,
	"country" text NOT NULL,
	"country_code" text NOT NULL,
	CONSTRAINT "favourite_locations_pkey" PRIMARY KEY("user_id","latitude","longitude")
);
--> statement-breakpoint
ALTER TABLE "favourite_locations" ADD CONSTRAINT "favourite_locations_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;