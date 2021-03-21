import { PictureData } from "./pictureData";

export interface GalleryComponentData {
    // isLoading?: boolean,
    galleryData?: PictureData[],
    loadPictures?: Function | null,
    // page?: number,
  }