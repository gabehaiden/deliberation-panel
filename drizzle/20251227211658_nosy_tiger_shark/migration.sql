CREATE TYPE "vote_enum" AS ENUM('yes', 'no', 'abstain');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "councilor_terms" (
	"id" serial PRIMARY KEY,
	"councilor_id" integer NOT NULL,
	"term_start" date NOT NULL,
	"term_end" date NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE "councilors" (
	"id" serial PRIMARY KEY,
	"name" varchar NOT NULL,
	"party_id" integer NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE "parties" (
	"id" serial PRIMARY KEY,
	"name" varchar NOT NULL,
	"code" varchar NOT NULL,
	"acronym" varchar NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE "proposal_status" (
	"id" serial PRIMARY KEY,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposal_votes" (
	"id" serial PRIMARY KEY,
	"session_proposal_id" integer NOT NULL,
	"councilor_id" integer NOT NULL,
	"vote" "vote_enum",
	"notes" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE "proposals" (
	"id" serial PRIMARY KEY,
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"author_id" integer NOT NULL,
	"status_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"protocol" varchar NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE "proposal_stages" (
	"id" serial PRIMARY KEY,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session_proposals" (
	"id" serial PRIMARY KEY,
	"session_id" integer NOT NULL,
	"proposal_id" integer NOT NULL,
	"stage_id" integer NOT NULL,
	"order" integer NOT NULL,
	"notes" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE "session_types" (
	"id" serial PRIMARY KEY,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY,
	"president_id" integer NOT NULL,
	"session_type" integer NOT NULL,
	"notes" text,
	"started_at" timestamp NOT NULL,
	"finished_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "user_session" ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "councilor_terms" ADD CONSTRAINT "councilor_terms_councilor_id_councilors_id_fkey" FOREIGN KEY ("councilor_id") REFERENCES "councilors"("id");--> statement-breakpoint
ALTER TABLE "councilors" ADD CONSTRAINT "councilors_party_id_parties_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id");--> statement-breakpoint
ALTER TABLE "proposal_votes" ADD CONSTRAINT "proposal_votes_session_proposal_id_session_proposals_id_fkey" FOREIGN KEY ("session_proposal_id") REFERENCES "session_proposals"("id");--> statement-breakpoint
ALTER TABLE "proposal_votes" ADD CONSTRAINT "proposal_votes_councilor_id_councilors_id_fkey" FOREIGN KEY ("councilor_id") REFERENCES "councilors"("id");--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_author_id_councilors_id_fkey" FOREIGN KEY ("author_id") REFERENCES "councilors"("id");--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_status_id_proposal_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "proposal_status"("id");--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_category_id_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id");--> statement-breakpoint
ALTER TABLE "session_proposals" ADD CONSTRAINT "session_proposals_session_id_sessions_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id");--> statement-breakpoint
ALTER TABLE "session_proposals" ADD CONSTRAINT "session_proposals_proposal_id_proposals_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("id");--> statement-breakpoint
ALTER TABLE "session_proposals" ADD CONSTRAINT "session_proposals_stage_id_proposal_stages_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "proposal_stages"("id");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_president_id_councilors_id_fkey" FOREIGN KEY ("president_id") REFERENCES "councilors"("id");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_session_type_session_types_id_fkey" FOREIGN KEY ("session_type") REFERENCES "session_types"("id");--> statement-breakpoint
ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;