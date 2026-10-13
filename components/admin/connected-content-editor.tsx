'use client'
import ContentEditor, { type Props } from './content-editor'
import { uploadImage } from '@/lib/prepare-image'
export default function ConnectedContentEditor(props: Omit<Props, 'importImage'>) {
  return <ContentEditor {...props} importImage={uploadImage} />
}
