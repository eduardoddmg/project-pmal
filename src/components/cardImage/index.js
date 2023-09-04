import { VStack } from "@chakra-ui/react";
import  { useState } from 'react';

import { CardInitial } from './initial';
import { CardLoading } from './loading';
import { CardFinal } from './final';

export const CardImage = () => {
  const [current, setCurrent] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  
  const array = [
    <CardInitial 
      setCurrent={setCurrent} 
      selectedFile={selectedFile} 
      setSelectedFile={setSelectedFile} 
      setImageUrl={setImageUrl}
    />,
    <CardLoading />,
    <CardFinal 
      selectedFile={selectedFile} 
      setCurrent={setCurrent} 
      setSelectedFile={setSelectedFile} 
      imageUrl={imageUrl}
    />
  ];
  
  return (
     <VStack
      w={['90%', '85%', '50%']}
      p={5}
      my={10}
      boxShadow='xl'
    >
       {array[current]}
    </VStack>
  )
}




