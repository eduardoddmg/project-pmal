import React from 'react'
import Head from 'next/head';

export const HeadComp = ({ title, description }) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Head>
  )
}
