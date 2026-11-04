CREATE TABLE "units" (
	"user_id" text PRIMARY KEY,
	"temperature" varchar(20) DEFAULT 'celcius' NOT NULL,
	"wind_speed" varchar(10) DEFAULT 'kmh' NOT NULL,
	"precipitation" varchar(20) DEFAULT 'milimeters' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "units" ADD CONSTRAINT "units_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;