-- CreateTable
CREATE TABLE "distributions" (
    "id" UUID NOT NULL,
    "offering_id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "distribution_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "distributions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "distributions" ADD CONSTRAINT "distributions_offering_id_fkey" FOREIGN KEY ("offering_id") REFERENCES "offerings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
