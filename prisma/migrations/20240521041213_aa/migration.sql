/*
  Warnings:

  - You are about to drop the column `channelSetId` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `platform_id` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `stationId` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `channelSetId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the `ChannelSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConnectedChannel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToChannel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_channelSetId_fkey";

-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_platform_id_fkey";

-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_stationId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelSet" DROP CONSTRAINT "ChannelSet_station_id_fkey";

-- DropForeignKey
ALTER TABLE "ConnectedChannel" DROP CONSTRAINT "ConnectedChannel_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "ConnectedChannel" DROP CONSTRAINT "ConnectedChannel_connected_id_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_channelSetId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToChannel" DROP CONSTRAINT "_CategoryToChannel_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToChannel" DROP CONSTRAINT "_CategoryToChannel_B_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "linkedId" TEXT;

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "channelSetId",
DROP COLUMN "metadata",
DROP COLUMN "platform_id",
DROP COLUMN "stationId",
ADD COLUMN     "avatar" JSONB DEFAULT '[]',
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "platformId" TEXT,
ADD COLUMN     "station_id" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "linkedId" TEXT;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "linkedId" TEXT;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "channelSetId",
ADD COLUMN     "linkedId" TEXT;

-- DropTable
DROP TABLE "ChannelSet";

-- DropTable
DROP TABLE "ConnectedChannel";

-- DropTable
DROP TABLE "_CategoryToChannel";

-- CreateTable
CREATE TABLE "Linked" (
    "id" TEXT NOT NULL,
    "metadata" JSONB DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "settings" JSONB DEFAULT '{}',
    "preference" JSONB DEFAULT '{}',
    "platform_id" TEXT NOT NULL,
    "stationId" TEXT,
    "channelId" TEXT,

    CONSTRAINT "Linked_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Linked" ADD CONSTRAINT "Linked_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Linked" ADD CONSTRAINT "Linked_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Linked" ADD CONSTRAINT "Linked_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_linkedId_fkey" FOREIGN KEY ("linkedId") REFERENCES "Linked"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_linkedId_fkey" FOREIGN KEY ("linkedId") REFERENCES "Linked"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_linkedId_fkey" FOREIGN KEY ("linkedId") REFERENCES "Linked"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_linkedId_fkey" FOREIGN KEY ("linkedId") REFERENCES "Linked"("id") ON DELETE SET NULL ON UPDATE CASCADE;
