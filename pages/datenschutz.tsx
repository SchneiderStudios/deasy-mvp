import type { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'

interface DatenschutzProps {
  htmlContent: string
}

export default function Datenschutz({ htmlContent }: DatenschutzProps) {
  return (
    <>
      <Head>
        <title>Datenschutzerklärung — DEASY</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  )
}

export const getStaticProps: GetStaticProps<DatenschutzProps> = async () => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'datenschutz.html')
    const htmlContent = fs.readFileSync(filePath, 'utf-8')
    
    return {
      props: { htmlContent },
      revalidate: 3600,
    }
  } catch (error) {
    console.error('Error reading datenschutz.html:', error)
    return { notFound: true }
  }
}
