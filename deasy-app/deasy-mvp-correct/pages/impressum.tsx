import type { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'

interface ImpressumProps {
  htmlContent: string
}

export default function Impressum({ htmlContent }: ImpressumProps) {
  return (
    <>
      <Head>
        <title>Impressum — DEASY</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  )
}

export const getStaticProps: GetStaticProps<ImpressumProps> = async () => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'impressum.html')
    const htmlContent = fs.readFileSync(filePath, 'utf-8')
    
    return {
      props: { htmlContent },
      revalidate: 3600,
    }
  } catch (error) {
    console.error('Error reading impressum.html:', error)
    return { notFound: true }
  }
}
