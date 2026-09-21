import type { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'

interface HomeProps {
  htmlContent: string
}

export default function Home({ htmlContent }: HomeProps) {
  return (
    <>
      <Head>
        <title>DEASY — Deutsche Bürokratie. Endlich verständlich.</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'index.html')
    const htmlContent = fs.readFileSync(filePath, 'utf-8')
    
    return {
      props: { htmlContent },
      revalidate: 3600,
    }
  } catch (error) {
    console.error('Error reading index.html:', error)
    return { notFound: true }
  }
}
