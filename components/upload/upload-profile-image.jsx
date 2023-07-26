import { useRef, useState } from "react";
import UplaodService from "../../shared/uplaod-service";

const UploadProfileImage = ({ onImageUploaded, src }) => {
  const fileDialog = useRef();

  const [imageToPreview, setImageToPreview] = useState("");
  const [showImageDialog, setShowImageDialog] = useState(false);

  const uplaodLogo = async ({ currentTarget: input }) => {
    try {
      if (!input?.files[0]) return;
      const formDate = new FormData();
      formDate.append("file", input.files[0]);
      const { data } = await UplaodService.uplaodImage(formDate);
      const resData = data;
      //setImageSrc(resData.images[0]);

      if (onImageUploaded) onImageUploaded(resData.images[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const openFileBrowser = () => {
    fileDialog.current.click();
  };

  const handleDisplayImage = (src) => {
    setImageToPreview(src);
    handleShowImageDialog();
  };

  const handleShowImageDialog = () => {
    setShowImageDialog(true);
  };
  
  const handleCloseImageDialog = () => {
    setShowImageDialog(false);
  };

  return (
    <>
      <div className="facility__uploadlogo__block">
        <img
          style={{ cursor: "pointer" }}
          onClick={() => handleDisplayImage(src)}
          className="facility-logo"
          src={src ? src : "/assets/avatar-comp.png"}
        />
      </div>
      
      <input
        type="file"
        id="fileUploader"
        onChange={uplaodLogo}
        style={{ display: "none" }}
        ref={fileDialog}
        accept="image/*"
      />
      
      {!src && (
        <div className="upload" onClick={openFileBrowser}>
          <i className="upload-icon fa fa-cloud-upload"></i>
        </div>
      )}
      
      {src && (
        <div className="upload" onClick={openFileBrowser}>
          <i className="upload-icon fa fa-edit"></i>
        </div>
      )}
    </>
  );
};

export default UploadProfileImage;
