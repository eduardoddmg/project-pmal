import { 
    VStack,
    Circle,
    Text,
    Image,
    Button,
    Input, 
    InputGroup,
    InputRightElement
  } from '@chakra-ui/react';
  import { CheckIcon } from '@chakra-ui/icons';
  
  export const CardFinal = ({ imageUrl, selectedFile, setCurrent, setSelectedFile }) => {
    const handleClick = () => {
      setCurrent(0);
      setSelectedFile(null);
    };
    
    return (
      <VStack w='80%'>
        <Circle bg='green' p={3} color='white' alignSelf='center'>
          <CheckIcon />
        </Circle>
        <Text>Image upload with success</Text>
        <Image 
          src={imageUrl} 
          alt="image sent to database"
          py={15}
          w='80%'        
          borderRadius='2em'
        />
        <InputToCopy url={imageUrl} />
        <Button colorScheme='blue' alignSelf='stretch' onClick={handleClick}>
          Enviar mais fotos
        </Button>
      </VStack>
    )
  }
  
  const InputToCopy = ({ url }) => {
    
    const handleClick = () => {
      navigator.clipboard.writeText(url);
      alert('copiado');
    }
  
    return (
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type='text'
          value={url}
          onChange={e => console.log(e)}
          w='full'
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            Copy
          </Button>  
        </InputRightElement>
      </InputGroup>
    )
  }