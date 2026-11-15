/* ===== Introvert Universe — Core Script ===== */

(function () {
  'use strict';

  // ---------- Data ----------
  const MBTI_TYPES = [
    { code: 'INTJ', name: 'Architect', desc: 'Strategic & independent' },
    { code: 'INTP', name: 'Logician', desc: 'Curious & analytical' },
    { code: 'ENTJ', name: 'Commander', desc: 'Bold & decisive' },
    { code: 'ENTP', name: 'Debater', desc: 'Inventive & outspoken' },
    { code: 'INFJ', name: 'Advocate', desc: 'Quiet & insightful' },
    { code: 'INFP', name: 'Mediator', desc: 'Idealistic & empathetic' },
    { code: 'ENFJ', name: 'Protagonist', desc: 'Charismatic & inspiring' },
    { code: 'ENFP', name: 'Campaigner', desc: 'Enthusiastic & creative' },
    { code: 'ISTJ', name: 'Logistician', desc: 'Practical & reliable' },
    { code: 'ISFJ', name: 'Defender', desc: 'Warm & protective' },
    { code: 'ESTJ', name: 'Executive', desc: 'Organized & strong-willed' },
    { code: 'ESFJ', name: 'Consul', desc: 'Caring & social' },
    { code: 'ISTP', name: 'Virtuoso', desc: 'Bold & practical' },
    { code: 'ISFP', name: 'Adventurer', desc: 'Artistic & sensitive' },
    { code: 'ESTP', name: 'Entrepreneur', desc: 'Energetic & perceptive' },
    { code: 'ESFP', name: 'Entertainer', desc: 'Spontaneous & lively' }
  ];

  // Free sample tracks (SoundHelix demo tracks — royalty-free for demo use)
  // Users can replace these with their own legally obtained audio sources.
  const TRACKS = [
    { id: 1, title: 'Quiet Horizon', artist: 'Ambient Drift', mood: 'calm', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', icon: '🌊' },
    { id: 2, title: 'Soft Rain', artist: 'Night Window', mood: 'rainy', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', icon: '🌧️' },
    { id: 3, title: 'Paper Lanterns', artist: 'Dream State', mood: 'dreamy', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', icon: '🏮' },
    { id: 4, title: 'Focus Loop', artist: 'Study Nook', mood: 'focus', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', icon: '📚' },
    { id: 5, title: 'Empty Library', artist: 'Silent Hours', mood: 'sad', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', icon: '📖' },
    { id: 6, title: 'Floating Dust', artist: 'Atmosphere', mood: 'ambient', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', icon: '✨' },
    { id: 7, title: 'Wooden Keys', artist: 'Piano Room', mood: 'instrumental', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', icon: '🎹' },
    { id: 8, title: 'Warm Blanket', artist: 'Comfort Sounds', mood: 'relaxing', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', icon: '☕' },
    { id: 9, title: 'Midnight Desk', artist: 'Quiet Work', mood: 'focus', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', icon: '🕯️' },
    { id: 10, title: 'Starlight Path', artist: 'Night Walker', mood: 'dreamy', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', icon: '🌟' },
    { id: 11, title: 'Gentle Current', artist: 'River Mind', mood: 'calm', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', icon: '🍃' },
    { id: 12, title: 'Grey Afternoon', artist: 'Melancholy', mood: 'sad', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', icon: '🌫️' },
    { id: 13, title: 'Deep Space', artist: 'Void', mood: 'ambient', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', icon: '🪐' },
    { id: 14, title: 'Candlelight', artist: 'Slow Evening', mood: 'relaxing', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', icon: '🕯️' },
    { id: 15, title: 'Ink & Paper', artist: 'Study', mood: 'instrumental', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', icon: '✒️' },
    { id: 16, title: 'Window Rain', artist: 'Shelter', mood: 'rainy', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', icon: '🪟' }
  ];

  // MBTI-based recommendations (mood preferences)
  const MBTI_MOODS = {
    INTJ: ['focus', 'ambient', 'instrumental'],
    INTP: ['ambient', 'focus', 'dreamy'],
    ENTJ: ['focus', 'instrumental', 'calm'],
    ENTP: ['dreamy', 'ambient', 'focus'],
    INFJ: ['dreamy', 'sad', 'calm'],
    INFP: ['dreamy', 'sad', 'relaxing'],
    ENFJ: ['calm', 'relaxing', 'dreamy'],
    ENFP: ['dreamy', 'relaxing', 'ambient'],
    ISTJ: ['focus', 'instrumental', 'calm'],
    ISFJ: ['calm', 'relaxing', 'instrumental'],
    ESTJ: ['focus', 'instrumental', 'calm'],
    ESFJ: ['relaxing', 'calm', 'dreamy'],
    ISTP: ['ambient', 'focus', 'instrumental'],
    ISFP: ['dreamy', 'relaxing', 'sad'],
    ESTP: ['ambient', 'focus', 'relaxing'],
    ESFP: ['relaxing', 'dreamy', 'calm']
  };

  const RECIPES = [
    {
      id: 1, title: 'Cloud Cheesecake', category: 'cheesecake',
      timePrep: '25 min', timeCook: '55 min', difficulty: 'Medium',
      icon: '🍰',
      ingredients: ['200g digestive biscuits', '80g melted butter', '600g cream cheese', '150g sugar', '3 eggs', '200ml sour cream', '1 tsp vanilla', 'Zest of 1 lemon'],
      steps: ['Crush biscuits and mix with melted butter. Press into a springform tin.', 'Beat cream cheese and sugar until smooth.', 'Add eggs one at a time, then sour cream, vanilla and zest.', 'Pour over base. Bake at 160°C for 50–55 minutes until just set.', 'Cool completely, then chill overnight.', 'Serve with a light dusting of powdered sugar.']
    },
    {
      id: 2, title: 'Midnight Brownies', category: 'brownie',
      timePrep: '15 min', timeCook: '30 min', difficulty: 'Easy',
      icon: '🍫',
      ingredients: ['200g dark chocolate', '150g butter', '200g sugar', '3 eggs', '100g flour', '30g cocoa', 'Pinch of salt', '1 tsp espresso powder (optional)'],
      steps: ['Melt chocolate and butter together. Cool slightly.', 'Whisk in sugar, then eggs one by one.', 'Fold in flour, cocoa, salt and espresso.', 'Pour into a lined tin. Bake at 175°C for 25–30 minutes.', 'Cool before slicing into squares.', 'Best slightly underbaked for fudginess.']
    },
    {
      id: 3, title: 'Lavender Shortbread', category: 'cookie',
      timePrep: '20 min', timeCook: '18 min', difficulty: 'Easy',
      icon: '🍪',
      ingredients: ['200g butter (soft)', '100g icing sugar', '250g flour', '1 tbsp dried culinary lavender', 'Pinch of salt'],
      steps: ['Cream butter and icing sugar until light.', 'Mix in flour, lavender and salt to form a dough.', 'Roll into a log, wrap and chill 30 minutes.', 'Slice into rounds. Bake at 170°C for 15–18 minutes.', 'Cool on a rack. Dust with icing sugar if desired.']
    },
    {
      id: 4, title: 'Honey Lemon Cake', category: 'cake',
      timePrep: '20 min', timeCook: '40 min', difficulty: 'Easy',
      icon: '🍋',
      ingredients: ['200g flour', '150g sugar', '2 tsp baking powder', '3 eggs', '120ml oil', '120ml milk', 'Zest + juice of 2 lemons', '3 tbsp honey', 'Pinch of salt'],
      steps: ['Whisk dry ingredients together.', 'In another bowl mix eggs, oil, milk, zest, juice and honey.', 'Combine wet and dry until just mixed.', 'Bake in a loaf tin at 170°C for 35–40 minutes.', 'Cool, then drizzle with extra honey.']
    },
    {
      id: 5, title: 'Spiced Hot Chocolate', category: 'drink',
      timePrep: '5 min', timeCook: '8 min', difficulty: 'Easy',
      icon: '☕',
      ingredients: ['500ml milk (or oat milk)', '40g dark chocolate', '1 tbsp cocoa', '1 tbsp sugar or honey', 'Pinch cinnamon', 'Tiny pinch cayenne (optional)', 'Whipped cream to serve'],
      steps: ['Warm milk gently in a small pan.', 'Whisk in chopped chocolate, cocoa, sugar and spices until smooth and steaming.', 'Pour into a mug. Top with cream if desired.', 'Best enjoyed under a blanket.']
    },
    {
      id: 6, title: 'Vanilla Bean Panna Cotta', category: 'dessert',
      timePrep: '15 min', timeCook: '10 min', difficulty: 'Medium',
      icon: '🍮',
      ingredients: ['400ml cream', '100ml milk', '60g sugar', '1 vanilla bean (or 1 tsp extract)', '2.5 tsp gelatin powder', '3 tbsp cold water'],
      steps: ['Bloom gelatin in cold water.', 'Heat cream, milk, sugar and vanilla until steaming (do not boil).', 'Remove from heat, stir in gelatin until dissolved.', 'Strain into moulds or glasses. Chill at least 4 hours.', 'Serve with berries or a thin caramel.']
    },
    {
      id: 7, title: 'Matcha Cookies', category: 'cookie',
      timePrep: '25 min', timeCook: '12 min', difficulty: 'Easy',
      icon: '🍵',
      ingredients: ['180g flour', '1.5 tbsp matcha', '120g butter', '80g sugar', '1 egg yolk', 'Pinch of salt'],
      steps: ['Cream butter and sugar. Mix in yolk.', 'Sift flour, matcha and salt; combine into dough.', 'Chill 20 minutes. Roll and cut shapes.', 'Bake at 170°C for 10–12 minutes.', 'Cool completely. Optional white chocolate dip.']
    },
    {
      id: 8, title: 'Molten Chocolate Cakes', category: 'dessert',
      timePrep: '15 min', timeCook: '12 min', difficulty: 'Medium',
      icon: '🔥',
      ingredients: ['100g dark chocolate', '100g butter', '2 eggs + 2 yolks', '60g sugar', '30g flour', 'Pinch salt', 'Butter + cocoa for ramekins'],
      steps: ['Butter and dust 4 ramekins with cocoa.', 'Melt chocolate and butter. Cool slightly.', 'Whisk eggs, yolks and sugar until thick. Fold into chocolate.', 'Fold in flour and salt.', 'Fill ramekins. Bake at 200°C for 10–12 minutes until edges set but centre soft.', 'Turn out carefully and serve immediately.']
    },
    {
      id: 9, title: 'Earl Grey Tea Cake', category: 'cake',
      timePrep: '30 min', timeCook: '50 min', difficulty: 'Medium',
      icon: '🫖',
      ingredients: ['200ml milk', '3 Earl Grey tea bags', '200g flour', '150g sugar', '2 tsp baking powder', '2 eggs', '100g butter (melted)', 'Zest of 1 orange'],
      steps: ['Warm milk with tea bags; steep 10 minutes, then remove bags.', 'Mix dry ingredients. Whisk eggs, melted butter, cooled tea milk and zest.', 'Combine. Bake in a loaf tin at 170°C for 45–50 minutes.', 'Cool and glaze with a light orange icing if desired.']
    },
    {
      id: 10, title: 'Chai Latte', category: 'drink',
      timePrep: '5 min', timeCook: '10 min', difficulty: 'Easy',
      icon: '☕',
      ingredients: ['300ml milk', '1 black tea bag or 1 tsp loose tea', '1/2 tsp cinnamon', '1/4 tsp ginger', 'Pinch cardamom + cloves', '1–2 tsp honey', 'Optional: star anise'],
      steps: ['Simmer milk with spices and tea for 5–7 minutes.', 'Strain into a mug. Sweeten with honey.', 'Froth lightly if possible. Sip slowly.']
    },
    {
      id: 11, title: 'Berry Crumble', category: 'dessert',
      timePrep: '15 min', timeCook: '35 min', difficulty: 'Easy',
      icon: '🫐',
      ingredients: ['400g mixed berries (fresh or frozen)', '2 tbsp sugar', '1 tbsp cornstarch', '100g flour', '60g oats', '60g butter', '40g brown sugar', 'Pinch cinnamon'],
      steps: ['Toss berries with sugar and cornstarch in a baking dish.', 'Rub butter into flour, oats, brown sugar and cinnamon until crumbly.', 'Scatter over fruit. Bake at 180°C for 30–35 minutes until golden and bubbling.', 'Serve warm with cream or ice cream.']
    },
    {
      id: 12, title: 'Simple Sugar Cookies', category: 'cookie',
      timePrep: '20 min', timeCook: '12 min', difficulty: 'Easy',
      icon: '🍪',
      ingredients: ['200g flour', '100g butter', '80g sugar', '1 egg', '1 tsp vanilla', 'Pinch salt'],
      steps: ['Cream butter and sugar. Beat in egg and vanilla.', 'Mix in flour and salt to form dough. Chill 15 minutes.', 'Roll and cut. Bake at 175°C for 10–12 minutes until edges lightly golden.', 'Cool on rack. Decorate if you like.']
    }
  ];

  const FURNITURE = [
    { id: 'bed', name: 'Bed', icon: '🛏️' },
    { id: 'desk', name: 'Desk', icon: '🖥️' },
    { id: 'chair', name: 'Chair', icon: '🪑' },
    { id: 'bookshelf', name: 'Bookshelf', icon: '📚' },
    { id: 'sofa', name: 'Sofa', icon: '🛋️' },
    { id: 'floorlamp', name: 'Floor Lamp', icon: '🪔' },
    { id: 'tablelamp', name: 'Table Lamp', icon: '💡' },
    { id: 'plant', name: 'Plant', icon: '🪴' },
    { id: 'flowers', name: 'Flowers', icon: '🌸' },
    { id: 'rug', name: 'Rug', icon: '🟫' },
    { id: 'curtains', name: 'Curtains', icon: '🪟' },
    { id: 'painting', name: 'Painting', icon: '🖼️' },
    { id: 'shelf', name: 'Shelf', icon: '📦' },
    { id: 'candle', name: 'Candle', icon: '🕯️' },
    { id: 'mug', name: 'Mug', icon: '☕' },
    { id: 'cat', name: 'Cat', icon: '🐱' }
  ];

  // ---------- State ----------
  let state = {
    mbti: localStorage.getItem('iu_mbti') || null,
    currentSection: 'home',
    playlist: [...TRACKS],
    currentTrackIndex: -1,
    isPlaying: false,
    memories: JSON.parse(localStorage.getItem('iu_memories') || '[]'),
    roomObjects: JSON.parse(localStorage.getItem('iu_room') || '[]'),
    letters: JSON.parse(localStorage.getItem('iu_letters') || '[]'),
    hiddenLetters: JSON.parse(localStorage.getItem('iu_hidden_letters') || '[]'),
    selectedObjId: null
  };

  // ---------- DOM ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const loadingScreen = $('#loading-screen');
  const mbtiModal = $('#mbti-modal');
  const app = $('#app');
  const audioEl = $('#audio-el');

  // ---------- Init ----------
  function init() {
    // Simulate loading
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        if (!state.mbti) {
          showMbtiModal();
        } else {
          applyTheme(state.mbti);
          showApp();
        }
      }, 700);
    }, 1600);

    setupMbtiGrid();
    setupNav();
    setupMusic();
    setupRecipes();
    setupRoom();
    setupMemories();
    setupLetters();
    setupParallax();
    updateHomeStats();
  }

  // ---------- MBTI ----------
  function setupMbtiGrid() {
    const grid = $('#mbti-grid');
    grid.innerHTML = MBTI_TYPES.map(t => `
      <button class="mbti-btn" data-type="${t.code}">
        <span class="type-name">${t.code}</span>
        <span class="type-desc">${t.name}</span>
      </button>
    `).join('');

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.mbti-btn');
      if (!btn) return;
      const type = btn.dataset.type;
      selectMbti(type);
    });
  }

  function selectMbti(type) {
    state.mbti = type;
    localStorage.setItem('iu_mbti', type);
    applyTheme(type);
    mbtiModal.classList.add('hidden');
    showApp();
    updateHomeStats();
    renderRecommendations();
  }

  function applyTheme(type) {
    document.body.dataset.theme = type;
    const navMbti = $('#nav-mbti');
    if (navMbti) navMbti.textContent = type;
    const hero = $('#hero-greeting');
    if (hero) {
      const info = MBTI_TYPES.find(t => t.code === type);
      hero.textContent = info
        ? `A sanctuary shaped for the ${info.name} within you.`
        : 'A sanctuary shaped for the way you feel the world.';
    }
  }

  function showMbtiModal() {
    mbtiModal.classList.remove('hidden');
  }

  function showApp() {
    app.classList.remove('hidden');
  }

  // ---------- Navigation ----------
  function setupNav() {
    $$('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const section = btn.dataset.section;
        switchSection(section);
      });
    });
    $$('.home-card').forEach(card => {
      card.addEventListener('click', () => {
        switchSection(card.dataset.goto);
      });
    });
  }

  function switchSection(name) {
    state.currentSection = name;
    $$('.section').forEach(s => s.classList.remove('active'));
    const target = $(`#section-${name}`);
    if (target) target.classList.add('active');
    $$('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.section === name);
    });
  }

  // ---------- Music Player (Persistent) ----------
  function setupMusic() {
    renderTracks();
    renderRecommendations();
    setupMoodFilters();
    setupSearch();

    $('#play-btn').addEventListener('click', togglePlay);
    $('#prev-btn').addEventListener('click', playPrev);
    $('#next-btn').addEventListener('click', playNext);
    $('#volume').addEventListener('input', (e) => {
      audioEl.volume = parseFloat(e.target.value);
    });
    $('#progress').addEventListener('input', (e) => {
      if (audioEl.duration) {
        audioEl.currentTime = (e.target.value / 100) * audioEl.duration;
      }
    });

    audioEl.addEventListener('timeupdate', updateProgress);
    audioEl.addEventListener('ended', playNext);
    audioEl.addEventListener('loadedmetadata', () => {
      $('#duration').textContent = formatTime(audioEl.duration);
    });
    audioEl.volume = 0.7;
  }

  function renderTracks(filterMood = 'all', search = '') {
    const grid = $('#track-grid');
    let list = state.playlist;
    if (filterMood !== 'all') {
      list = list.filter(t => t.mood === filterMood);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q)
      );
    }
    if (list.length === 0) {
      grid.innerHTML = '<p class="empty-state">No tracks match your filters.</p>';
      return;
    }
    grid.innerHTML = list.map(t => `
      <div class="track-card" data-id="${t.id}">
        <div class="track-cover">${t.icon}</div>
        <div class="track-name">${t.title}</div>
        <div class="track-meta">${t.artist} · ${t.mood}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.track-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id, 10);
        playTrackById(id);
      });
    });
  }

  function setupMoodFilters() {
    $$('.mood-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.mood-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mood = btn.dataset.mood;
        const search = $('#music-search').value;
        renderTracks(mood, search);
      });
    });
  }

  function setupSearch() {
    const input = $('#music-search');
    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const activeMood = $('.mood-btn.active')?.dataset.mood || 'all';
        renderTracks(activeMood, input.value);
      }, 200);
    });
  }

  function renderRecommendations() {
    const container = $('#recommended-list');
    if (!state.mbti) {
      container.innerHTML = '<p class="rec-note">Select your type first</p>';
      return;
    }
    const moods = MBTI_MOODS[state.mbti] || ['calm', 'ambient'];
    const recs = TRACKS.filter(t => moods.includes(t.mood)).slice(0, 5);
    container.innerHTML = recs.map(t => `
      <div class="rec-item" data-id="${t.id}">${t.icon} ${t.title}</div>
    `).join('');
    container.querySelectorAll('.rec-item').forEach(el => {
      el.addEventListener('click', () => playTrackById(parseInt(el.dataset.id, 10)));
    });
    const note = $('#mbti-rec');
    if (note) note.textContent = `Suggested for ${state.mbti}`;
  }

  function playTrackById(id) {
    const index = state.playlist.findIndex(t => t.id === id);
    if (index === -1) return;
    state.currentTrackIndex = index;
    loadAndPlay(state.playlist[index]);
  }

  function loadAndPlay(track) {
    audioEl.src = track.url;
    audioEl.play().then(() => {
      state.isPlaying = true;
      updatePlayerUI(track);
      $('#music-player').classList.add('playing');
      $('#play-btn').textContent = '⏸';
    }).catch(err => {
      console.warn('Playback failed (CORS or network). Try another track or host your own files.', err);
      alert('Could not play this track. The demo uses external sample files that may be blocked by the browser. You can replace the URLs in script.js with your own locally hosted or CORS-enabled audio files.');
    });
  }

  function togglePlay() {
    if (state.currentTrackIndex < 0) {
      // Play first recommended or first track
      if (state.playlist.length) playTrackById(state.playlist[0].id);
      return;
    }
    if (state.isPlaying) {
      audioEl.pause();
      state.isPlaying = false;
      $('#play-btn').textContent = '▶';
      $('#music-player').classList.remove('playing');
    } else {
      audioEl.play();
      state.isPlaying = true;
      $('#play-btn').textContent = '⏸';
      $('#music-player').classList.add('playing');
    }
  }

  function playNext() {
    if (state.playlist.length === 0) return;
    state.currentTrackIndex = (state.currentTrackIndex + 1) % state.playlist.length;
    loadAndPlay(state.playlist[state.currentTrackIndex]);
  }

  function playPrev() {
    if (state.playlist.length === 0) return;
    state.currentTrackIndex = (state.currentTrackIndex - 1 + state.playlist.length) % state.playlist.length;
    loadAndPlay(state.playlist[state.currentTrackIndex]);
  }

  function updatePlayerUI(track) {
    $('#track-title').textContent = track.title;
    $('#track-artist').textContent = track.artist;
  }

  function updateProgress() {
    if (!audioEl.duration) return;
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    $('#progress').value = pct;
    $('#current-time').textContent = formatTime(audioEl.currentTime);
  }

  function formatTime(sec) {
    if (!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // ---------- Recipes ----------
  function setupRecipes() {
    renderRecipes();
    $('#recipe-search').addEventListener('input', () => {
      const cat = $('.filter-btn.active')?.dataset.cat || 'all';
      renderRecipes(cat, $('#recipe-search').value);
    });
    $$('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderRecipes(btn.dataset.cat, $('#recipe-search').value);
      });
    });
    $('#recipe-close').addEventListener('click', () => {
      $('#recipe-modal').classList.add('hidden');
    });
    $('#recipe-modal').addEventListener('click', (e) => {
      if (e.target.id === 'recipe-modal') $('#recipe-modal').classList.add('hidden');
    });
  }

  function renderRecipes(cat = 'all', search = '') {
    const grid = $('#recipe-grid');
    let list = RECIPES;
    if (cat !== 'all') list = list.filter(r => r.category === cat);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(r => r.title.toLowerCase().includes(q) || r.category.includes(q));
    }
    if (list.length === 0) {
      grid.innerHTML = '<p class="empty-state">No recipes found.</p>';
      return;
    }
    grid.innerHTML = list.map(r => `
      <div class="recipe-card" data-id="${r.id}">
        <div class="recipe-img">${r.icon}</div>
        <div class="recipe-body">
          <h3>${r.title}</h3>
          <div class="recipe-meta">
            <span>⏱ ${r.timePrep} + ${r.timeCook}</span>
            <span>${r.difficulty}</span>
          </div>
          <div class="recipe-tags"><span class="tag">${r.category}</span></div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.recipe-card').forEach(card => {
      card.addEventListener('click', () => openRecipe(parseInt(card.dataset.id, 10)));
    });
  }

  function openRecipe(id) {
    const r = RECIPES.find(x => x.id === id);
    if (!r) return;
    const content = $('#recipe-detail-content');
    content.innerHTML = `
      <div style="font-size:3rem;margin-bottom:12px">${r.icon}</div>
      <h2>${r.title}</h2>
      <div class="meta-row">
        <span>Prep: ${r.timePrep}</span>
        <span>Cook: ${r.timeCook}</span>
        <span>Difficulty: ${r.difficulty}</span>
      </div>
      <h4>Ingredients</h4>
      <ul>${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      <h4>Steps</h4>
      <ol>${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>
    `;
    $('#recipe-modal').classList.remove('hidden');
  }

  // ---------- Room Designer ----------
  function setupRoom() {
    const list = $('#object-list');
    list.innerHTML = FURNITURE.map(f => `
      <div class="obj-item" draggable="true" data-id="${f.id}" data-name="${f.name}" data-icon="${f.icon}">
        <span class="obj-icon">${f.icon}</span>
        ${f.name}
      </div>
    `).join('');

    // Drag from sidebar
    list.querySelectorAll('.obj-item').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({
          id: item.dataset.id,
          name: item.dataset.name,
          icon: item.dataset.icon
        }));
      });
    });

    const room = $('#room-3d');
    const objectsContainer = $('#room-objects');

    room.addEventListener('dragover', (e) => e.preventDefault());
    room.addEventListener('drop', (e) => {
      e.preventDefault();
      try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const rect = room.getBoundingClientRect();
        const x = e.clientX - rect.left - 30;
        const y = e.clientY - rect.top - 30;
        addRoomObject(data, x, y);
      } catch (_) {}
    });

    // Also support click-to-place for mobile-ish
    list.querySelectorAll('.obj-item').forEach(item => {
      item.addEventListener('click', () => {
        const data = {
          id: item.dataset.id,
          name: item.dataset.name,
          icon: item.dataset.icon
        };
        // Place roughly in center
        addRoomObject(data, 180 + Math.random() * 80, 200 + Math.random() * 60);
      });
    });

    $('#save-room').addEventListener('click', saveRoom);
    $('#clear-room').addEventListener('click', clearRoom);
    $('#load-room').addEventListener('click', () => {
      state.roomObjects = JSON.parse(localStorage.getItem('iu_room') || '[]');
      renderRoomObjects();
      updateHomeStats();
    });

    renderRoomObjects();
  }

  function addRoomObject(data, x, y) {
    const obj = {
      uid: Date.now() + Math.random().toString(36).slice(2, 7),
      type: data.id,
      name: data.name,
      icon: data.icon,
      x: Math.max(10, Math.min(x, 500)),
      y: Math.max(40, Math.min(y, 400)),
      rot: 0
    };
    state.roomObjects.push(obj);
    renderRoomObjects();
    updateHomeStats();
  }

  function renderRoomObjects() {
    const container = $('#room-objects');
    container.innerHTML = state.roomObjects.map(o => `
      <div class="placed-obj ${state.selectedObjId === o.uid ? 'selected' : ''}"
           data-uid="${o.uid}"
           style="left:${o.x}px; top:${o.y}px; transform: rotate(${o.rot}deg);">
        <span class="obj-visual">${o.icon}</span>
        <span class="obj-label">${o.name}</span>
      </div>
    `).join('');

    // Make draggable
    container.querySelectorAll('.placed-obj').forEach(el => {
      el.addEventListener('mousedown', startDrag);
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        state.selectedObjId = el.dataset.uid;
        renderRoomObjects();
      });
      // Double click to remove
      el.addEventListener('dblclick', () => {
        state.roomObjects = state.roomObjects.filter(o => o.uid !== el.dataset.uid);
        state.selectedObjId = null;
        renderRoomObjects();
        updateHomeStats();
      });
    });

    // Click empty to deselect
    $('#room-3d').addEventListener('click', (e) => {
      if (e.target.id === 'room-3d' || e.target.classList.contains('room-floor') || e.target.classList.contains('room-wall')) {
        state.selectedObjId = null;
        renderRoomObjects();
      }
    });
  }

  let dragState = null;
  function startDrag(e) {
    const el = e.currentTarget;
    const uid = el.dataset.uid;
    const obj = state.roomObjects.find(o => o.uid === uid);
    if (!obj) return;
    state.selectedObjId = uid;
    dragState = {
      uid,
      startX: e.clientX,
      startY: e.clientY,
      origX: obj.x,
      origY: obj.y
    };
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
    e.preventDefault();
  }

  function onDrag(e) {
    if (!dragState) return;
    const obj = state.roomObjects.find(o => o.uid === dragState.uid);
    if (!obj) return;
    obj.x = Math.max(5, dragState.origX + (e.clientX - dragState.startX));
    obj.y = Math.max(30, dragState.origY + (e.clientY - dragState.startY));
    const el = $(`.placed-obj[data-uid="${dragState.uid}"]`);
    if (el) {
      el.style.left = obj.x + 'px';
      el.style.top = obj.y + 'px';
    }
  }

  function endDrag() {
    dragState = null;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    renderRoomObjects();
  }

  function saveRoom() {
    localStorage.setItem('iu_room', JSON.stringify(state.roomObjects));
    alert('Room design saved to this browser.');
    updateHomeStats();
  }

  function clearRoom() {
    if (confirm('Clear all objects from the room?')) {
      state.roomObjects = [];
      state.selectedObjId = null;
      renderRoomObjects();
      updateHomeStats();
    }
  }

  // ---------- Memories ----------
  function setupMemories() {
    const photoInput = $('#mem-photo');
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        $('#photo-preview').innerHTML = `<img src="${ev.target.result}" alt="Preview">`;
        photoInput.dataset.dataurl = ev.target.result;
      };
      reader.readAsDataURL(file);
    });

    $('#save-memory').addEventListener('click', saveMemory);
    renderMemories();
  }

  function saveMemory() {
    const title = $('#mem-title').value.trim();
    const date = $('#mem-date').value || new Date().toISOString().slice(0, 10);
    const mood = $('#mem-mood').value;
    const text = $('#mem-text').value.trim();
    const photo = $('#mem-photo').dataset.dataurl || null;

    if (!title && !text) {
      alert('Please write a title or some text for your memory.');
      return;
    }

    const mem = {
      id: Date.now(),
      title: title || 'Untitled',
      date,
      mood,
      text,
      photo
    };
    state.memories.unshift(mem);
    localStorage.setItem('iu_memories', JSON.stringify(state.memories));
    // Reset form
    $('#mem-title').value = '';
    $('#mem-date').value = '';
    $('#mem-text').value = '';
    $('#mem-photo').value = '';
    $('#mem-photo').dataset.dataurl = '';
    $('#photo-preview').innerHTML = '';
    renderMemories();
    updateHomeStats();
  }

  function renderMemories() {
    const list = $('#memory-list');
    if (state.memories.length === 0) {
      list.innerHTML = '<p class="empty-state">Your memory box is empty. Write the first page when you are ready.</p>';
      return;
    }
    list.innerHTML = state.memories.map(m => `
      <div class="memory-card" data-id="${m.id}">
        <div class="mem-header">
          <h4>${escapeHtml(m.title)}</h4>
          <span class="mem-date">${m.date}</span>
        </div>
        <span class="mem-mood">${m.mood}</span>
        ${m.photo ? `<img class="mem-photo" src="${m.photo}" alt="">` : ''}
        <div class="mem-body">${escapeHtml(m.text)}</div>
        <div class="mem-actions">
          <button class="edit-mem">Edit</button>
          <button class="del-mem">Delete</button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.del-mem').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.memory-card');
        const id = parseInt(card.dataset.id, 10);
        if (confirm('Delete this memory?')) {
          state.memories = state.memories.filter(m => m.id !== id);
          localStorage.setItem('iu_memories', JSON.stringify(state.memories));
          renderMemories();
          updateHomeStats();
        }
      });
    });

    list.querySelectorAll('.edit-mem').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.memory-card');
        const id = parseInt(card.dataset.id, 10);
        const m = state.memories.find(x => x.id === id);
        if (!m) return;
        $('#mem-title').value = m.title;
        $('#mem-date').value = m.date;
        $('#mem-mood').value = m.mood;
        $('#mem-text').value = m.text;
        if (m.photo) {
          $('#photo-preview').innerHTML = `<img src="${m.photo}" alt="">`;
          $('#mem-photo').dataset.dataurl = m.photo;
        }
        // Remove old and let user re-save
        state.memories = state.memories.filter(x => x.id !== id);
        localStorage.setItem('iu_memories', JSON.stringify(state.memories));
        renderMemories();
        switchSection('memories');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------- Letters ----------
  function setupLetters() {
    $('#send-letter').addEventListener('click', () => {
      const text = $('#letter-text').value.trim();
      if (!text) return;
      // Basic filter
      const banned = ['kill', 'hate', 'suicide', 'nazi', 'fuck you'];
      const lower = text.toLowerCase();
      if (banned.some(w => lower.includes(w))) {
        alert('This message appears to contain inappropriate content and was not saved.');
        return;
      }
      const letter = {
        id: Date.now(),
        text,
        date: new Date().toLocaleDateString()
      };
      state.letters.unshift(letter);
      localStorage.setItem('iu_letters', JSON.stringify(state.letters));
      $('#letter-text').value = '';
      renderLetters();
    });
    renderLetters();
  }

  function renderLetters() {
    const list = $('#letter-list');
    const visible = state.letters.filter(l => !state.hiddenLetters.includes(l.id));
    if (visible.length === 0) {
      list.innerHTML = '<p class="empty-state">No letters yet. Leave one for yourself — or imagine others.</p>';
      return;
    }
    list.innerHTML = visible.map(l => `
      <div class="letter-item" data-id="${l.id}">
        <div>${escapeHtml(l.text)}</div>
        <div class="letter-meta">
          <span>${l.date} · Anonymous</span>
          <button class="hide-btn">Hide</button>
        </div>
      </div>
    `).join('');
    list.querySelectorAll('.hide-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.closest('.letter-item').dataset.id, 10);
        state.hiddenLetters.push(id);
        localStorage.setItem('iu_hidden_letters', JSON.stringify(state.hiddenLetters));
        renderLetters();
      });
    });
  }

  // ---------- Parallax ----------
  function setupParallax() {
    const layers = {
      stars: $('#stars-layer'),
      particles: $('#particles-layer'),
      distant: $('#distant-layer'),
      mid: $('#mid-layer'),
      near: $('#near-layer'),
      glow: $('#glow-orb')
    };
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (layers.stars) layers.stars.style.transform = `translate(${x * 8}px, ${y * 6}px)`;
      if (layers.particles) layers.particles.style.transform = `translate(${x * 15}px, ${y * 12}px)`;
      if (layers.distant) layers.distant.style.transform = `translate(${x * 25}px, ${y * 18}px)`;
      if (layers.mid) layers.mid.style.transform = `translate(${x * 40}px, ${y * 30}px)`;
      if (layers.glow) layers.glow.style.transform = `translate(${x * -20}px, ${y * -15}px)`;
    });
  }

  // ---------- Home Stats ----------
  function updateHomeStats() {
    $('#stat-memories').textContent = state.memories.length;
    $('#stat-room').textContent = state.roomObjects.length ? `${state.roomObjects.length} objects` : 'Empty';
    $('#stat-type').textContent = state.mbti || '—';
  }

  // Start
  init();
})();
