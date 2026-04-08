/*
  Warnings:

  - A unique constraint covering the columns `[imagename]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Image_imagename_key" ON "Image"("imagename");
