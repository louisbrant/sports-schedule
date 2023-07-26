import { useEffect } from "react";
import { useState } from "react";
import RUG from "react-upload-gallery";
import ConfigService from "../../shared/config-service";
import NotifyService from "../../shared/notify-service";
import ConfirmDialog from "../dialog/confirm-dialog";
import ImageDialog from "../dialog/image-dialog";

const uploadUrl = ConfigService.getBaseUrl() + "/uploader";
const previewUrl = ConfigService.getBaseUrl() + "/file/";

const UploadGallery = ({ onChanged, onDeleted, data }) => {
  useEffect(() => {
    if (!data) return;
    setImages(data);
    //getImagesFromImageNames(data);
  }, []);

  const [images, setImages] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState("");
  const [imageToPreview, setImageToPreview] = useState("");

  const getImagesFromImageNames = (data) => {
    let list = [];
    if (data && data.length) {
      data.map((img) => {
        const obj = {
          source: previewUrl + img,
        };
        list.push(obj);
      });
    }
    setImages(list);
  };

  const handleShowDialog = () => {
    setShowConfirmDialog(true);
  };

  const handleCloseDialog = () => {
    setShowConfirmDialog(false);
  };

  const handleShowImageDialog = () => {
    setShowImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setShowImageDialog(false);
  };

  const handleDisplayImage = (src) => {
    setImageToPreview(src);
    handleShowImageDialog();
  };

  const source = (response) => {
    if (!images) return;
    const list = [...images];
    const resList = response.images;
    for (let element of resList) {
      if (onChanged) onChanged(element);
      // list.push({
      //   source: `${previewUrl}${element}`,
      // });

      list.push(element);
    }
    setImages(list);
  };

  const handleDelete = () => {
    if (!images) return;
    let list = [...images];
    //const newList = list.filter((item) => item.source != imageToDelete);
    const newList = list.filter((item) => item != imageToDelete);
    setImages(newList);
    handleCloseDialog();
    NotifyService.success("Deleted");
    //const imageName = getImageNameFromFullPath(imageToDelete);
    //if (onDeleted) onDeleted(imageName);
    if (onDeleted) onDeleted(imageToDelete);
  };

  const getImageNameFromFullPath = (path) => {
    let list = path.split("/");
    return list[list.length - 1];
  };

  const handleOnConfirmDelete = (src) => {
    setImageToDelete(src);
    handleShowDialog();
  };

  return (
    <>
      <RUG action={uploadUrl} source={source}>
        <div className="d-flex flex-row flex-wrap align-items-center">
          {images?.map((item) => (
            <div
              key={item}
              className="d-flex flex-column gallery__image__box mt-3 mr-3"
            >
              <div
                // onClick={() => handleDisplayImage(item.source)}
                onClick={() => handleDisplayImage(item)}
                className="gallery__image"
              >
                <img
                  style={{
                    // backgroundImage: `url(${item.source})`,
                    backgroundImage: `url(${item})`,
                  }}
                />
              </div>
              <a
                onClick={() => handleOnConfirmDelete(item)}
                className="gallery-image-delete-btn"
              >
                x
              </a>
            </div>
          ))}
        </div>
      </RUG>
      <ConfirmDialog
        show={showConfirmDialog}
        onConfirm={handleDelete}
        onClose={handleCloseDialog}
      ></ConfirmDialog>
      <ImageDialog
        show={showImageDialog}
        onClose={handleCloseImageDialog}
        src={imageToPreview}
      ></ImageDialog>
    </>
  );
};

export default UploadGallery;
