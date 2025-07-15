<script lang="ts">
  import { onMount } from 'svelte'
  import { BookOpen, Sparkles, Heart, Mountain, Sun, Moon, Star } from 'lucide-svelte'
  import { fade, fly, scale } from 'svelte/transition'
  
  export let shlokaCount = 3
  
  let currentQuoteIndex = 0
  let currentIconIndex = 0
  
  const wisdomQuotes = [
    { text: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत", translation: "Whenever dharma declines, I manifest...", chapter: "4.7" },
    { text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन", translation: "You have the right to action alone...", chapter: "2.47" },
    { text: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय", translation: "Perform your duty with a balanced mind...", chapter: "2.48" },
    { text: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज", translation: "Abandon all dharmas and surrender to Me...", chapter: "18.66" },
    { text: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते", translation: "Nothing in this world is as purifying as knowledge...", chapter: "4.38" },
    { text: "वसुधैव कुटुम्बकम्", translation: "The world is one family...", chapter: "Upanishad" },
    { text: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः", translation: "Mind alone is the cause of bondage and liberation...", chapter: "6.5" },
    { text: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्", translation: "Better is one's own dharma, though imperfectly performed...", chapter: "3.35" }
  ]
  
  const animatedIcons = [
    { component: BookOpen, name: 'Sacred Texts', color: 'from-orange-400 to-red-500' },
    { component: Sparkles, name: 'Divine Light', color: 'from-yellow-400 to-orange-500' },
    { component: Heart, name: 'Universal Love', color: 'from-pink-400 to-rose-500' },
    { component: Mountain, name: 'Eternal Strength', color: 'from-slate-400 to-gray-600' },
    { component: Sun, name: 'Illumination', color: 'from-amber-400 to-yellow-500' },
    { component: Moon, name: 'Peaceful Mind', color: 'from-blue-400 to-indigo-500' },
    { component: Star, name: 'Guiding Light', color: 'from-purple-400 to-violet-500' }
  ]
  
  onMount(() => {
    const quoteInterval = setInterval(() => {
      currentQuoteIndex = (currentQuoteIndex + 1) % wisdomQuotes.length
    }, 4000)
    
    const iconInterval = setInterval(() => {
      currentIconIndex = (currentIconIndex + 1) % animatedIcons.length
    }, 3000)
    
    return () => {
      clearInterval(quoteInterval)
      clearInterval(iconInterval)
    }
  })
</script>

<div class="w-full max-w-4xl mx-auto">
  <!-- Main Loading Container with Rotating Background -->
  <div class="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-3xl shadow-2xl border border-orange-200">
    
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Rotating Mandala Background -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
        <div class="w-full h-full border-4 border-orange-300 rounded-full animate-spin-slow"></div>
        <div class="absolute inset-4 border-2 border-amber-400 rounded-full animate-spin-reverse"></div>
        <div class="absolute inset-8 border border-orange-400 rounded-full animate-spin-slow"></div>
      </div>
      
      <!-- Floating Sacred Symbols -->
      <div class="absolute top-8 left-8 text-orange-200 animate-float opacity-30">🕉️</div>
      <div class="absolute top-12 right-12 text-amber-200 animate-float-delayed opacity-30" style="animation-delay: 1s;">🪷</div>
      <div class="absolute bottom-16 left-16 text-orange-200 animate-float opacity-30" style="animation-delay: 2s;">☸️</div>
      <div class="absolute bottom-8 right-8 text-amber-200 animate-float-delayed opacity-30" style="animation-delay: 3s;">🔱</div>
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-orange-50/80 via-transparent to-amber-50/80"></div>
    </div>
    
    <!-- Content Layer -->
    <div class="relative z-10 p-8">
      
      <!-- Central Icon and Status -->
      <div class="text-center mb-8">
        <div class="relative inline-block">
          <!-- Outer Rotating Ring -->
          <div class="w-32 h-32 border-4 border-orange-200 rounded-full animate-spin-slow opacity-60"></div>
          <div class="absolute inset-2 border-2 border-amber-300 rounded-full animate-spin-reverse opacity-40"></div>
          
          <!-- Central Icon Container -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="relative">
              {#key currentIconIndex}
                <div 
                  class="w-20 h-20 bg-gradient-to-r {animatedIcons[currentIconIndex].color} rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-500"
                  in:scale={{ duration: 500, start: 0.5 }}
                >
                  <svelte:component this={animatedIcons[currentIconIndex].component} size={32} class="text-white drop-shadow-lg" />
                </div>
              {/key}
              
              <!-- Pulsing Glow Effect -->
              <div class="absolute inset-0 bg-gradient-to-r {animatedIcons[currentIconIndex].color} rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          
          <!-- Floating Particles -->
          <div class="absolute -top-2 -right-2 w-3 h-3 bg-amber-400 rounded-full animate-bounce opacity-80"></div>
          <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-60" style="animation-delay: 0.5s;"></div>
          <div class="absolute top-4 -left-4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-70" style="animation-delay: 1s;"></div>
        </div>
        
        <!-- Status Text -->
        <div class="mt-6 space-y-2">
          <p class="text-orange-700 font-semibold text-lg">
            {animatedIcons[currentIconIndex].name}
          </p>
          <div class="flex items-center justify-center space-x-2">
            <div class="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span class="text-gray-600 text-sm">Channeling ancient wisdom</span>
            <div class="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
          </div>
        </div>
      </div>
      
      <!-- Main Title and Progress -->
      <div class="text-center mb-8">
        <h3 class="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-4">
          🕉️ Consulting Sacred Texts
        </h3>
        <p class="text-gray-600 text-lg mb-6">
          Seeking <span class="font-semibold text-orange-600">{shlokaCount}</span> divine verses from the eternal Bhagavad Gita
        </p>
        
        <!-- Enhanced Progress Bar -->
        <div class="relative w-full bg-gradient-to-r from-orange-100 to-amber-100 rounded-full h-4 mb-4 overflow-hidden shadow-inner">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 h-full rounded-full animate-progress-flow" style="width: 70%;"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent h-full rounded-full animate-shimmer"></div>
        </div>
        
        <div class="flex justify-center space-x-1 mb-2">
          {#each Array(4) as _, i}
            <div 
              class="w-2 h-2 rounded-full transition-all duration-300"
              class:bg-orange-400={i <= 2}
              class:bg-orange-200={i > 2}
              class:animate-pulse={i <= 2}
            ></div>
          {/each}
        </div>
      </div>
      
      <!-- Wisdom Quote Carousel -->
      <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-100/50 mb-6 overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-2 right-2 text-4xl">🕉️</div>
          <div class="absolute bottom-2 left-2 text-4xl">🪷</div>
        </div>
        
        <!-- Quote Content -->
        <div class="relative z-10">
          {#key currentQuoteIndex}
            <div in:fly={{ y: 30, duration: 600, delay: 100 }} out:fly={{ y: -30, duration: 400 }} class="text-center">
              <div class="mb-4">
                <div class="flex items-center justify-center mb-3">
                  <div class="w-8 h-0.5 bg-gradient-to-r from-transparent to-orange-300"></div>
                  <span class="px-3 text-xs font-medium text-orange-600 bg-orange-50 rounded-full py-1">
                    BG {wisdomQuotes[currentQuoteIndex].chapter}
                  </span>
                  <div class="w-8 h-0.5 bg-gradient-to-l from-transparent to-orange-300"></div>
                </div>
                
                <p class="text-xl font-bold text-gray-800 mb-3 leading-relaxed">
                  {wisdomQuotes[currentQuoteIndex].text}
                </p>
                <p class="text-sm text-gray-600 italic leading-relaxed">
                  "{wisdomQuotes[currentQuoteIndex].translation}"
                </p>
              </div>
              
              <!-- Quote Indicators -->
              <div class="flex justify-center space-x-2">
                {#each Array(wisdomQuotes.length) as _, i}
                  <div 
                    class="w-2 h-2 rounded-full transition-all duration-500"
                    class:bg-orange-400={i === currentQuoteIndex}
                    class:w-6={i === currentQuoteIndex}
                    class:bg-orange-200={i !== currentQuoteIndex}
                  ></div>
                {/each}
              </div>
            </div>
          {/key}
        </div>
      </div>
      
      <!-- Skeleton Loading Grid -->
      <div class="space-y-4">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-lg font-semibold text-gray-700 flex items-center">
            <BookOpen size={20} class="mr-2 text-orange-600" />
            Preparing Sacred Verses
          </h4>
          <div class="flex space-x-1">
            {#each Array(shlokaCount) as _, i}
              <div class="w-8 h-2 bg-orange-200 rounded-full animate-pulse" style="animation-delay: {i * 0.2}s;"></div>
            {/each}
          </div>
        </div>
        
        <div class="grid gap-4">
          {#each Array(shlokaCount) as _, i}
            <div 
              class="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-orange-100/50 animate-pulse-gentle"
              style="animation-delay: {i * 0.3}s;"
            >
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full flex items-center justify-center">
                  <BookOpen size={16} class="text-orange-500" />
                </div>
                <div class="flex-1">
                  <div class="h-3 bg-orange-200 rounded-full w-40 mb-2"></div>
                  <div class="h-2 bg-orange-100 rounded-full w-24"></div>
                </div>
                <div class="text-xs text-orange-400 font-medium">Verse {i + 1}</div>
              </div>
              
              <!-- Sanskrit Skeleton -->
              <div class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 mb-4 border border-orange-100">
                <div class="space-y-2">
                  <div class="h-4 bg-orange-200 rounded w-full"></div>
                  <div class="h-4 bg-orange-200 rounded w-4/5"></div>
                  <div class="h-3 bg-orange-100 rounded w-20 mt-3"></div>
                </div>
              </div>
              
              <!-- Translation Skeleton -->
              <div class="space-y-2">
                <div class="h-2 bg-gray-200 rounded w-full"></div>
                <div class="h-2 bg-gray-200 rounded w-5/6"></div>
                <div class="h-2 bg-gray-200 rounded w-3/4"></div>
              </div>
              
              <!-- Action Button Skeleton -->
              <div class="mt-4 h-10 bg-gradient-to-r from-orange-200 to-amber-200 rounded-xl"></div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Bottom Status -->
      <div class="text-center mt-8">
        <div class="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-100/80 to-amber-100/80 backdrop-blur-sm rounded-full border border-orange-200/50">
          <Sparkles size={18} class="text-orange-600 animate-pulse" />
          <span class="text-orange-700 font-medium">Connecting to eternal wisdom...</span>
          <div class="flex space-x-1">
            <div class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></div>
            <div class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
            <div class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>

<style>
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes spin-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(-3deg); }
  }
  
  @keyframes progress-flow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0%); }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes pulse-gentle {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.01); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  
  .animate-spin-reverse {
    animation: spin-reverse 15s linear infinite;
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 5s ease-in-out infinite;
  }
  
  .animate-progress-flow {
    animation: progress-flow 3s ease-in-out infinite;
  }
  
  .animate-shimmer {
    animation: shimmer 2s ease-in-out infinite;
  }
  
  .animate-pulse-gentle {
    animation: pulse-gentle 2s ease-in-out infinite;
  }
</style>