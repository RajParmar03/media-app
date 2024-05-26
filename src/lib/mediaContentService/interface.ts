// ISocialMediaService.js
export default class IMediaContentService {
    async post(video: string, credentials: any) {
        throw new Error("Method 'post()' must be implemented.");
    }

    async get(videoId, credentials) {
        throw new Error("Method 'get()' must be implemented.");
    }
}
