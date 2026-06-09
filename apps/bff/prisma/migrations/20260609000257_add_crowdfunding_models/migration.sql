-- CreateEnum
CREATE TYPE "OfferingStatus" AS ENUM ('draft', 'compliance_review', 'open', 'funded', 'closed', 'cancelled');

-- CreateEnum
CREATE TYPE "OfferingType" AS ENUM ('reg_cf', 'reg_d', 'reg_a');

-- CreateEnum
CREATE TYPE "InstrumentType" AS ENUM ('rev_share', 'preferred_equity', 'convertible_note', 'equity');

-- CreateTable
CREATE TABLE "offerings" (
    "id" UUID NOT NULL,
    "case_id" UUID NOT NULL,
    "issuer_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category_id" UUID NOT NULL,
    "type" "OfferingType" NOT NULL,
    "instrument" "InstrumentType" NOT NULL,
    "min_investment" DOUBLE PRECISION NOT NULL,
    "target_raise" DOUBLE PRECISION NOT NULL,
    "max_raise" DOUBLE PRECISION NOT NULL,
    "raised_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "open_date" TIMESTAMP(3),
    "close_date" TIMESTAMP(3),
    "status" "OfferingStatus" NOT NULL DEFAULT 'draft',
    "risk_disclosures" TEXT,
    "summary" TEXT,
    "media_hero_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offerings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investor_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "tax_id" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "phone" TEXT,
    "address" TEXT,
    "kyc_status" TEXT NOT NULL DEFAULT 'not_started',
    "is_accredited" BOOLEAN NOT NULL DEFAULT false,
    "accredited_expiry" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investments" (
    "id" UUID NOT NULL,
    "offering_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "transaction_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offering_updates" (
    "id" UUID NOT NULL,
    "offering_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "offering_updates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "offerings_slug_key" ON "offerings"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "investor_profiles_user_id_key" ON "investor_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "offerings" ADD CONSTRAINT "offerings_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "cases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offerings" ADD CONSTRAINT "offerings_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investor_profiles" ADD CONSTRAINT "investor_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_offering_id_fkey" FOREIGN KEY ("offering_id") REFERENCES "offerings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offering_updates" ADD CONSTRAINT "offering_updates_offering_id_fkey" FOREIGN KEY ("offering_id") REFERENCES "offerings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
