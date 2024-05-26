-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "channelSetId" TEXT;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_channelSetId_fkey" FOREIGN KEY ("channelSetId") REFERENCES "ChannelSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
