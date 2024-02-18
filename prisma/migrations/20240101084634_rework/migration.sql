/*
  Warnings:

  - You are about to drop the column `productId` on the `category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_productId_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
