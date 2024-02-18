-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_slug_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "Category"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
