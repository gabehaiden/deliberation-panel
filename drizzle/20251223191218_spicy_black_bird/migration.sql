CREATE TYPE "vote_enum" AS ENUM('yes', 'no', 'abstain');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "councilor_terms" (
	"id" serial PRIMARY KEY,
	"councilorId" integer NOT NULL,
	"termStart" date NOT NULL,
	"termEnd" date NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "councilors" (
	"id" serial PRIMARY KEY,
	"name" varchar NOT NULL,
	"partyId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parties" (
	"id" serial PRIMARY KEY,
	"name" varchar NOT NULL,
	"code" varchar NOT NULL,
	"acronym" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposal_status" (
	"id" serial PRIMARY KEY,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposal_votes" (
	"id" serial PRIMARY KEY,
	"sessionProposalId" integer NOT NULL,
	"councilorId" integer NOT NULL,
	"vote" "vote_enum",
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposals" (
	"id" serial PRIMARY KEY,
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"authorId" integer NOT NULL,
	"statusId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"protocol" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposal_stages" (
	"id" serial PRIMARY KEY,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session_proposals" (
	"id" serial PRIMARY KEY,
	"sessionId" integer NOT NULL,
	"proposalId" integer NOT NULL,
	"stageId" integer NOT NULL,
	"order" integer NOT NULL,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session_types" (
	"id" serial PRIMARY KEY,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY,
	"presidentId" integer NOT NULL,
	"sessionType" integer NOT NULL,
	"notes" text,
	"startedAt" timestamp NOT NULL,
	"finishedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "councilor_terms" ADD CONSTRAINT "councilor_terms_councilorId_councilors_id_fkey" FOREIGN KEY ("councilorId") REFERENCES "councilors"("id");--> statement-breakpoint
ALTER TABLE "councilors" ADD CONSTRAINT "councilors_partyId_parties_id_fkey" FOREIGN KEY ("partyId") REFERENCES "parties"("id");--> statement-breakpoint
ALTER TABLE "proposal_votes" ADD CONSTRAINT "proposal_votes_sessionProposalId_session_proposals_id_fkey" FOREIGN KEY ("sessionProposalId") REFERENCES "session_proposals"("id");--> statement-breakpoint
ALTER TABLE "proposal_votes" ADD CONSTRAINT "proposal_votes_councilorId_councilors_id_fkey" FOREIGN KEY ("councilorId") REFERENCES "councilors"("id");--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_authorId_councilors_id_fkey" FOREIGN KEY ("authorId") REFERENCES "councilors"("id");--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_statusId_proposal_status_id_fkey" FOREIGN KEY ("statusId") REFERENCES "proposal_status"("id");--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_categoryId_categories_id_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id");--> statement-breakpoint
ALTER TABLE "session_proposals" ADD CONSTRAINT "session_proposals_sessionId_sessions_id_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id");--> statement-breakpoint
ALTER TABLE "session_proposals" ADD CONSTRAINT "session_proposals_proposalId_proposals_id_fkey" FOREIGN KEY ("proposalId") REFERENCES "proposals"("id");--> statement-breakpoint
ALTER TABLE "session_proposals" ADD CONSTRAINT "session_proposals_stageId_proposal_stages_id_fkey" FOREIGN KEY ("stageId") REFERENCES "proposal_stages"("id");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_presidentId_councilors_id_fkey" FOREIGN KEY ("presidentId") REFERENCES "councilors"("id");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_sessionType_session_types_id_fkey" FOREIGN KEY ("sessionType") REFERENCES "session_types"("id");