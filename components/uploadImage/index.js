import { useState } from 'react';
import axios from 'axios';
import { Upload, Icon, Button } from 'antd';

export default function UploadImage({ isEdit, data, imageUrl, dispatch }) {
  const [rawImage, setRaw] = useState(null);
  const [justUpload, setJustUp] = useState(false);
  const uploadProps = {
    action: 'https://api.imgbb.com/1/upload',
    multiple: false,
    data: {
      key: '68866b5e9da30f7b4978ba9715098ce9',
      name: isEdit
        ? `contact image of ${data.firstName + ' ' + data.lastName}`
        : '',
    },
    onStart(file) {
      dispatch({ type: 'buttonDisabled', buttonDisabled: true });
      // console.log('onStart', file, file.name);
      setJustUp(true);
    },
    onError(err) {
      // console.log('onError', err);
    },
    onSuccess(ret, file) {
      imageUrl(ret.data.url);
      setRaw(ret.data.url);
      dispatch({ type: 'buttonDisabled', buttonDisabled: false });
      setJustUp(false);
    },
    onProgress({ percent }, file) {
      // console.log('onProgress', `${percent}%`, file.name);
      dispatch({ type: 'uploadProgress', uploadProgress: parseInt(percent) });
    },
    customRequest({
      action,
      data,
      file,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      // EXAMPLE: post form-data with 'axios'
      // eslint-disable-next-line no-undef
      const formData = new FormData();
      if (data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        });
      }
      formData.append('image', file);

      axios
        .post(action, formData, {
          withCredentials,
          headers,
          onUploadProgress: ({ total, loaded }) => {
            onProgress(
              { percent: Math.round((loaded / total) * 100).toFixed(2) },
              file,
            );
          },
        })
        .then(({ data: response }) => {
          onSuccess(response, file);
        })
        .catch(onError);

      return {
        abort() {
          console.log('upload progress is aborted.');
        },
      };
    },
  };

  return (
    <div>
      <img
        src={
          rawImage
            ? rawImage
            : isEdit && data.photo
            ? data.photo
            : 'https://via.placeholder.com/150'
        }
        onError={e => {
          e.target.src = 'https://via.placeholder.com/150';
        }}
        width="100%"
        style={{ borderRadius: 4 }}
      />
      <div style={{ marginTop: 8 }}>
        <Upload {...uploadProps}>
          <Button disabled={justUpload}>
            <Icon type="upload" /> Change Photo
          </Button>
        </Upload>
      </div>
    </div>
  );
}
