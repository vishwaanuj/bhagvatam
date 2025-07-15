<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { generateImage, isGenerating, selectedShloka, currentStep } from '$lib/stores/app'
  import { ArrowLeft, Palette, Download, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-svelte'
  import { fade, fly } from 'svelte/transition'
  
  const dispatch = createEventDispatcher()
  
  let customPrompt = ''
  let generatedImage: string | null = null
  let imageCount = 1
  let isCustomPrompt = false
  
  $: effectivePrompt = isCustomPrompt ? customPrompt : ($selectedShloka?.imageDescription || '')
  
  async function handleGenerate() {
    if (!effectivePrompt.trim() || $isGenerating) return
    
    isGenerating.set(true)
    generatedImage = null
    
    try {
      const result = await generateImage({
        prompt: effectivePrompt.trim(),
        imageCount,
        shloka: $selectedShloka || undefined
      })
      
      if (result.success && result.image_b64) {
        generatedImage = result.image_b64
        dispatch('image-generated', {
          image: result.image_b64,
          prompt: effectivePrompt,
          shloka: $selectedShloka
        })
      } else {
        dispatch('error', result.error || 'Failed to generate image')
      }
    } catch (error) {
      console.error('Generation failed:', error)
      dispatch('error', 'Failed to generate image')
    } finally {
      isGenerating.set(false)
    }
  }
  
  function goBack() {
    currentStep.set('shloka-selection')
    generatedImage = null
  }
  
  function togglePromptMode() {
    isCustomPrompt = !isCustomPrompt
    if (!isCustomPrompt) {
      customPrompt = ''
    }
  }
  
  function downloadImage() {
    if (!generatedImage) return
    
    const link = document.createElement('a')
    link.href = `data:image/jpeg;base64,${generatedImage}`
    link.download = `divine-art-${Date.now()}.jpg`
    link.click()
  }
</script>

<div class="w-full max-w-6xl mx-auto" in:fade={{ duration: 300 }}>
  <!-- Header -->
  <div class="text-center mb-8">
    <button 
      on:click={goBack}
      class="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors mb-4"
    >
      <ArrowLeft size={20} />
      <span>Back to shlokas</span>
    </button>
    
    <h2 class="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
      🎨 Generate Divine Art
    </h2>
    <p class="text-gray-600 text-lg">Transform your chosen wisdom into visual inspiration</p>
  </div>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Left Column - Controls -->
    <div class="space-y-6">
      <!-- Selected Shloka Display -->
      {#if $selectedShloka}
        <div class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
          <h3 class="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
            <Sparkles size={16} class="text-amber-500" />
            <span>Selected Shloka</span>
          </h3>
          <p class="text-gray-800 font-medium mb-3">{$selectedShloka.shloka}</p>
          <p class="text-gray-600 text-sm">{$selectedShloka.translation}</p>
        </div>
      {/if}
      
      <!-- Prompt Section -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-700">Image Description</h3>
          <button
            on:click={togglePromptMode}
            class="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            {isCustomPrompt ? 'Use Auto Description' : 'Customize Prompt'}
          </button>
        </div>
        
        {#if isCustomPrompt}
          <div class="space-y-3">
            <textarea
              bind:value={customPrompt}
              placeholder="Describe your vision for the divine art..."
              class="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              disabled={$isGenerating}
            ></textarea>
          </div>
        {:else}
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p class="text-gray-700 leading-relaxed">
              {$selectedShloka?.imageDescription || 'No description available'}
            </p>
          </div>
        {/if}
        
        <!-- Generation Controls -->
        <div class="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <!-- Image Count -->
          <div class="flex items-center space-x-3">
            <label class="text-sm font-medium text-gray-700">Count:</label>
            <div class="flex space-x-2">
              {#each [1, 2, 3, 4] as count}
                <button
                  on:click={() => imageCount = count}
                  class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200"
                  class:border-orange-500={imageCount === count}
                  class:bg-orange-500={imageCount === count}
                  class:text-white={imageCount === count}
                  class:border-gray-300={imageCount !== count}
                  class:text-gray-600={imageCount !== count}
                  class:hover:border-orange-400={imageCount !== count}
                  disabled={$isGenerating}
                >
                  {count}
                </button>
              {/each}
            </div>
          </div>
          
          <!-- Generate Button -->
          <button
            on:click={handleGenerate}
            disabled={!effectivePrompt.trim() || $isGenerating}
            class="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center space-x-2"
          >
            {#if $isGenerating}
              <div class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Creating...</span>
            {:else}
              <Palette size={20} />
              <span>Generate</span>
            {/if}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Right Column - Generated Image -->
    <div class="space-y-6">
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-700 mb-4 flex items-center space-x-2">
          <ImageIcon size={20} class="text-orange-600" />
          <span>Generated Art</span>
        </h3>
        
        <div class="aspect-square bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-dashed border-orange-200 flex items-center justify-center">
          {#if $isGenerating}
            <div class="text-center" in:fade>
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
              <p class="text-gray-600 font-medium">Manifesting divine art...</p>
              <p class="text-gray-500 text-sm mt-2">This may take a moment</p>
            </div>
          {:else if generatedImage}
            <div class="w-full h-full relative group" in:fly={{ y: 20, duration: 400 }}>
              <img 
                src="data:image/jpeg;base64,{generatedImage}" 
                alt="Generated divine art"
                class="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                <button
                  on:click={downloadImage}
                  class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 bg-white text-gray-800 rounded-lg shadow-lg hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          {:else}
            <div class="text-center text-gray-500">
              <ImageIcon size={48} class="mx-auto mb-3 text-gray-400" />
              <p>Your divine art will appear here</p>
              <p class="text-sm mt-2">Click generate to create your image</p>
            </div>
          {/if}
        </div>
        
        <!-- Action Buttons -->
        {#if generatedImage && !$isGenerating}
          <div class="flex space-x-3 mt-4">
            <button
              on:click={handleGenerate}
              class="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw size={16} />
              <span>Generate Again</span>
            </button>
            <button
              on:click={downloadImage}
              class="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Download size={16} />
              <span>Download</span>
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>