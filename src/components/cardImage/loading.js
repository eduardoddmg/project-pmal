import {
    Text,
    Spinner
  } from '@chakra-ui/react';
  
  export const CardLoading = () => {
    return (
      <>
        <Text>Uploading...</Text>
        <Spinner />
      </>
    )
  };