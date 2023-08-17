import { Image } from "react-native";

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
  styledImage,
}) {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={styledImage} />;
}
