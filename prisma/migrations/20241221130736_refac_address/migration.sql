/*
  Warnings:

  - Added the required column `label` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "label" VARCHAR(100) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
