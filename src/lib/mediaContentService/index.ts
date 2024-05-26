const YouTubeService = require('./YouTubeService');


class MediaContentServiceFactory {
    static getService(serviceName: string) {
        switch (serviceName) {
            case 'youtube':
                return new YouTubeService();
            case 'tiktok':
            // return new TikTokService();
            default:
                throw new Error('Unknown social media service');
        }
    }
}
