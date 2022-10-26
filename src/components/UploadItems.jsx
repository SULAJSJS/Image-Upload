import React from 'react';
import { Clear } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';

const UploadItems = ({ todoGeneral, imageHandleChange, deleteImageHandler, image, setImage }) => {
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
    e.preventDefault();
    setImage(
      image.map((item) => {
        if (item.order === el.order) {
          return { ...item, order: currentImage.order };
        }
        if (item.order === currentImage.order) {
          return { ...item, order: el.order };
        }
        return item;
      }),
    );
  };

  const sortImages = (a, b) => {
    return a.order <= b.order ? 1 : 0;
  };

  // =========== Finished DND
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="upload-content-items">
        {image.sort(sortImages).map((el, id) => (
          <>
            <input
              id={el.order}
              style={{ display: 'none' }}
              type="file"
              accept="images/*"
              onChange={(e) => imageHandleChange(e, el)}
            />
            <label
              htmlFor={el.order}
              className="item"
              style={
                el.url && id == 0
                  ? {
                      width: '11rem',
                      height: '11rem',
                      marginLeft: '-12.5rem',
                      position: 'absolute',
                    }
                  : id === 0
                  ? { width: '11rem', height: '11rem', marginLeft: '-12rem', position: 'absolute' }
                  : {
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
                            fontSize: 25,
                            color: '#fff',
                            zIndex: 10,
                            ml: '9.5rem',
                            mt: '-1.4rem',
                            backgroundColor: '#000',
                            cursor: 'pointer',
                            transition: '0.4s',
                          }
                        : {
                            fontSize: 18,
                            color: '#fff',
                            zIndex: 10,
                            ml: '4rem',
                            mt: '-1.3rem',
                            mb: '0.2rem',
                            backgroundColor: '#000',
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
                    onDrop={(e) => dropHandler(e, el, id)}
                    onTouchStart={(e) => dragStartHandler(e, el)}
                    onTouchEnd={(e) => dragEndHandler(e)}
                    onTouchMove={(e) => dropHandler(e, el, id)}>
                    <img
                      className="uploaded-image"
                      style={
                        id == 0
                          ? {
                              width: '11rem',
                              height: '11rem',
                              borderRadius: '1.4rem',
                              marginTop: '-1.6rem',
                              objectFit: 'cover',
                            }
                          : {
                              width: '5rem',
                              height: '5rem',
                              borderRadius: '1.4rem',
                              marginTop: '-1.5rem',
                              objectFit: 'cover',
                            }
                      }
                      src={el?.url}
                      alt=""
                    />
                  </div>
                  <ColorButton
                    onClick={(e) => todoGeneral(id, el, e)}
                    className="button"
                    variant="contained"
                    sx={
                      id == 0
                        ? {
                            fontSize: 12,
                            borderRadius: '1.7rem',
                            mt: '-2.4rem',
                            width: '9rem',
                            ml: '1rem',
                          }
                        : {
                            fontSize: 6.4,
                            borderRadius: '1.7rem',
                            mt: '-32px',
                            width: '4.4rem',
                            ml: '0.3rem',
                          }
                    }>
                    <p style={{ whiteSpace: 'nowrap' }} draggable>
                      Сделать главной
                    </p>
                  </ColorButton>
                </span>
              ) : (
                <img
                  style={id == 0 ? { width: '7rem', height: '7rem', marginTop: '0.5rem' } : {}}
                  src="/iconmonstr-picture-thin.svg"
                  alt="Image"
                  id="item-icon"
                />
              )}
            </label>
          </>
        ))}
      </div>
    </DndProvider>
  );
};

export default UploadItems;
