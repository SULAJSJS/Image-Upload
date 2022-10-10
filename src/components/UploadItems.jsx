import React from 'react';
import { Clear } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Reorder } from 'framer-motion';

const UploadItems = ({todoGeneral, imageHandleChange, deleteImageHandler, image, setImage,}) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(null);
  // =========== button style
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#0063cc'),
    backgroundColor: '#0063cc',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#498fd6',
    },
  }));
  // =========== Finished button style
  //=========== Hover
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  // =========== finished hover

  // =========== sort

  const sorted = (a, b) => {
    return a.url === null && b.url !== null ? 1 : -1;
  };
  // =========== Finished sort

  // =========== DND

  const dragStartHandler = (e, el) => {
    console.log('drag', el);
    setCurrentImage(el);
  };
  const dragEndHandler = (e) => {};
  const dragOverHandler = (e) => {
    e.preventDefault();
  };
  const dropHandler = (e, el) => {
    console.log('drop', el);
    e.preventDefault();
    setImage(
      image.map((item) => {
        if (item.id === el.id) {
          return { ...item, order: currentImage.order, id: item.id };
        }
        if (item.id === currentImage.id) {
          return { ...item, order: el.order, id: item.id };
        }
        return item;
      }),
    );
  };
  const sortImages = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  // =========== Finished DND

  

  return (
    <div className="upload-content-items">
      {image?.sort(sortImages, sorted).map((el, id) => (
        <>
          <input
            id={el.id}
            style={{ display: 'none' }}
            type="file"
            accept="images/*"
            onChange={(e) => imageHandleChange(e, el)}
          />
          <label
            key={el.id}
            htmlFor={el.id}
            className="item"
            style={
              el.url && id == 0
                ? {
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    width: '13rem',
                    height: '13rem',
                    marginLeft: '-14rem',
                    position: 'absolute'
                  }
                : id === 0
                ? { width: '13rem', height: '13rem', marginLeft: '-14rem', position: 'absolute' }
                : {
                    boxShadow: 'none',
                    cursor: 'pointer',
                  }
            }>
            {el.url ? (
              <span className="span" style={{ display: 'flex', flexDirection: 'column' }}>
                <Clear
                  onClick={(e) => deleteImageHandler(e, el)}
                  sx={
                    id === 0
                      ? {
                          color: '#fff',
                          zIndex: 10,
                          ml: '11.5rem',
                          mt: '-1.4rem',
                          backgroundColor: isHovering ? 'red' : '#000',
                          cursor: 'pointer',
                          transition: '0.4s',
                        }
                      : {
                          color: '#fff',
                          zIndex: 10,
                          ml: '4.5rem',
                          mt: '-1.4rem',
                          backgroundColor: isHovering ? 'red' : '#000',
                          cursor: 'pointer',
                          transition: '0.4s',
                        }
                  }
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="delete"
                />
                <div
                  draggable={true}
                  onDragStart={(e) => dragStartHandler(e, el)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropHandler(e, el)}>
                  <img
                    className="uploaded-image"
                    style={
                      id == 0
                        ? {
                            width: '13rem',
                            height: '13rem',
                            marginRight: '3rem',
                            borderRadius: '1.4rem',
                            marginTop: '-1.6rem',
                            objectFit: 'cover'
                          }
                        : {
                            width: '6rem',
                            height: '6rem',
                            borderRadius: '1.4rem',
                            marginTop: '-1.5rem',
                            objectFit: 'cover'
                          }
                    }
                    src={el?.url}
                    alt=""
                  />
                </div>
                <ColorButton
                  onClick={() => todoGeneral(id, el)}
                  className="button"
                  variant="contained"
                  sx={
                    id == 0
                      ? {
                          fontSize: 14,
                          borderRadius: '1.7rem',
                          mt: '-2.4rem',
                          width: '11rem',
                          ml: '1rem',
                        }
                      : {
                          fontSize: 7.8,
                          borderRadius: '1.7rem',
                          mt: '-32px',
                          width: '5.4rem',
                          ml: '0.3rem',
                        }
                  }>
                  <p style={{ whiteSpace: 'nowrap' }}>Сделать главной</p>
                </ColorButton>
              </span>
            ) : (
              <img
                style={id == 0 ? { width: '9rem', height: '9rem', marginTop: '0.5rem' } : {}}
                src="/iconmonstr-picture-thin.svg"
                alt="Image"
                id="item-icon"
              />
            )}
          </label>
        </>
      ))}
    </div>
  );
};

export default UploadItems;
