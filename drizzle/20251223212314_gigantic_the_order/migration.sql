ALTER TABLE "councilor_terms" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "councilors" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "parties" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "proposal_votes" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "proposals" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "session_proposals" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "updatedAt" DROP NOT NULL;