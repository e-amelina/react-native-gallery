import { PictureData } from "../interfaces/pictureData";

export default async function getPhotos (page: number, limit: number): Promise<PictureData[]> {

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
        return response.ok ? response.json() : [];
    } catch (error) {
        console.log(error);
    }
}

