import React, {useState} from 'react';

import styled from 'styled-components';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Blurhash} from 'react-blurhash';
import './index.scss';



const StyledBlurhash = styled(Blurhash)`
  z-index: 1;
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LoadingReplacement = styled.div`
  z-index: 1;
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

let ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptimizedImage = ({url, blurhash, style={}}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);
  const handleLoad = () => {
    console.log('Image loaded!');
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    console.log("Started loading: ");
    setLoadStarted(true);
  };

  return (
    <ImageWrapper style={style}>
      <LazyLoadImage 
        src={url}
        onLoad={handleLoad}
        beforeLoad={handleLoadStarted}
        style={
          {
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }
        }
      />
      {
        (!isLoaded && isLoadStarted )&& (
        blurhash?.length > 0 ?
          <StyledBlurhash
            hash={blurhash}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
          :
          <LoadingReplacement className='wave-effect'/>)
      }
    </ImageWrapper>
  );
}

export default OptimizedImage;
