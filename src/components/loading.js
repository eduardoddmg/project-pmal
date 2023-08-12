import { Center, Spinner, Stack } from '@chakra-ui/react'
import React from 'react'

export const Loading = () => {
  return (
    <Center py={20}>
        <Spinner size="xl"/>
    </Center>
  )
}
