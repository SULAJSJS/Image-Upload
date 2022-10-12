import React, { useState } from 'react';
import { Reorder } from 'framer-motion';
import './App.scss';
import { Clear } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
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
    {
      id: 8,
      order: 8,
      url: null,
    },
  ]);

  // const [image, setImage] = useState([
  //   {
  //     id: 0,
  //     order: 0,
  //     url: null,
  //   },
  //   {
  //     id: 1,
  //     order: 3,
  //     url: null,
  //   },
  //   {
  //     id: 2,
  //     order: 5,
  //     url: null,
  //   },
  //   {
  //     id: 3,
  //     order: 7,
  //     url: null,
  //   },
  //   {
  //     id: 4,
  //     order: 8,
  //     url: null,
  //   },
  //   {
  //     id: 5,
  //     order: 4,
  //     url: null,
  //   },
  //   {
  //     id: 6,
  //     order: 2,
  //     url: null,
  //   },
  //   {
  //     id: 7,
  //     order: 1,
  //     url: null,
  //   },
  //   {
  //     id: 8,
  //     order: 6,
  //     url: null,
  //   },
  // ]);
  const [isHovering, setIsHovering] = React.useState(false);
  const imageHandleChange = (e, el) => {
    e.preventDefault();
    if (e.target.file) {
      return;
    }
    const file = e.target.files[0];
    setImage(
      image.map((item) => {
        return el.order === item.order
          ? {
              ...item,
              url: URL.createObjectURL(file),
            }
          : item;
      }),
    );
    console.log(image);
  };

  const deleteImageHandler = (e, el) => {
    e.preventDefault();
    setImage(
      image.map((item) => {
        return item.order === el.order
          ? {
              ...item,
              url: null,
            }
          : item;
      }),
    );
    console.log(image);
  };

  const todoGeneral = (id, el, e) => {
    e.preventDefault();
    setImage(
      image.map((item) => {
        if (item.order === el.order) {
          const f = { ...item, url: image[0].url };
          const g = (image[0].url = el.url);
          return f;
        } else return item;
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
      <Box component="div" className="upload">
        <UploadItems
          todoGeneral={todoGeneral}
          deleteImageHandler={deleteImageHandler}
          imageHandleChange={imageHandleChange}
          image={image}
          setImage={setImage}
        />
      </Box>
    </div>
  );
}

export default App;
