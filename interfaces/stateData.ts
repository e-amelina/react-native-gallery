import { PictureData } from "./pictureData";

export interface StateData {
    isLoading: boolean,
    isSelectedImage: boolean,
    galleryData: PictureData[],
    selectedImage?: PictureData,
  }