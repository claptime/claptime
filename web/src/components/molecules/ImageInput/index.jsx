import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Button, Upload } from 'antd';
import Cropper from 'react-easy-crop';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Image } from 'claptime/components/atoms';
import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

import getCroppedImg from './cropImage';

const {
  style: {
    colors: { placeholder },
  },
} = consts;

const ACCEPTED_IMAGE_EXTENTIONS = '.jpg,.jpeg,.png';

const ImageInput = ({
  s3Path,
  format,
  onChange,
  disabled,
  shape,
  updatedImage,
}) => {
  const uploadRef = useRef(null);
  const [image, setImage] = useState({ filename: null, data: null });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });

  const { t } = useTranslation();

  const StyledUpload = styled(Upload)`
    div.ant-upload {
      width: 100%;
      height: ${({ height }) => height}px;
    }
    :hover img {
      opacity: 0.3 !important;
    }
    :hover .overlay {
      opacity: 1 !important;
    }
  `;

  const ratio = {
    width: Number(format.split(':')[0]),
    height: Number(format.split(':')[1]),
  };

  const handleResize = useCallback(() => {
    if (uploadRef.current) {
      const width = uploadRef.current.clientWidth;
      const height = (ratio.height * width) / ratio.width;
      setSize({
        width,
        height,
      });
    }
  }, [ratio.width, ratio.height]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  useEffect(() => {
    handleResize();
  }, [disabled, handleResize]);

  const onCropComplete = async (val) => {
    const { filename, data } = image;

    const croppedImage = await getCroppedImg(data, val, ratio);

    onChange({
      filename,
      croppedImage,
    });
  };

  const handleFileChange = ({ file }) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setImage({ filename: file.name, data: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const { data } = image;
  if (data) {
    return (
      <div style={{ height: size.height }}>
        <Cropper
          image={data}
          crop={crop}
          onCropChange={(newCrop) => setCrop(newCrop)}
          onCropComplete={onCropComplete}
          aspect={ratio.width / ratio.height}
          cropShape={shape}
          showGrid={false}
          style={{
            containerStyle: {
              border: `1px dotted ${placeholder}`,
            },
            mediaStyle: {
              maxHeight: 'inherit',
              maxWidth: 'inherit',
              width: '100%',
            },
          }}
        />
      </div>
    );
  }

  const img = (
    <div style={{ height: size.height || undefined }}>
      <Image s3Key={s3Path} url={updatedImage} rounded={shape === 'round'} />
    </div>
  );
  if (disabled) {
    return img;
  }
  return (
    <StyledUpload
      accept={ACCEPTED_IMAGE_EXTENTIONS}
      name="image"
      showUploadList={false}
      onChange={handleFileChange}
      beforeUpload={() => false}
      height={size.height}
    >
      <div ref={uploadRef}>
        {img}
        <div
          className="overlay"
          style={{
            transition: '.5s ease',
            opacity: 0,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Button type="primary">{t('imageInput.importButton')}</Button>
        </div>
      </div>
    </StyledUpload>
  );
};

ImageInput.propTypes = {
  s3Path: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  updatedImage: PropTypes.string,
  format: PropTypes.oneOf(['3:4', '5:1', '1:1']).isRequired,
  shape: PropTypes.oneOf(['rect', 'round']),
};

ImageInput.defaultProps = {
  onChange: () => {},
  disabled: false,
  shape: 'rect',
  updatedImage: null,
};

export default ImageInput;
