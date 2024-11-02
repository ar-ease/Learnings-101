/*
  Warnings:

  - You are about to drop the column `passwoed` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwoed",
ADD COLUMN     "password" TEXT;
