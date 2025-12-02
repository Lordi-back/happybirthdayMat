// JOJO SOUND SYSTEM
class JojoSoundSystem {
  constructor() {
    this.sounds = {
      // Массив URL для звуков (нужно будет загрузить или сгенерировать)
      dora: ['ド', 'ド', 'ド'], // DORARARA
      wryyy: ['ウ', 'ラ', 'ウ', 'ラ'], // WRYYYY
      muda: ['ム', 'ダ', 'ム', 'ダ'], // MUDAMUDAMUDA
      ora: ['オ', 'ラ', 'オ', 'ラ'], // ORAORAORA
      yareyare: ['や', 'れ', 'や', 'れ'] // YAREYARE
    };
    
    this.audioContext = null;
    this.initialized = false;
  }

  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
      console.log('>> SOUND SYSTEM: スタンド発動!');
    } catch (e) {
      console.log('>> SOUND SYSTEM: ブラウザが音声をサポートしていません');
    }
  }

  // Генератор звука Jojo
  playJojoSound(type = 'dora') {
    if (!this.initialized) this.init();
    if (!this.audioContext) return;

    const soundPattern = this.sounds[type] || this.sounds.dora;
    
    soundPattern.forEach((char, index) => {
      setTimeout(() => {
        this.generateSound(char, index * 100);
      }, index * 80);
    });
  }

  generateSound(character, delay) {
    setTimeout(() => {
      try {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Разные частоты для разных символов
        let frequency = 200;
        switch(character) {
          case 'ド': frequency = 180; break; // Низкий
          case 'ウ': frequency = 120; break; // Очень низкий
          case 'ラ': frequency = 250; break; // Высокий
          case 'ム': frequency = 220; break;
          case 'ダ': frequency = 160; break;
          case 'オ': frequency = 280; break;
          case 'や': frequency = 150; break;
          case 'れ': frequency = 230; break;
        }
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sawtooth'; // Агрессивный звук
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.2);
        
        // Визуальный эффект
        this.createVisualEffect(character);
        
      } catch (e) {
        console.log('Sound error:', e);
      }
    }, delay);
  }

  createVisualEffect(char) {
    const effect = document.createElement('div');
    effect.className = 'sound-effect';
    effect.textContent = char;
    effect.style.cssText = `
      position: fixed;
      font-family: 'MS Gothic', monospace;
      font-size: 32px;
      color: #FFD700;
      text-shadow: 0 0 10px #DC143C;
      pointer-events: none;
      z-index: 10000;
      animation: floatUp 1s forwards;
    `;
    
    // Случайная позиция рядом с курсором
    const x = (Math.random() * 100 - 50) + 50;
    const y = (Math.random() * 100 - 50) + 50;
    effect.style.left = `${x}%`;
    effect.style.top = `${y}%`;
    
    document.body.appendChild(effect);
    
    // Удаляем после анимации
    setTimeout(() => effect.remove(), 1000);
  }
}

// Глобальный объект звуков
window.jojoSounds = new JojoSoundSystem();

// Автоматическая привязка к кнопкам
document.addEventListener('DOMContentLoaded', () => {
  // Инициализируем звуковую систему
  window.jojoSounds.init();
  
  // Привязываем звуки ко всем кнопкам Jojo
  const jojoButtons = document.querySelectorAll('.jojo-button, button, input[type="button"], .stand-card');
  
  jojoButtons.forEach(button => {
    // Случайный выбор звука
    const soundTypes = ['dora', 'wryyy', 'muda', 'ora'];
    const randomSound = soundTypes[Math.floor(Math.random() * soundTypes.length)];
    
    // При наведении
    button.addEventListener('mouseenter', (e) => {
      if (Math.random() > 0.3) { // 70% шанс воспроизведения
        window.jojoSounds.playJojoSound(randomSound);
      }
    });
    
    // При клике
    button.addEventListener('click', (e) => {
      window.jojoSounds.playJojoSound('ora');
    });
  });
  
  // Добавляем стили для визуальных эффектов
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% { 
        opacity: 1;
        transform: translate(0, 0) scale(1);
      }
      100% { 
        opacity: 0;
        transform: translate(0, -100px) scale(1.5);
      }
    }
    
    .sound-effect {
      animation: floatUp 1s forwards !important;
    }
  `;
  document.head.appendChild(style);
});
