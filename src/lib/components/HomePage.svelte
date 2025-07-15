<script lang="ts">
  import AnimatedInput from './AnimatedInput.svelte'
  import { currentPage, posts } from '$lib/stores/app'
  import type { GenerateImageResponse } from '$lib/stores/app'
  
  function handleImageGenerated(event: CustomEvent<GenerateImageResponse>) {
    const result = event.detail
    
    if (result.success && result.image_b64) {
      // Add to posts store
      const newPost = {
        id: result.post_id || crypto.randomUUID(),
        prompt: 'Generated image', // You might want to pass the prompt through
        image_b64: result.image_b64,
        status: 'completed' as const,
        created_at: new Date().toISOString()
      }
      
      posts.update(currentPosts => [newPost, ...currentPosts])
      
      // Show success notification
      showNotification('✨ Divine art manifested successfully!', 'success')
    } else {
      showNotification('❌ Failed to generate image: ' + (result.error || 'Unknown error'), 'error')
    }
  }
  
  function showNotification(message: string, type: 'success' | 'error') {
    // Simple notification - you can replace with a proper notification library
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 animate-fade-in ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.remove()
    }, 5000)
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-8">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-4">
        Sacred Art Generator
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Transform your spiritual visions into divine artwork using the power of AI and ancient wisdom
      </p>
    </div>
    
    <!-- Main Input -->
    <div class="mb-12">
      <AnimatedInput on:generated={handleImageGenerated} />
    </div>
    
    <!-- Recent Generations Preview -->
    {#if $posts.length > 0}
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span class="mr-3">🎨</span>
          Recent Manifestations
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each $posts.slice(0, 6) as post (post.id)}
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {#if post.image_b64}
                <div class="aspect-square bg-gradient-to-br from-orange-100 to-amber-100">
                  <img 
                    src="data:image/jpeg;base64,{post.image_b64}" 
                    alt="Generated divine art"
                    class="w-full h-full object-cover"
                  />
                </div>
              {:else}
                <div class="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <div class="text-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent mx-auto mb-2"></div>
                    <p class="text-gray-600 text-sm">Creating...</p>
                  </div>
                </div>
              {/if}
              
              <div class="p-4">
                <p class="text-gray-700 text-sm line-clamp-2">{post.prompt}</p>
                <p class="text-gray-500 text-xs mt-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          {/each}
        </div>
        
        <div class="text-center mt-8">
          <button 
            on:click={() => currentPage.set('vault')}
            class="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300"
          >
            View All in Vault →
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
</style>