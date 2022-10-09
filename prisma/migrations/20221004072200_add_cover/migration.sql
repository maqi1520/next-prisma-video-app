/*
  Warnings:

  - Added the required column `cover` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "cover" TEXT NOT NULL;
