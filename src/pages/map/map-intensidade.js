import { WithAuth } from '@/hooks'
import { Image, Stack } from '@chakra-ui/react'
import React from 'react'

const MapIntensidade = () => {
  return (
    <Stack>
        <Image src="/map-intensidade.jpeg" />
    </Stack>
  )
}

export default WithAuth(MapIntensidade)