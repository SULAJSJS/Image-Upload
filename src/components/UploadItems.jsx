import React from 'react';
import { Clear } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Reorder } from 'framer-motion';

const UploadItems = ({
  todoGeneral,
  imageHandleChange,
  deleteImageHandler,
  image,
  setImage,
  picture,
  setPicture,
}) => {
  const [isHovering, setIsHovering] = React.useState(false);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#0063cc'),
    backgroundColor: '#0063cc',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#498fd6',
    },
  }));

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const sorted = (a, b) => {
    return a.url === null && b.url !== null ? 1 : -1;
  };

  return (
    <div className="upload-content-items">
      {image?.sort(sorted).map((el, id) => (
        <>
          <input
            id={el.id}
            style={{ display: 'none' }}
            type="file"
            accept="images/*"
            onChange={(e) => imageHandleChange(e, el)}
          />
          <Reorder.Item
            key={el.id}
            value={el}
            as="label"
            htmlFor={el.id}
            className="item"
            style={
              el.url
                ? {
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                  }
                : {
                    boxShadow: 'none',
                    cursor: 'pointer',

                  }
            }>
            {el.url ? (
              <span className="span" style={{display: 'flex', flexDirection: 'column'}}>
                <Clear
                  onClick={(e) => deleteImageHandler(e, el)}
                  sx={{
                    color: '#fff',
                    zIndex: 10,
                    ml: '4.5rem',
                    mt: '-1.4rem',
                    backgroundColor: isHovering ? 'red' : '#000',
                    cursor: 'pointer',
                    transition: '0.4s',
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="delete"
                />
                <img
                  className="uploaded-image"
                  style={{
                    width: '6rem',
                    height: '6rem',
                    borderRadius: '1.4rem',
                    marginTop: '-1.5rem',
                  }}
                  src={el?.url}
                  alt=""
                />
                <ColorButton
                  onClick={() => todoGeneral(id, el, picture)}
                  className="button"
                  variant="contained"
                  sx={{
                    fontSize: 7.8,
                    borderRadius: '1.7rem',
                    mt: '-32px',
                    width: '5.4rem',
                    ml: '0.3rem',
                  }}>
                  <p style={{ whiteSpace: 'nowrap' }}>Сделать главной</p>
                </ColorButton>
              </span>
            ) : (
              <img src="/iconmonstr-picture-thin.svg" alt="Image" id="item-icon" />
              
            )}
          </Reorder.Item>
        </>
      ))}
    </div>
  );
};

export default UploadItems;
