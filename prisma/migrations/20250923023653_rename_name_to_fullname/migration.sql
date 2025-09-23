/*
  Warnings:

  - You are about to drop the column `shppingFee` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shppingFee",
ADD COLUMN     "shippingFee" DOUBLE PRECISION NOT NULL DEFAULT 0;
