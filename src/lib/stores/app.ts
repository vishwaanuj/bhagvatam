import { writable } from 'svelte/store'

export interface Shloka {
  id: string
  situation: string
  shloka: string
  translation: string
  imageDescription: string
  interpretation?: string
}

export interface Post {
  id: string
  prompt: string
  shloka?: Shloka
  image_b64?: string
  status: 'generating' | 'completed' | 'failed'
  created_at: string
}

export const currentPage = writable<'home' | 'vault'>('home')
export const posts = writable<Post[]>([])
export const isGenerating = writable(false)
export const selectedShloka = writable<Shloka | null>(null)
export const generatedShlokas = writable<Shloka[]>([])
export const currentStep = writable<'situation' | 'shloka-selection' | 'image-generation'>('situation')

// Generate Shlokas Request/Response
export interface GenerateShlokaRequest {
  situation: string
  count?: number
}

export interface GenerateShlokaResponse {
  success: boolean
  shlokas?: Shloka[]
  error?: string
}

// Generate Image Request/Response
export interface GenerateImageRequest {
  prompt: string
  imageCount: number
  shloka?: Shloka
}

export interface GenerateImageResponse {
  success: boolean
  image_b64?: string
  post_id?: string
  message?: string
  error?: string
}

export async function generateShlokas(request: GenerateShlokaRequest): Promise<GenerateShlokaResponse> {
  try {
    // Format the request data according to your specification
    const requestData = {
      situation: request.situation,
      count: request.count || 3
    }

    console.log('Sending shloka request:', requestData)

    const response = await fetch('https://hasigax853.app.n8n.cloud/webhook-test/generate-shlokas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received shloka response:', data)
    
    // Handle the new response format
    let shlokas: Shloka[] = []
    
    if (Array.isArray(data) && data.length > 0 && data[0].output && data[0].output.answer) {
      // New format with nested structure
      shlokas = data[0].output.answer.map((item: any) => ({
        id: crypto.randomUUID(),
        situation: item.situation || request.situation,
        shloka: item.shloka || '',
        translation: item.translation || '',
        imageDescription: item.imagePrompt || item.imageDescription || '',
        interpretation: item.interpretation || ''
      }))
    } else if (Array.isArray(data)) {
      // Fallback to old format
      shlokas = data.map((item: any) => ({
        id: crypto.randomUUID(),
        situation: item.situation || request.situation,
        shloka: item.shloka || '',
        translation: item.Translation || item.translation || '',
        imageDescription: item.imageDescritpion || item.imageDescription || '',
        interpretation: item.interpretation || ''
      }))
    }

    console.log('Transformed shlokas:', shlokas)

    return {
      success: true,
      shlokas
    }
  } catch (error) {
    console.error('Error generating shlokas:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export async function generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
  try {
    // Format the request data with the shloka information if available
    const requestData = {
      prompt: request.prompt,
      imageCount: request.imageCount,
      post_id: crypto.randomUUID(),
      // Include shloka data if available
      ...(request.shloka && {
        shloka_data: {
          situation: request.shloka.situation,
          shloka: request.shloka.shloka,
          translation: request.shloka.translation,
          imageDescription: request.shloka.imageDescription
        }
      })
    }

    console.log('Sending image request:', requestData)

    const response = await fetch('https://hasigax853.app.n8n.cloud/webhook-test/generate-bhagvatam-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received image response:', data)
    return data
  } catch (error) {
    console.error('Error generating image:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}