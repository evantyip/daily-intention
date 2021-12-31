/*
  Warnings:

  - You are about to drop the column `feeling` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "feeling",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "feelingInt" INTEGER;

-- CreateTable
CREATE TABLE "Feeling" (
    "id" SERIAL NOT NULL,
    "feeling" TEXT NOT NULL,

    CONSTRAINT "Feeling_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_feelingInt_fkey" FOREIGN KEY ("feelingInt") REFERENCES "Feeling"("id") ON DELETE SET NULL ON UPDATE CASCADE;
