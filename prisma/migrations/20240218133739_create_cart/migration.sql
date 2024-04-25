/*
  Warnings:

  - You are about to drop the column `transationStatus` on the `Order` table. All the data in the column will be lost.
  - Added the required column `transactionStatus` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TRANSACTION_STATUS" AS ENUM ('PENDING', 'PAID', 'CANCEL');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "transationStatus",
ADD COLUMN     "transactionStatus" "TRANSACTION_STATUS" NOT NULL;

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
