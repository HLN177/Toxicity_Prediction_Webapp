import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import nullpng from '../../assets/nullpng.png';
import {
  selectSourceImgData,
  updateSourceImgData,
} from '../../store/prediction/predictionReducer';


const Input = styled('input')({
  display: 'none',
});

const ImageSelectPage = () => {
  const sourceImgData = useAppSelector(selectSourceImgData);
  const [sourceImg, setSourceImg] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSourceImg(sourceImgData ? URL.createObjectURL(sourceImgData) : '');
  }, [sourceImgData]);

  const handleSelect = (e: any) => {
    let file = e.target.files[0];
    dispatch(updateSourceImgData(file));
  };

  const handleDelete = () => {
    dispatch(updateSourceImgData(null));
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
          src={sourceImg || nullpng}
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