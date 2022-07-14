import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import nullpng from '../../assets/nullpng.png';
import {
  selectSourceImg,
  updateSourceImg,
  updateSourceImgData
} from '../../store/prediction/predictionReducer';
import { getImageBase64URL } from '../../utils/utils';

const Input = styled('input')({
  display: 'none',
});

const ImageSelectPage = () => {
  const sourceImg = useAppSelector(selectSourceImg);
  const [sourceImgSrc, setSourceImgSrc] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSourceImgSrc(sourceImg ? URL.createObjectURL(sourceImg) : '');
  }, [sourceImg]);

  const handleSelect = async (e: any) => {
    let file = e.target.files[0];
    dispatch(updateSourceImg(file));
    const baseURL = await getImageBase64URL(file);
    if (baseURL) {
      dispatch(updateSourceImgData({
        fileName: file.name,
        fileData: baseURL
      }));
    }
  };

  const handleDelete = () => {
    dispatch(updateSourceImg(null));
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          boxShadow: 5,
          mb: '20px'
        }}
      >
        <img
          src={sourceImgSrc || nullpng}
          alt="SourceImg"
          width="200"
          height="200"
        />
      </Box>
      <Box>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleSelect}
          />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        <Button
          variant="outlined"
          sx={{
            ml: '15px'
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default ImageSelectPage;