// HYBRID SOUND SYSTEM - DARK SOULS + JOJO
class HybridSoundSystem {
  constructor() {
    this.audioContext = null;
    this.initialized = false;
  }

  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
      console.log('>> SOUND SYSTEM: Bonfire Lit & Stands Awakened!');
    } catch (e) {
      console.log('>> SOUND SYSTEM: Audio not supported');
    }
  }

  // Звуки Dark Souls
  playSoulsSound(type = 'sword') {
    if (!this.initialized) this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Металлический звук меча
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.3);
    
    // Визуальный эффект
    this.createSoulsEffect('⚔️');
  }

  playEstusSound() {
    if (!this.initialized) this.init();
    if (!this.audioContext) return;

    // Звук разбития стекла и исцеления
    const frequencies = [523.25, 659.25, 783.99]; // C, E, G
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.5);
      }, i * 100);
    });
    
    this.createSoulsEffect('💚');
  }

  playBonfireSound() {
    if (!this.initialized) this.init();
    if (!this.audioContext) return;

    // Треск огня
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(50 + Math.random() * 100, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
      }, i * 200);
    }
    
    this.createSoulsEffect('🔥');
  }

  // Звуки JoJo
  playJojoSound(type = 'random') {
    const sounds = {
      'dora': ['ド', 'ド', 'ド'],
      'wryyy': ['ウ', 'ラ', 'ウ', 'ラ'],
      'muda': ['ム', 'ダ', 'ム', 'ダ'],
      'ora': ['オ', 'ラ', 'オ', 'ラ']
    };
    
    const soundType = type === 'random' ? 
      Object.keys(sounds)[Math.floor(Math.random() * Object.keys(sounds).length)] : 
      type;
    
    const pattern = sounds[soundType] || sounds.dora;
    
    pattern.forEach((char, index) => {
      setTimeout(() => {
        this.generateJojoSound(char);
        this.createJojoEffect(char);
      }, index * 80);
    });
  }

  generateJojoSound(char) {
    if (!this.initialized) this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    let frequency = 200;
    switch(char) {
      case 'ド': frequency = 180; break;
      case 'ウ': frequency = 120; break;
      case 'ラ': frequency = 250; break;
      case 'ム': frequency = 220; break;
      case 'ダ': frequency = 160; break;
      case 'オ': frequency = 280; break;
    }
    
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  // Визуальные эффекты
  createSoulsEffect(symbol) {
    const effect = document.createElement('div');
    effect.textContent = symbol;
    effect.style.cssText = `
      position: fixed;
      font-size: 24px;
      color: #FFD700;
      text-shadow: 0 0 10px #FF6B00;
      pointer-events: none;
      z-index: 10000;
      animation: soulsFloat 1.5s forwards;
    `;
    
    effect.style.left = `${30 + Math.random() * 40}%`;
    effect.style.top = `${30 + Math.random() * 40}%`;
    
    document.body.appendChild(effect);
    
    setTimeout(() => effect.remove(), 1500);
  }

  createJojoEffect(char) {
    const effect = document.createElement('div');
    effect.textContent = char;
    effect.style.cssText = `
      position: fixed;
      font-family: 'MS Gothic', monospace;
      font-size: 36px;
      color: #DC143C;
      text-shadow: 0 0 15px #FFD700;
      pointer-events: none;
      z-index: 10000;
      animation: jojoFloat 1s forwards;
      font-weight: bold;
    `;
    
    effect.style.left = `${Math.random() * 80 + 10}%`;
    effect.style.top = `${Math.random() * 80 + 10}%`;
    
    document.body.appendChild(effect);
    
    setTimeout(() => effect.remove(), 1000);
  }
}

// Глобальный объект
window.hybridSounds = new HybridSoundSystem();

// Автоматическая инициализация
document.addEventListener('DOMContentLoaded', () => {
  window.hybridSounds.init();
  
  // Добавляем CSS анимации
  const style = document.createElement('style');
  style.textContent = `
    @keyframes soulsFloat {
      0% { opacity: 1; transform: translate(0, 0) scale(1); }
      100% { opacity: 0; transform: translate(0, -100px) scale(0.5); }
    }
    
    @keyframes jojoFloat {
      0% { opacity: 1; transform: translate(0, 0) scale(1); }
      50% { opacity: 1; transform: translate(0, -30px) scale(1.5); }
      100% { opacity: 0; transform: translate(0, -60px) scale(0.5); }
    }
  `;
  document.head.appendChild(style);
});
