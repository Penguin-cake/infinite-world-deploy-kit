ALTER TABLE submissions ADD slot integer;
--> statement-breakpoint
CREATE INDEX submissions_status_slot ON submissions(status, slot);
