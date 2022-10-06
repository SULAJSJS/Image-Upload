import React, { useState } from 'react';
import { Reorder } from 'framer-motion';
import './App.scss';
import { Clear } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import UploadItems from './components/UploadItems';

function App() {
  const [image, setImage] = useState([
    {
      id: 0,
      order: 0,
      url: null,
    },
    {
      id: 1,
      order: 1,
      url: null,
    },
    {
      id: 2,
      order: 2,
      url: null,
    },
    {
      id: 3,
      order: 3,
      url: null,
    },
    {
      id: 4,
      order: 4,
      url: null,
    },
    {
      id: 5,
      order: 5,
      url: null,
    },
    {
      id: 6,
      order: 6,
      url: null,
    },
    {
      id: 7,
      order: 7,
      url: null,
    },
  ]);
  const [picture, setPicture] = useState(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const imageHandleChange = (e, el) => {
    if (e.target.file) {
      return;
    }
    const file = e.target.files[0];
    setImage(
      image.map((item) => {
        return item.id === el.id
          ? {
              id: item.id,
              url: URL.createObjectURL(file),
            }
          : item;
      }),
    );
  };

  const deleteImageHandler = (e, el) => {
    e.preventDefault();
    setImage(
      image.map((item) => {
        return item.id === el.id
          ? {
              id: item.id,
              order: item.order,
              url: null,
            }
          : item;
      }),
    );
  };

  const uploadImage = (e) => {
    if (e.target.file) {
      return;
    }
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  const todoGeneral = (id, el, picture) => {
    setPicture(el.url);
    setImage(
      image.map((item) => {
        return item.id === el.id
          ? {
              id: item.id,
              order: item.order,
              url: picture,
            }
          : item;
      }),
    );
  };



  // Button styles

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#0063cc'),
    backgroundColor: '#0063cc',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#498fd6',
    },
  }));

  // icon styles
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="App">
      <Reorder.Group as="div" axis="y" values={image} onReorder={setImage}>
        <div className="upload">
          <Reorder.Item
            key={picture}
            value={picture}
            as="label"
            htmlFor='input'
            className="upload-content">
            {picture ? (
              <span>
                <Clear
                  onClick={(e) => {
                    e.preventDefault();
                    setPicture(null);
                  }}
                  sx={{
                    color: '#fff',
                    zIndex: 10,
                    ml: '11.5rem',
                    position: 'absolute',
                    cursor: 'pointer',
                    backgroundColor: isHovering ? 'red' : '#000',
                    cursor: 'pointer',
                    transition: '0.4s',
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="delete"
                />
                <img
                  style={{ width: '13rem', height: '13rem', borderRadius: '1.4rem' }}
                  src={picture}
                  alt=""
                  className="uploaded-image-gen"
                />
                <ColorButton
                  className="button"
                  variant="contained"
                  sx={{
                    fontSize: 10,
                    lineHeight: '10px',
                    borderRadius: '1.7rem',
                    width: '8.4rem',
                    height: '1.6rem',
                    ml: '0.3rem',
                    mt: '-4rem',
                  }}>
                  <p style={{ whiteSpace: 'nowrap' }}>Главное фото</p>
                </ColorButton>
              </span>
            ) : (
              <img src="/iconmonstr-picture-thin.svg" alt="" className="photo-icon" />
            )}
          </Reorder.Item>
          <input
            id="input"
            style={{ display: 'none' }}
            type="file"
            accept="images/*"
            onChange={(e) => uploadImage(e)}
            multiple
          />
          <UploadItems
            todoGeneral={todoGeneral}
            deleteImageHandler={deleteImageHandler}
            imageHandleChange={imageHandleChange}
            image={image}
            setImage={setImage}
            picture={picture}
            setPicture={setPicture}
            uploadImage={uploadImage}
          />
        </div>
      </Reorder.Group>
    </div>
  );
}

export default App;