export interface GenerateImageRequest {
  prompt: string
  imageCount: number
}

export interface GenerateImageResponse {
  success: boolean
  image_b64?: string
  post_id?: string
  message?: string
  error?: string
}

export async function generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
  try {
    const response = await fetch('http://localhost:5678/webhook/generate-bhagvatam-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: request.prompt,
        imageCount: request.imageCount,
        post_id: crypto.randomUUID()
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error generating image:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
