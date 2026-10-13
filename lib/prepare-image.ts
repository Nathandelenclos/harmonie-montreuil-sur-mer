export async function prepareImage(file: File): Promise<Blob> {
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type) || file.size > 30 * 1024 * 1024) throw new Error('Choisissez une image JPEG, PNG, WebP ou AVIF de moins de 30 Mo.')
  const bitmap = await createImageBitmap(file)
  try {
    const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Votre navigateur ne peut pas préparer cette image.')
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/webp', .8))
    if (!blob || blob.size > 2 * 1024 * 1024) throw new Error('Cette image reste trop volumineuse. Réduisez ses dimensions puis réessayez.')
    return blob
  } finally { bitmap.close() }
}

export async function uploadImage(file: File) {
  const image = await prepareImage(file)
  const response = await fetch('/api/admin/images', { method: 'POST', body: image, headers: { 'Content-Type': image.type } })
  if (!response.ok) throw new Error(response.status === 401 ? 'Votre session a expiré. Reconnectez-vous avant de réessayer.' : 'L’image n’a pas pu être importée. Réessayez.')
  return response.json() as Promise<import('@/src/editorial/domain/content').Photo>
}
