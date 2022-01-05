/*
  Warnings:

  - You are about to drop the column `intentId` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `reflectionId` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Intent` table. All the data in the column will be lost.
  - Added the required column `dayId` to the `Intent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayId` to the `Reflection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_intentId_fkey";

-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_reflectionId_fkey";

-- AlterTable
ALTER TABLE "Day" DROP COLUMN "intentId",
DROP COLUMN "reflectionId",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Intent" DROP COLUMN "createdAt",
ADD COLUMN     "dayId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reflection" ADD COLUMN     "dayId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Intent" ADD CONSTRAINT "Intent_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reflection" ADD CONSTRAINT "Reflection_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
