/*
  Warnings:

  - Added the required column `metadata` to the `ZapExecs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ZapExecs" ADD COLUMN     "metadata" JSONB NOT NULL;
