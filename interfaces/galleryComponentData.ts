import { PictureData } from "./pictureData";

export interface GalleryComponentData {
    isLoading?: boolean,
    galleryData?: PictureData[],
    choosePicture?: Function
  }