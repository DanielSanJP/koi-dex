-- CreateEnum
CREATE TYPE "VarietyKind" AS ENUM ('KOI', 'ANCESTOR', 'RELATIVE');

-- CreateEnum
CREATE TYPE "Confidence" AS ENUM ('DOCUMENTED', 'APPROXIMATE', 'DISPUTED');

-- CreateEnum
CREATE TYPE "SourceKind" AS ENUM ('VARIETY', 'CARE', 'BREEDING', 'PLANT', 'PLANT_NZ');

-- CreateEnum
CREATE TYPE "PlantType" AS ENUM ('FLOATING', 'SUBMERGED', 'MARGINAL');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MODERATE', 'HARD');

-- CreateEnum
CREATE TYPE "NzStatus" AS ENUM ('NATIVE', 'NATURALISED', 'CULTIVATED', 'PEST', 'UNKNOWN');

-- CreateTable
CREATE TABLE "families" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "families_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "varieties" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "VarietyKind" NOT NULL,
    "dex_number" INTEGER,
    "body_path" TEXT,
    "fin_dominant" TEXT,
    "fin_tail" TEXT,
    "fin_dorsal" TEXT,
    "fin_back" TEXT,
    "fin_side" TEXT,
    "family_slug" TEXT,
    "name_meaning" TEXT,
    "pattern" TEXT,
    "origin" TEXT,
    "notes" TEXT,
    "care" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "definition" TEXT,
    "role" TEXT,
    "origin_year" INTEGER,
    "origin_label" TEXT,
    "origin_confidence" "Confidence",
    "origin_source" TEXT,

    CONSTRAINT "varieties_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "breeding_outcomes" (
    "id" SERIAL NOT NULL,
    "parent_a_slug" TEXT NOT NULL,
    "parent_b_slug" TEXT,
    "offspring_slug" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,

    CONSTRAINT "breeding_outcomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plants" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latin_name" TEXT NOT NULL,
    "type" "PlantType" NOT NULL,
    "light" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "koi_safe" BOOLEAN NOT NULL,
    "koi_notes" TEXT NOT NULL,
    "hardiness" TEXT NOT NULL,
    "planting" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "nz_status" "NzStatus" NOT NULL,
    "nz_note" TEXT NOT NULL,
    "nz_url" TEXT,
    "image_path" TEXT,
    "image_alt" TEXT,
    "image_author" TEXT,
    "image_license" TEXT,
    "image_url" TEXT,

    CONSTRAINT "plants_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "sources" (
    "id" SERIAL NOT NULL,
    "kind" "SourceKind" NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "variety_slug" TEXT,
    "plant_slug" TEXT,

    CONSTRAINT "sources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "families_name_key" ON "families"("name");

-- CreateIndex
CREATE UNIQUE INDEX "varieties_name_key" ON "varieties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "varieties_dex_number_key" ON "varieties"("dex_number");

-- CreateIndex
CREATE INDEX "varieties_kind_idx" ON "varieties"("kind");

-- CreateIndex
CREATE INDEX "breeding_outcomes_offspring_slug_idx" ON "breeding_outcomes"("offspring_slug");

-- CreateIndex
CREATE UNIQUE INDEX "breeding_outcomes_parent_a_slug_parent_b_slug_offspring_slu_key" ON "breeding_outcomes"("parent_a_slug", "parent_b_slug", "offspring_slug");

-- CreateIndex
CREATE UNIQUE INDEX "plants_name_key" ON "plants"("name");

-- CreateIndex
CREATE INDEX "plants_type_idx" ON "plants"("type");

-- CreateIndex
CREATE INDEX "sources_variety_slug_idx" ON "sources"("variety_slug");

-- CreateIndex
CREATE INDEX "sources_plant_slug_idx" ON "sources"("plant_slug");

-- AddForeignKey
ALTER TABLE "varieties" ADD CONSTRAINT "varieties_family_slug_fkey" FOREIGN KEY ("family_slug") REFERENCES "families"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "breeding_outcomes" ADD CONSTRAINT "breeding_outcomes_parent_a_slug_fkey" FOREIGN KEY ("parent_a_slug") REFERENCES "varieties"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "breeding_outcomes" ADD CONSTRAINT "breeding_outcomes_parent_b_slug_fkey" FOREIGN KEY ("parent_b_slug") REFERENCES "varieties"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "breeding_outcomes" ADD CONSTRAINT "breeding_outcomes_offspring_slug_fkey" FOREIGN KEY ("offspring_slug") REFERENCES "varieties"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sources" ADD CONSTRAINT "sources_variety_slug_fkey" FOREIGN KEY ("variety_slug") REFERENCES "varieties"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sources" ADD CONSTRAINT "sources_plant_slug_fkey" FOREIGN KEY ("plant_slug") REFERENCES "plants"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
