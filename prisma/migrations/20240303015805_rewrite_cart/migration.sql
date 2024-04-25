/*
  Warnings:

  - You are about to drop the column `price` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_productId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "price",
DROP COLUMN "productId",
DROP COLUMN "productName",
DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
