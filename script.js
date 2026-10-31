// xinhelper — ระบบคำนวณราคาไอเทม & แจ้งเตือนกิจกรรม

// 1. ราคากลางไอเทมทั้งหมด (XC)
const ITEM_CATALOG = {
  // แร่ธาตุ
  coal:           { id: 'coal',           name: 'Coal',            nameTh: 'ถ่านหิน',          price: 30,       category: 'mineral',   emoji: '🪨' },
  copper:         { id: 'copper',         name: 'Copper',          nameTh: 'แร่ทองแดง',         price: 60,       category: 'mineral',   emoji: '⛏️' },
  goldIngot:      { id: 'goldIngot',      name: 'Gold Ingot',      nameTh: 'แร่ทองคำ',          price: 80,       category: 'mineral',   emoji: '🪙' },
  ironIngot:      { id: 'ironIngot',      name: 'Iron Ingot',      nameTh: 'แร่เหล็ก',          price: 110,      category: 'mineral',   emoji: '⚙️' },
  diamond:        { id: 'diamond',        name: 'Diamond',         nameTh: 'แร่เพชร',            price: 150,      category: 'mineral',   emoji: '💎' },
  diamondBox:     { id: 'diamondBox',     name: 'Diamond Box',     nameTh: 'กล่องเพชร (100 ชิ้น)', price: 15000,   category: 'mineral',   emoji: '📦' },
  ruby:           { id: 'ruby',           name: 'Ruby',            nameTh: 'แร่ทับทิม',          price: 300,      category: 'mineral',   emoji: '♦️' },
  emerald:        { id: 'emerald',        name: 'Emerald',         nameTh: 'แร่มรกต',           price: 900,      category: 'mineral',   emoji: '❇️' },
  solarite:       { id: 'solarite',       name: 'Solarite',        nameTh: 'แร่สุริยัน',         price: 700,      category: 'mineral',   emoji: '☀️' },
  pureCrystal:    { id: 'pureCrystal',    name: 'Pure Crystal',    nameTh: 'คริสตัลบริสุทธิ์',     price: 80000,    category: 'mineral',   emoji: '🔮' },
  gemStone:       { id: 'gemStone',       name: 'Gem stone',       nameTh: 'แร่รุ้ง',           price: 100000,   category: 'mineral',   emoji: '💠' },
  jadeShard:      { id: 'jadeShard',      name: 'Jade Shard',      nameTh: 'เศษหยก',            price: 12000,    category: 'mineral',   emoji: '🧩' },
  jade:           { id: 'jade',           name: 'Jade',            nameTh: 'หยก',              price: 240000,   category: 'mineral',   emoji: '🧿' },
  vibraniumScrap: { id: 'vibraniumScrap', name: 'Vibranium Scrap', nameTh: 'เศษแร่ไวเบรเนียม',   price: 21000,    category: 'mineral',   emoji: '🔩' },
  vibranium:      { id: 'vibranium',      name: 'Vibranium',       nameTh: 'ไวเบรเนียม',        price: 2100000,  category: 'mineral',   emoji: '⚛️' },

  // ของทั่วไป & วัตถุดิบ
  steelBar:       { id: 'steelBar',       name: 'Steel Bar',       nameTh: 'แท่งเหล็กกล้า',      price: 7000,     category: 'general',   emoji: '🏗️' },
  wire:           { id: 'wire',           name: 'สายไฟ',           nameTh: 'สายไฟ',             price: 4500,     category: 'general',   emoji: '🔌' },
  cement:         { id: 'cement',         name: 'ปูน',             nameTh: 'ปูน',               price: 5500,     category: 'general',   emoji: '🧱' },
  redMoney:       { id: 'redMoney',       name: 'เงินแดง',         nameTh: 'เงินแดง',           price: 90,       category: 'general',   emoji: '💵' },
  yellowScrew:    { id: 'yellowScrew',    name: 'Yellow Screw',    nameTh: 'น็อตเกลียวสีเหลือง',   price: 10000,    category: 'general',   emoji: '🟡' },
  normalScrew:    { id: 'normalScrew',    name: 'Normal Screw',    nameTh: 'น็อตธรรมดา',        price: 15000,    category: 'general',   emoji: '⚪' },
  cyanScrew:      { id: 'cyanScrew',      name: 'Cyan Screw',      nameTh: 'น็อตเกลียวสีฟ้า',     price: 30000,    category: 'general',   emoji: '🔵' },

  // อุปกรณ์ & อาวุธ
  aed:            { id: 'aed',            name: 'Aed',             nameTh: 'ที่ชุบ',            price: 7000,     category: 'equipment', emoji: '⚡' },
  powerA:         { id: 'powerA',         name: 'Power A',         nameTh: 'พาวเวอร์ A',         price: 30000,    category: 'equipment', emoji: '🔋' },
  powerB:         { id: 'powerB',         name: 'Power B',         nameTh: 'พาวเวอร์ B',         price: 20000,    category: 'equipment', emoji: '🔋' },
  powerC:         { id: 'powerC',         name: 'Power C',         nameTh: 'พาวเวอร์ C',         price: 10000,    category: 'equipment', emoji: '🔋' },
  lockpick:       { id: 'lockpick',       name: 'Lockpick',        nameTh: 'อุปกรณ์สะเดาะกุญแจ',  price: 21000,    category: 'equipment', emoji: '🗝️' },
  masterLockpick: { id: 'masterLockpick', name: 'Master Lockpick', nameTh: 'กุญแจผีระดับมาสเตอร์', price: 17000,   category: 'equipment', emoji: '🔑' },
  weaponKitT1:    { id: 'weaponKitT1',    name: 'Weapon kit T1',   nameTh: 'กล่องตีอาวุธ',       price: 60000,    category: 'equipment', emoji: '🧰' },
  weaponCard:     { id: 'weaponCard',     name: 'Weapon Card',     nameTh: 'บัตรตีอาวุธ',        price: 800,      category: 'equipment', emoji: '🃏' },
  vest:           { id: 'vest',           name: 'Vest',            nameTh: 'เกราะ',            price: 11000,    category: 'equipment', emoji: '🛡️' },
  heavenKey:      { id: 'heavenKey',      name: 'Heaven Key',      nameTh: 'กุญแจเปิดกล่องสวรรค์', price: 3000,    category: 'equipment', emoji: '🗝️' },
  ammo:           { id: 'ammo',           name: 'กระสุนปืน',       nameTh: 'กระสุนปืน',         price: 3000,     category: 'equipment', emoji: '🎯' },

  // ยา & แคปซูล
  capBlue:        { id: 'capBlue',        name: 'แคปฟ้า',          nameTh: 'แคปซูลฟ้า',         price: 20000,    category: 'capsule',   emoji: '💊' },
  capGreen:       { id: 'capGreen',       name: 'แคปเขียว',        nameTh: 'แคปซูลเขียว',       price: 30000,    category: 'capsule',   emoji: '💊' },
  capRed:         { id: 'capRed',         name: 'แคปแดง',          nameTh: 'แคปซูลแดง',         price: 40000,    category: 'capsule',   emoji: '💊' },
};
// 2. กิจกรรมแบบวนซ้ำ (มีคูลดาวน์)
const RECURRING_EVENTS = [
  { id: 'container',    name: 'Container',      nameTh: 'ปล้นคอนเทนเนอร์',  intervalMin: 60, emoji: '📦' },
  { id: 'robStore',     name: 'Rob Store',      nameTh: 'งัดร้าน',          intervalMin: 60, emoji: '🏪' },
  { id: 'fixElectric',  name: 'Fix Electric',   nameTh: 'ซ่อมไฟ',          intervalMin: 20, emoji: '⚡' },
  { id: 'fixPipe',      name: 'Fix Pipe',       nameTh: 'ซ่อมท่อ',          intervalMin: 35, emoji: '🚰' },
  { id: 'divineDealer', name: 'Divine Dealer',  nameTh: 'ดีลเลอร์',         intervalMin: 50, emoji: '🧙‍♂️' },
];

// 3. ตารางกิจกรรมประจำวันตามเวลาจริง
const FIXED_SCHEDULE = [
  { time: '01:00', events: ['Bingo (บิงโก)'] },
  { time: '02:00', events: ['Loot Box (กล่องสุ่ม)'] },
  { time: '03:00', events: ["Don't Fall (อย่าตก)"] },
  { time: '04:00', events: ['Mega Cement (เมกาเซเมนต์)'] },
  { time: '05:00', events: ['Bingo (บิงโก)'] },
  { time: '06:00', events: ['Restart Server (รีสตาร์ทเซิร์ฟเวอร์)'] },
  { time: '07:00', events: ['Paintball (เพนท์บอล)'] },
  { time: '08:00', events: ['Capture the Flag (ชิงธง)'] },
  { time: '09:00', events: ["Don't Fall (อย่าตก)"] },
  { time: '10:00', events: ['Mega Cement (เมกาเซเมนต์)'] },
  { time: '11:00', events: ['Bingo (บิงโก)'] },
  { time: '12:00', events: ['Loot Box (กล่องสุ่ม)'] },
  { time: '13:00', events: ["Don't Fall (อย่าตก)"] },
  { time: '14:00', events: ['Capture the Flag (ชิงธง)'] },
  { time: '15:00', events: ['Loot Box (กล่องสุ่ม)'] },
  { time: '16:00', events: ['Airdrop (แอร์ดรอป)'] },
  { time: '16:30', events: ['Mega Cement (เมกาเซเมนต์)'] },
  { time: '17:00', events: ['Loot Box (กล่องสุ่ม)'] },
  { time: '17:30', events: ['Bingo (บิงโก)'] },
  { time: '18:00', events: ['Restart Server (รีสตาร์ทเซิร์ฟเวอร์)'] },
  { time: '18:30', events: ["Don't Fall (อย่าตก)", 'Bank Truck (รถขนเงิน)'] },
  { time: '19:00', events: ['Capture the Flag (ชิงธง)'] },
  { time: '19:30', events: ['Loot Box (กล่องสุ่ม)'] },
  { time: '20:00', events: ['Paintball (เพนท์บอล)'] },
  { time: '20:30', events: ['Airdrop (แอร์ดรอป)'] },
  { time: '21:00', events: ['Bingo (บิงโก)', 'Bank Truck (รถขนเงิน)'] },
  { time: '21:30', events: ['Loot Box (กล่องสุ่ม)'] },
  { time: '22:00', events: ['Mega Cement (เมกาเซเมนต์)'] },
  { time: '22:30', events: ['Bingo (บิงโก)'] },
  { time: '23:00', events: ['Airdrop (แอร์ดรอป)'] },
  { time: '23:30', events: ["Don't Fall (อย่าตก)"] },
  { time: '00:00', events: ['Capture the Flag (ชิงธง)'] },
];

// ข้อมูลการ์ดกิจกรรมประจำวัน (สำหรับแสดงการ์ดนับถอยหลัง)
const SCHEDULED_EVENT_METAS = [
  { id: 'lootbox',    name: 'Loot Box (กล่องสุ่ม)',                 emoji: '📦', times: ['02:00', '12:00', '15:00', '17:00', '19:30', '21:30'], theme: 'amber' },
  { id: 'dontfall',   name: "Don't Fall (อย่าตก)",                emoji: '🏃', times: ['03:00', '09:00', '13:00', '18:30', '23:30'], theme: 'rose' },
  { id: 'megacement', name: 'Mega Cement (เมกาเซเมนต์)',            emoji: '🧱', times: ['04:00', '10:00', '16:30', '22:00'], theme: 'cyan' },
  { id: 'restart',    name: 'Restart Server (รีสตาร์ทเซิร์ฟเวอร์)', emoji: '⏻',  times: ['06:00', '18:00'], theme: 'red' },
  { id: 'paintball',  name: 'Paintball (เพนท์บอล)',                 emoji: '🎯', times: ['07:00', '20:00'], theme: 'emerald' },
  { id: 'ctf',        name: 'Capture the Flag (ชิงธง)',             emoji: '🏴', times: ['00:00', '08:00', '14:00', '19:00'], theme: 'indigo' },
  { id: 'bingo',      name: 'Bingo (บิงโก)',                        emoji: '🎟️', times: ['01:00', '05:00', '11:00', '17:30', '21:00', '22:30'], theme: 'purple' },
  { id: 'airdrop',    name: 'Airdrop (แอร์ดรอป)',                   emoji: '🪂', times: ['16:00', '20:30', '23:00'], theme: 'sky' },
  { id: 'banktruck',  name: 'Bank Truck (รถขนเงิน)',                emoji: '🚚', times: ['18:30', '21:00'], theme: 'gold' },
];

// 4. ตัวแปรเก็บสถานะการทำงาน (State)
let selectedQuantities = {};    // { itemId: qty }
let activeItemCategory = 'all'; // 'all', 'mineral', 'general', 'equipment', 'capsule', 'selected'
let itemSearchQuery = '';

let recurringStates = {};      // { eventId: { lastTime, nextTimestamp } }
let notifiedEvents = new Set();
let soundEnabled = true;
let advanceSeconds = 60;
let audioCtx = null;
let currentTheme = 'dark';      // 'dark' หรือ 'light'

// 5. สลับธีมมืด / สว่าง
function initTheme() {
  const savedTheme = localStorage.getItem('xinhelper_theme');
  if (savedTheme) {
    currentTheme = savedTheme;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    currentTheme = 'light';
  } else {
    currentTheme = 'dark';
  }

  applyTheme(currentTheme, false);

  const toggleBtn = document.getElementById('btnThemeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme, true);
    });
  }
}

function applyTheme(theme, showFeedback = true) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('xinhelper_theme', theme);

  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  if (theme === 'dark') {
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeText) themeText.textContent = 'โหมดมืด';
    if (showFeedback) showToast('สลับธีมสำเร็จ', 'เปลี่ยนเป็นโหมดมืด (Dark Mode)', false);
  } else {
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeText) themeText.textContent = 'โหมดสว่าง';
    if (showFeedback) showToast('สลับธีมสำเร็จ', 'เปลี่ยนเป็นโหมดสว่าง (Light Mode)', false);
  }
}

// 6. ฟังก์ชันช่วยคำนวณ & แปลงเวลา
function formatNumber(num) {
  return Number(num || 0).toLocaleString('en-US');
}

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function getNowThai() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
}

function getNowThaiStr() {
  const now = getNowThai();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

function secondsUntil(targetHH, targetMM, now) {
  const targetDate = new Date(now);
  targetDate.setHours(targetHH, targetMM, 0, 0);

  let diff = (targetDate - now) / 1000;
  if (diff <= 0) {
    diff += 86400; // ข้ามไปรอบวันถัดไป
  }
  return Math.floor(diff);
}

function secondsToHMS(totalSec) {
  if (totalSec < 0) totalSec = 0;
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// 7. ระบบเสียง & แจ้งเตือน
function playAlertChime() {
  if (!soundEnabled) return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const freqs = [587.33, 880.00, 1174.66]; // D5 -> A5 -> D6 Chime

    freqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.7);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.75);
    });
  } catch (err) {
    console.warn('AudioContext notice:', err);
  }
}

function showToast(title, message, isAlert = true) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item ${isAlert ? 'toast-alert' : 'toast-success'}`;
  toast.innerHTML = `
    <span class="toast-icon">${isAlert ? '🔔' : '✨'}</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function sendBrowserNotification(title, body) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    try {
      new Notification(title, { body: body });
    } catch (e) {}
  }
}

function triggerEventNotification(eventName, timeRemainingText) {
  playAlertChime();
  const title = `⏰ กิจกรรม: ${eventName}`;
  const message = timeRemainingText ? `ใกล้ถึงเวลาแล้ว (${timeRemainingText})` : `ถึงเวลาแล้วตอนนี้!`;
  
  showToast(title, message, true);
  sendBrowserNotification(title, message);
}

// 8. ระบบคำนวณราคาไอเทม
function loadSelectedQuantities() {
  try {
    const saved = localStorage.getItem('xinhelper_item_quantities');
    if (saved) {
      selectedQuantities = JSON.parse(saved);
    }
  } catch (e) {
    selectedQuantities = {};
  }
}

function saveSelectedQuantities() {
  localStorage.setItem('xinhelper_item_quantities', JSON.stringify(selectedQuantities));
}

function renderItemList() {
  const container = document.getElementById('itemListContainer');
  if (!container) return;

  container.innerHTML = '';
  const query = itemSearchQuery.trim().toLowerCase();
  const allItems = Object.values(ITEM_CATALOG);

  const filtered = allItems.filter(item => {
    if (activeItemCategory === 'selected') {
      const q = selectedQuantities[item.id] || 0;
      if (q <= 0) return false;
    } else if (activeItemCategory !== 'all' && item.category !== activeItemCategory) {
      return false;
    }

    if (query) {
      const en = item.name.toLowerCase();
      const th = item.nameTh.toLowerCase();
      const id = item.id.toLowerCase();
      return en.includes(query) || th.includes(query) || id.includes(query);
    }

    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="item-empty-notice">
        ${activeItemCategory === 'selected' ? 'ยังไม่ได้เลือกสิ่งของใดๆ (คลิกที่สิ่งของเพื่อเพิ่มจำนวน)' : `ไม่พบสิ่งของที่ตรงกับ "${query}"`}
      </div>
    `;
    updateItemSummary();
    return;
  }

  filtered.forEach(item => {
    const qty = selectedQuantities[item.id] || 0;
    const isSelected = qty > 0;
    const rowTotal = qty * item.price;

    const row = document.createElement('div');
    row.className = `item-row ${isSelected ? 'selected' : ''}`;
    row.dataset.id = item.id;

    row.innerHTML = `
      <div class="item-row-left">
        <span class="item-emoji" title="${item.name}">${item.emoji}</span>
        <div class="item-info">
          <div class="item-name-line">
            <span class="item-title">${item.name}</span>
            ${isSelected ? `<span class="item-badge-count">×${formatNumber(qty)}</span>` : ''}
          </div>
          <span class="item-subtext">${item.nameTh}</span>
        </div>
      </div>

      <div class="item-row-right">
        <div class="item-price-box">
          <span class="item-unit-price">${formatNumber(item.price)} <span class="currency-label">XC</span></span>
          ${isSelected ? `<span class="item-subtotal-val">= ${formatNumber(rowTotal)} XC</span>` : ''}
        </div>

        <div class="item-stepper-wrap ${isSelected ? 'has-value' : ''}">
          <button class="stepper-btn btn-minus ${qty === 0 ? 'disabled' : ''}" type="button" data-id="${item.id}" title="ลดจำนวน" aria-label="Decrease quantity">−</button>
          <input 
            type="number" 
            class="stepper-input" 
            id="input-${item.id}" 
            value="${qty}" 
            min="0" 
            data-id="${item.id}" 
            title="ระบุจำนวน"
            aria-label="Item quantity"
          >
          <button class="stepper-btn btn-plus" type="button" data-id="${item.id}" title="เพิ่มจำนวน" aria-label="Increase quantity">+</button>
        </div>
      </div>
    `;

    row.addEventListener('click', (e) => {
      if (e.target.closest('.item-stepper-wrap')) return;
      setItemQuantity(item.id, qty === 0 ? 1 : qty + 1);
    });

    container.appendChild(row);
  });

  updateItemSummary();
}

function setItemQuantity(itemId, newQty) {
  const val = Math.max(0, parseInt(newQty) || 0);
  if (val === 0) {
    delete selectedQuantities[itemId];
  } else {
    selectedQuantities[itemId] = val;
  }

  saveSelectedQuantities();
  renderItemList();

  if (val > 0) {
    const inputEl = document.getElementById(`input-${itemId}`);
    if (inputEl) {
      inputEl.focus();
      inputEl.select();
    }
  }
}

function setupItemEvents() {
  const container = document.getElementById('itemListContainer');
  const searchInput = document.getElementById('itemSearchInput');
  const clearSearchBtn = document.getElementById('searchClearBtn');
  const subtabs = document.querySelectorAll('.item-subtab-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      itemSearchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = itemSearchQuery.length > 0 ? 'block' : 'none';
      }
      renderItemList();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      itemSearchQuery = '';
      clearSearchBtn.style.display = 'none';
      searchInput.focus();
      renderItemList();
    });
  }

  subtabs.forEach(tab => {
    tab.addEventListener('click', () => {
      subtabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeItemCategory = tab.dataset.cat;
      renderItemList();
    });
  });

  if (container) {
    container.addEventListener('click', (e) => {
      const plusBtn = e.target.closest('.btn-plus');
      const minusBtn = e.target.closest('.btn-minus');

      if (plusBtn) {
        const id = plusBtn.dataset.id;
        const current = selectedQuantities[id] || 0;
        setItemQuantity(id, current + 1);
      } else if (minusBtn) {
        const id = minusBtn.dataset.id;
        const current = selectedQuantities[id] || 0;
        setItemQuantity(id, Math.max(0, current - 1));
      }
    });

    container.addEventListener('input', (e) => {
      if (e.target.classList.contains('stepper-input')) {
        const id = e.target.dataset.id;
        const val = Math.max(0, parseInt(e.target.value) || 0);
        if (val === 0) {
          delete selectedQuantities[id];
        } else {
          selectedQuantities[id] = val;
        }
        saveSelectedQuantities();
        updateItemSummary();

        const row = document.querySelector(`.item-row[data-id="${id}"]`);
        if (row) {
          const item = ITEM_CATALOG[id];
          const subtotalEl = row.querySelector('.item-subtotal-val');
          const badgeEl = row.querySelector('.item-badge-count');
          const stepperWrap = row.querySelector('.item-stepper-wrap');
          const minusBtn = row.querySelector('.btn-minus');

          if (val > 0) {
            row.classList.add('selected');
            if (stepperWrap) stepperWrap.classList.add('has-value');
            if (minusBtn) minusBtn.classList.remove('disabled');

            const nameLine = row.querySelector('.item-name-line');
            if (!badgeEl && nameLine) {
              const newBadge = document.createElement('span');
              newBadge.className = 'item-badge-count';
              newBadge.textContent = `×${formatNumber(val)}`;
              nameLine.appendChild(newBadge);
            } else if (badgeEl) {
              badgeEl.textContent = `×${formatNumber(val)}`;
            }

            const priceBox = row.querySelector('.item-price-box');
            if (!subtotalEl && priceBox) {
              const newSub = document.createElement('span');
              newSub.className = 'item-subtotal-val';
              newSub.textContent = `= ${formatNumber(val * item.price)} XC`;
              priceBox.appendChild(newSub);
            } else if (subtotalEl) {
              subtotalEl.textContent = `= ${formatNumber(val * item.price)} XC`;
            }
          } else {
            row.classList.remove('selected');
            if (stepperWrap) stepperWrap.classList.remove('has-value');
            if (minusBtn) minusBtn.classList.add('disabled');
            if (subtotalEl) subtotalEl.remove();
            if (badgeEl) badgeEl.remove();
          }
        }
      }
    });
  }

  const clearBtn = document.getElementById('btnClearAll');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (Object.keys(selectedQuantities).length === 0) return;
      selectedQuantities = {};
      saveSelectedQuantities();
      renderItemList();
      showToast('ล้างแล้ว', 'ล้างจำนวนสิ่งของทั้งหมดเรียบร้อย', false);
    });
  }

  const copyBtn = document.getElementById('btnCopySummary');
  if (copyBtn) {
    copyBtn.addEventListener('click', copySummaryToClipboard);
  }
}

function updateItemSummary() {
  let grandTotal = 0;
  let totalPieces = 0;
  const kinds = Object.keys(selectedQuantities).length;

  Object.keys(selectedQuantities).forEach(id => {
    const item = ITEM_CATALOG[id];
    const qty = selectedQuantities[id] || 0;
    if (item && qty > 0) {
      grandTotal += qty * item.price;
      totalPieces += qty;
    }
  });

  const grandTotalEl = document.getElementById('grandTotal');
  const kindsEl = document.getElementById('totalKindsCount');
  const piecesEl = document.getElementById('totalPiecesCount');
  const tabSelectedCountEl = document.getElementById('tabSelectedCount');
  const tabSelectedBtn = document.getElementById('tabSelectedBtn');

  if (grandTotalEl) grandTotalEl.textContent = `${formatNumber(grandTotal)} XC`;
  if (kindsEl) kindsEl.textContent = `${formatNumber(kinds)} รายการ`;
  if (piecesEl) piecesEl.textContent = `${formatNumber(totalPieces)} ชิ้น`;
  if (tabSelectedCountEl) tabSelectedCountEl.textContent = kinds;
  if (tabSelectedBtn) {
    tabSelectedBtn.classList.toggle('has-items', kinds > 0);
  }
}

function copySummaryToClipboard() {
  const ids = Object.keys(selectedQuantities).filter(id => (selectedQuantities[id] || 0) > 0);
  if (ids.length === 0) {
    showToast('ไม่มีรายการ', 'กรุณาระบุจำนวนสิ่งของก่อนคัดลอก', true);
    return;
  }

  let text = '📋 รายการสรุป \n';
  text += '------------------------------------------\n';
  let total = 0;
  let totalP = 0;

  ids.forEach(id => {
    const item = ITEM_CATALOG[id];
    const qty = selectedQuantities[id];
    const sub = qty * item.price;
    total += sub;
    totalP += qty;
    text += `• ${item.name} (${item.nameTh}) x${formatNumber(qty)} = ${formatNumber(sub)} XC\n`;
  });

  text += '------------------------------------------\n';
  text += `รวม ${ids.length} รายการ (${formatNumber(totalP)} ชิ้น)\n`;
  text += `มูลค่ารวมทั้งหมด: ${formatNumber(total)} XC\n`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('คัดลอกสำเร็จ', 'คัดลอกรายการสรุปราคาลงคลิปบอร์ดแล้ว', false);
    }).catch(() => {
      showToast('คัดลอกไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง', true);
    });
  }
}

// 9. ตัวจับเวลากิจกรรมวนซ้ำ
function loadRecurringStates() {
  try {
    const saved = localStorage.getItem('xinhelper_recurring');
    if (saved) {
      recurringStates = JSON.parse(saved);
    }
  } catch (e) {
    recurringStates = {};
  }
}

function saveRecurringStates() {
  localStorage.setItem('xinhelper_recurring', JSON.stringify(recurringStates));
}

function buildRecurringEvents() {
  const container = document.getElementById('recurringEvents');
  if (!container) return;

  container.innerHTML = '';
  const now = getNowThai();

  RECURRING_EVENTS.forEach(evt => {
    const card = document.createElement('div');
    card.className = 'recurring-card';
    card.id = `rec-card-${evt.id}`;

    const savedTime = recurringStates[evt.id]?.lastTime || '';

    card.innerHTML = `
      <div class="recurring-card-top">
        <div class="recurring-title-row">
          <div class="recurring-name">
            <span>${evt.emoji}</span>
            <span>${evt.name}</span>
          </div>
          <span class="interval-badge">ทุก ${evt.intervalMin} นาที</span>
        </div>
        <div class="recurring-sub">${evt.nameTh}</div>

        <div class="recurring-input-row">
          <input type="time" id="rec-time-${evt.id}" value="${savedTime}" title="เวลาที่เพิ่งเกิดล่าสุด">
          <button class="btn-now" type="button" data-id="${evt.id}" title="ตั้งเป็นเวลาปัจจุบัน">เวลาปัจจุบัน</button>
          <button class="btn-confirm" type="button" data-id="${evt.id}">ยืนยัน</button>
          <button class="btn-reset-small" type="button" data-id="${evt.id}" title="รีเซ็ต">✕</button>
        </div>
      </div>

      <div class="recurring-result ${savedTime ? 'show' : ''}" id="rec-result-${evt.id}">
        <div class="recurring-info-box">
          <div>
            <small style="color:var(--text-muted);font-size:0.75rem;">รอบถัดไป:</small>
            <div class="recurring-next-time" id="rec-next-${evt.id}">--:--</div>
          </div>
          <div style="text-align:right;">
            <small style="color:var(--text-muted);font-size:0.75rem;">นับถอยหลัง:</small>
            <div class="recurring-countdown" id="rec-cd-${evt.id}">--:--:--</div>
          </div>
        </div>
        <div class="recurring-upcoming" id="rec-upcoming-${evt.id}"></div>
      </div>
    `;

    container.appendChild(card);
  });

  container.addEventListener('click', (e) => {
    const confirmBtn = e.target.closest('.btn-confirm');
    const resetBtn = e.target.closest('.btn-reset-small');
    const nowBtn = e.target.closest('.btn-now');

    if (nowBtn) {
      const id = nowBtn.dataset.id;
      const thaiNow = getNowThai();
      const currentHHMM = `${String(thaiNow.getHours()).padStart(2, '0')}:${String(thaiNow.getMinutes()).padStart(2, '0')}`;
      const timeInput = document.getElementById(`rec-time-${id}`);
      timeInput.value = currentHHMM;
      confirmRecurring(id);
    } else if (confirmBtn) {
      confirmRecurring(confirmBtn.dataset.id);
    } else if (resetBtn) {
      resetRecurring(resetBtn.dataset.id);
    }
  });

  RECURRING_EVENTS.forEach(evt => {
    if (recurringStates[evt.id]?.lastTime) {
      calculateRecurringNext(evt);
    }
  });
}

function confirmRecurring(eventId) {
  const evt = RECURRING_EVENTS.find(e => e.id === eventId);
  if (!evt) return;

  const timeInput = document.getElementById(`rec-time-${eventId}`);
  const timeVal = timeInput.value;
  if (!timeVal) {
    showToast('กรุณาระบุเวลา', `ใส่เวลาเกิดล่าสุดของ ${evt.name}`, true);
    return;
  }

  recurringStates[eventId] = { lastTime: timeVal };
  saveRecurringStates();

  calculateRecurringNext(evt);
  document.getElementById(`rec-result-${eventId}`).classList.add('show');
  showToast('บันทึกเวลาแล้ว', `${evt.name} คำนวณรอบถัดไปเรียบร้อย`, false);
}

function calculateRecurringNext(evt) {
  const state = recurringStates[evt.id];
  if (!state?.lastTime) return;

  const now = getNowThai();
  const [bh, bm] = state.lastTime.split(':').map(Number);

  let lastDate = new Date(now);
  lastDate.setHours(bh, bm, 0, 0);

  let nextDate = new Date(lastDate.getTime() + evt.intervalMin * 60000);

  while (nextDate <= now) {
    nextDate = new Date(nextDate.getTime() + evt.intervalMin * 60000);
  }

  state.nextTimestamp = nextDate.getTime();

  const nextTimeStr = `${String(nextDate.getHours()).padStart(2, '0')}:${String(nextDate.getMinutes()).padStart(2, '0')}`;
  document.getElementById(`rec-next-${evt.id}`).textContent = `${nextTimeStr} น.`;

  const upcomingEl = document.getElementById(`rec-upcoming-${evt.id}`);
  let upcomingHTML = 'รอบถัดๆ ไป: ';
  let tempDate = new Date(nextDate);
  for (let i = 0; i < 3; i++) {
    tempDate = new Date(tempDate.getTime() + evt.intervalMin * 60000);
    const timeStr = `${String(tempDate.getHours()).padStart(2, '0')}:${String(tempDate.getMinutes()).padStart(2, '0')}`;
    upcomingHTML += `<span>${timeStr}</span>`;
  }
  upcomingEl.innerHTML = upcomingHTML;
}

function resetRecurring(eventId) {
  const timeInput = document.getElementById(`rec-time-${eventId}`);
  if (timeInput) timeInput.value = '';

  const resEl = document.getElementById(`rec-result-${eventId}`);
  if (resEl) resEl.classList.remove('show');

  delete recurringStates[eventId];
  saveRecurringStates();
  showToast('รีเซ็ตสำเร็จ', 'ล้างเวลาของกิจกรรมแล้ว', false);
}

function updateRecurringCountdowns() {
  const now = getNowThai();

  RECURRING_EVENTS.forEach(evt => {
    const state = recurringStates[evt.id];
    if (!state?.nextTimestamp) return;

    const diffSec = Math.floor((state.nextTimestamp - now.getTime()) / 1000);
    const cdEl = document.getElementById(`rec-cd-${evt.id}`);

    if (diffSec <= 0) {
      const notifyKey = `rec_${evt.id}_0`;
      if (!notifiedEvents.has(notifyKey)) {
        notifiedEvents.add(notifyKey);
        triggerEventNotification(`${evt.name} (${evt.nameTh})`, null);
      }
      calculateRecurringNext(evt);
      return;
    }

    if (advanceSeconds > 0 && diffSec <= advanceSeconds && diffSec > advanceSeconds - 2) {
      const notifyKey = `rec_${evt.id}_${advanceSeconds}_${Math.floor(state.nextTimestamp / 60000)}`;
      if (!notifiedEvents.has(notifyKey)) {
        notifiedEvents.add(notifyKey);
        triggerEventNotification(`${evt.name} (${evt.nameTh})`, `อีก ${secondsToHMS(diffSec)}`);
      }
    }

    if (cdEl) {
      cdEl.textContent = secondsToHMS(diffSec);
      if (diffSec <= 180) {
        cdEl.classList.add('warning');
      } else {
        cdEl.classList.remove('warning');
      }
    }
  });
}

// 10. ตารางเวลารายวัน & ไฮไลต์รอบถัดไป
function buildScheduledCards() {
  const container = document.getElementById('scheduledEventsGrid');
  if (!container) return;

  container.innerHTML = '';
  SCHEDULED_EVENT_METAS.forEach(meta => {
    const card = document.createElement('div');
    card.className = 'sched-card';
    card.id = `sched-card-${meta.id}`;
    card.dataset.eventName = meta.name;

    const timesDisplay = meta.times.join(', ');

    card.innerHTML = `
      <div class="sched-card-top">
        <div class="sched-card-header">
          <div class="sched-card-icon">${meta.emoji}</div>
          <div class="sched-card-title">${meta.name}</div>
        </div>

        <div class="sched-times-pill theme-${meta.theme}">
          <span class="sched-pill-text">รอบตามเวลา: ${timesDisplay} น.</span>
        </div>

        <div class="sched-info-box">
          คำนวณตามตารางเวลาประจำวันอัตโนมัติ
        </div>
      </div>

      <div class="sched-card-bottom">
        <div class="sched-meta-row">
          <span class="sched-meta-label">รอบถัดไป (Next):</span>
          <span class="sched-next-time" id="sched-next-${meta.id}">--:-- น.</span>
        </div>
        <div class="sched-meta-row">
          <span class="sched-meta-label">นับถอยหลัง:</span>
          <span class="sched-countdown-val" id="sched-cd-${meta.id}">--:--:--</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function updateScheduledCards() {
  const now = getNowThai();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const nowSec = now.getSeconds();
  const nowTotalSec = nowMin * 60 + nowSec;

  const filterSelect = document.getElementById('eventFilter');
  const filterVal = filterSelect ? filterSelect.value : 'all';

  SCHEDULED_EVENT_METAS.forEach(meta => {
    const card = document.getElementById(`sched-card-${meta.id}`);
    const nextEl = document.getElementById(`sched-next-${meta.id}`);
    const cdEl = document.getElementById(`sched-cd-${meta.id}`);

    if (card) {
      if (filterVal !== 'all') {
        const matches = meta.name === filterVal || meta.name.includes(filterVal);
        card.classList.toggle('hidden', !matches);
      } else {
        card.classList.remove('hidden');
      }
    }

    if (!nextEl || !cdEl) return;

    let nextTimeStr = null;
    let diffSec = null;

    // หาเวลาที่กำลังจะถึงในวันนี้
    for (let i = 0; i < meta.times.length; i++) {
      const t = meta.times[i];
      const [th, tm] = t.split(':').map(Number);
      // 00:00 ในตารางประจำวันคือ 24:00 (เที่ยงคืนท้ายวัน)
      const slotSec = (th === 0 && tm === 0) ? 86400 : (th * 3600 + tm * 60);

      if (slotSec > nowTotalSec) {
        nextTimeStr = t;
        diffSec = slotSec - nowTotalSec;
        break;
      }
    }

    // หากเลยทุกรอบของวันนี้แล้ว รอบถัดไปคือรอบแรกของวันพรุ่งนี้
    if (!nextTimeStr) {
      const firstT = meta.times[0];
      const [fh, fm] = firstT.split(':').map(Number);
      const firstSlotSec = (fh === 0 && fm === 0) ? 86400 : (fh * 3600 + fm * 60);
      nextTimeStr = firstT;
      diffSec = (86400 - nowTotalSec) + (fh === 0 && fm === 0 ? 0 : firstSlotSec);
    }

    nextEl.textContent = `${nextTimeStr} น.`;
    cdEl.textContent = secondsToHMS(diffSec);

    if (diffSec <= 300) {
      cdEl.classList.add('warning');
      if (card) card.classList.add('imminent');
    } else {
      cdEl.classList.remove('warning');
      if (card) card.classList.remove('imminent');
    }
  });
}

function buildScheduleTable() {
  const table = document.getElementById('scheduleTable');
  if (!table) return;

  table.innerHTML = '';
  FIXED_SCHEDULE.forEach((slot, idx) => {
    const row = document.createElement('div');
    row.className = 'schedule-row';
    row.id = `sched-row-${idx}`;
    row.dataset.time = slot.time;

    const eventsStr = slot.events.join(' / ');
    row.innerHTML = `
      <span class="schedule-time">${slot.time}</span>
      <span class="schedule-name">${eventsStr}</span>
      <span class="schedule-status-badge" id="sched-status-${idx}"></span>
    `;
    table.appendChild(row);
  });
}

function buildFilterOptions() {
  const select = document.getElementById('eventFilter');
  if (!select) return;

  const allNames = new Set();
  FIXED_SCHEDULE.forEach(slot => {
    slot.events.forEach(name => allNames.add(name));
  });

  const sorted = Array.from(allNames).sort();
  sorted.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => {
    updateScheduledCards();
    updateScheduleHighlight();
    updateFilteredNext();
  });
}

function findNextEventIndex(now) {
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const nowSec = now.getSeconds();
  const nowTotalSec = nowMin * 60 + nowSec;

  for (let i = 0; i < FIXED_SCHEDULE.length; i++) {
    const slot = FIXED_SCHEDULE[i];
    const slotMin = timeToMinutes(slot.time);
    const effectiveMin = slotMin === 0 ? 1440 : slotMin;
    const effectiveSec = effectiveMin * 60;

    if (effectiveSec > nowTotalSec) {
      return i;
    }
  }

  return 0;
}

function updateScheduleHighlight() {
  const now = getNowThai();
  const nextIdx = findNextEventIndex(now);
  const filterSelect = document.getElementById('eventFilter');
  const filterValue = filterSelect ? filterSelect.value : 'all';

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const nowSec = now.getSeconds();
  const nowTotalSec = nowMin * 60 + nowSec;

  FIXED_SCHEDULE.forEach((slot, idx) => {
    const row = document.getElementById(`sched-row-${idx}`);
    const statusBadge = document.getElementById(`sched-status-${idx}`);
    if (!row) return;

    row.classList.remove('past', 'next');

    if (filterValue !== 'all') {
      const matches = slot.events.some(e => e === filterValue);
      row.classList.toggle('hidden', !matches);
    } else {
      row.classList.remove('hidden');
    }

    const slotMin = timeToMinutes(slot.time);
    const effectiveMin = slotMin === 0 ? 1440 : slotMin;

    if (idx === nextIdx) {
      row.classList.add('next');
      if (statusBadge) statusBadge.textContent = '★ รอบถัดไป';
    } else if (effectiveMin * 60 < nowTotalSec && idx !== nextIdx) {
      if (slotMin !== 0) {
        row.classList.add('past');
        if (statusBadge) statusBadge.textContent = 'ผ่านไปแล้ว';
      }
    } else {
      if (statusBadge) statusBadge.textContent = '';
    }
  });

  const nextSlot = FIXED_SCHEDULE[nextIdx];
  const nextName = nextSlot.events.join(' / ');
  document.getElementById('nextEventName').textContent = nextName;
  document.getElementById('nextEventTime').textContent = `${nextSlot.time} น.`;

  const [nh, nm] = nextSlot.time.split(':').map(Number);
  const effectiveNH = (nh === 0 && nm === 0) ? 24 : nh;
  const diff = secondsUntil(effectiveNH, nm, now);
  document.getElementById('nextEventCountdown').textContent = secondsToHMS(diff);

  const headerSnippet = document.getElementById('headerNextText');
  if (headerSnippet) {
    headerSnippet.textContent = `${nextSlot.time} (${secondsToHMS(diff)})`;
  }

  if (diff <= 1) {
    const notifyKey = `fixed_${nextSlot.time}_now_${now.getDate()}`;
    if (!notifiedEvents.has(notifyKey)) {
      notifiedEvents.add(notifyKey);
      triggerEventNotification(nextName, null);
    }
  } else if (advanceSeconds > 0 && diff <= advanceSeconds && diff > advanceSeconds - 2) {
    const notifyKey = `fixed_${nextSlot.time}_adv_${now.getDate()}`;
    if (!notifiedEvents.has(notifyKey)) {
      notifiedEvents.add(notifyKey);
      triggerEventNotification(nextName, `อีก ${secondsToHMS(diff)}`);
    }
  }
}

function updateFilteredNext() {
  const filterSelect = document.getElementById('eventFilter');
  const el = document.getElementById('filteredNext');
  if (!filterSelect || !el) return;

  const filterValue = filterSelect.value;
  if (filterValue === 'all') {
    el.textContent = '';
    return;
  }

  const now = getNowThai();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const nowSec = now.getSeconds();
  const nowTotalSec = nowMin * 60 + nowSec;

  let nextTime = null;
  for (let i = 0; i < FIXED_SCHEDULE.length; i++) {
    const slot = FIXED_SCHEDULE[i];
    if (!slot.events.includes(filterValue)) continue;

    const slotMin = timeToMinutes(slot.time);
    const effectiveMin = slotMin === 0 ? 1440 : slotMin;
    const effectiveSec = effectiveMin * 60;

    if (effectiveSec > nowTotalSec) {
      nextTime = slot.time;
      break;
    }
  }

  if (!nextTime) {
    const firstMatch = FIXED_SCHEDULE.find(slot => slot.events.includes(filterValue));
    if (firstMatch) {
      nextTime = `${firstMatch.time} น. (รอบพรุ่งนี้)`;
    }
  } else {
    nextTime = `${nextTime} น.`;
  }

  el.textContent = nextTime ? `${filterValue} รอบถัดไป: ${nextTime}` : '';
}

// 11. ตั้งค่าการแจ้งเตือน & เสียง
function setupNotificationControls() {
  const savedSound = localStorage.getItem('xinhelper_sound_enabled');
  if (savedSound !== null) {
    soundEnabled = savedSound === 'true';
  }

  const savedAdvance = localStorage.getItem('xinhelper_notif_advance');
  if (savedAdvance !== null) {
    advanceSeconds = parseInt(savedAdvance) || 60;
  }

  const toggleBtn = document.getElementById('btnNotifToggle');
  const toggleText = document.getElementById('notifToggleText');
  const notifBadge = document.getElementById('notifBadge');
  const advanceSelect = document.getElementById('notifAdvance');
  const testBtn = document.getElementById('btnNotifTest');
  const permBtn = document.getElementById('btnNotifPermission');

  if (advanceSelect) advanceSelect.value = advanceSeconds;

  function updateSoundUI() {
    if (toggleBtn) {
      toggleBtn.classList.toggle('active', soundEnabled);
      if (toggleText) toggleText.textContent = soundEnabled ? 'เสียง: เปิด' : 'เสียง: ปิด';
    }
    if (notifBadge) {
      notifBadge.textContent = soundEnabled ? 'เปิดเสียง' : 'ปิดเสียง';
      notifBadge.style.background = soundEnabled ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)';
      notifBadge.style.color = soundEnabled ? '#a7f3d0' : '#fca5a5';
    }
  }
  updateSoundUI();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('xinhelper_sound_enabled', soundEnabled);
      updateSoundUI();
      if (soundEnabled) {
        playAlertChime();
        showToast('เปิดเสียงแล้ว', 'ระบบจะส่งเสียงระฆังแจ้งเตือนเมื่อถึงเวลากิจกรรม', false);
      } else {
        showToast('ปิดเสียงแล้ว', 'การแจ้งเตือนจะแสดงเฉพาะข้อความ', false);
      }
    });
  }

  if (advanceSelect) {
    advanceSelect.addEventListener('change', (e) => {
      advanceSeconds = parseInt(e.target.value) || 0;
      localStorage.setItem('xinhelper_notif_advance', advanceSeconds);
      const text = advanceSelect.options[advanceSelect.selectedIndex].text;
      showToast('ตั้งเวลาเตือนแล้ว', `เตือนล่วงหน้า: ${text}`, false);
    });
  }

  if (testBtn) {
    testBtn.addEventListener('click', () => {
      playAlertChime();
      showToast('ทดสอบแจ้งเตือนสำเร็จ 🎵', 'ระบบเสียงพร้อมทำงานเมื่อถึงเวลากิจกรรม', true);
      sendBrowserNotification('ทดสอบระบบแจ้งเตือน xinhelper', 'ระบบแจ้งเตือนทำงานได้ตามปกติ');
    });
  }

  if (permBtn) {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        permBtn.textContent = '✅ อนุญาตแจ้งเตือนแล้ว';
        permBtn.classList.add('active');
      } else if (Notification.permission === 'denied') {
        permBtn.textContent = '❌ แจ้งเตือนถูกบล็อก';
      }
    }

    permBtn.addEventListener('click', () => {
      if (!('Notification' in window)) {
        showToast('ไม่รองรับ', 'เบราว์เซอร์นี้ไม่รองรับ Web Notification', true);
        return;
      }

      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          permBtn.textContent = '✅ อนุญาตแจ้งเตือนแล้ว';
          permBtn.classList.add('active');
          showToast('อนุญาตสำเร็จ', 'เมื่อถึงเวลากิจกรรมจะมีการแจ้งเตือนบนหน้าจอ', false);
          sendBrowserNotification('xinhelper Alert System', 'ยินดีต้อนรับ! ระบบพร้อมแจ้งเตือนกิจกรรมแล้ว');
        } else {
          showToast('ไม่ได้รับอนุญาต', 'คุณยังสามารถรับการแจ้งเตือนด้วยเสียงได้ตามปกติ', true);
        }
      });
    });
  }
}

// 12. สลับแท็บหน้าเว็บ
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  const tabContentMap = { calc: 'contentCalc', event: 'contentEvent', ai: 'contentAI' };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetEl = document.getElementById(tabContentMap[target]);
      if (targetEl) targetEl.classList.add('active');
    });
  });
}

// 15. ระบบ AI วิเคราะห์คลังสินค้า (AI Scanner)
let aiAttachedImages = []; // [{ base64, mimeType, name }]
let aiIsLoading = false;
let lastAIDetectedItems = null; // [{ id, qty }]

const DEFAULT_AI_API_KEY = 'AQ.Ab8RN6J5pBJCtKXjEN445eQl3ltfjhlH2TRZdRe5KsJEZIcECg';

function getAIApiKey() {
  return localStorage.getItem('xinhelper_ai_api_key') || DEFAULT_AI_API_KEY;
}

function saveAIApiKey(key) {
  localStorage.setItem('xinhelper_ai_api_key', key);
}

function buildSystemPrompt() {
  // Build item catalog for the AI
  let catalogText = '';
  Object.values(ITEM_CATALOG).forEach(item => {
    catalogText += `- ${item.id}: ${item.name} (${item.nameTh}) = ${formatNumber(item.price)} XC ต่อหน่วย\n`;
  });

  return `คุณคือผู้ช่วยคำนวณมูลค่าสินค้าขององค์กร (สกุลเงิน XC) ชื่อ "xinhelper AI"

กฎสำคัญในการอ่านและคำนวณ:
1. ถ้าผู้ใช้ส่งภาพคลังสินค้า ให้สังเกตชื่อไอเทมและจำนวนชิ้น
   - ตัวเลขแบบ "9|50" หรือ "9/50" หมายถึง มี 9 ชิ้น (จากความจุช่องเก็บ)
   - ตัวเลข "x60" หรือ "×60" หมายถึง จำนวน 60 ชิ้น/กล่อง
2. กฎพิเศษ Diamond Box:
   - "Diamond Box" 1 กล่อง บรรจุ 100 ชิ้น × 150 XC = 15,000 XC ต่อกล่อง (ใช้ id: "diamondBox")
   - ถ้าเป็นเพชรแยกชิ้น (Diamond) ราคา 150 XC ต่อชิ้น (ใช้ id: "diamond")
3. ให้คำนวณตามเรทราคากลาง (Standard Price) ด้านล่างเท่านั้น
4. ตอบเป็นภาษาไทยเสมอ
5. แสดงผลลัพธ์เป็นรายการ พร้อมสรุปยอดรวมท้ายสุด

เรทราคากลาง (Standard Price / ITEM_CATALOG):
${catalogText}

รูปแบบการตอบ:
จากภาพ/ข้อมูลคลังสินค้า เมื่อนำมาคำนวณมูลค่าตามเรทราคากลางองค์กร (Standard Price) จะได้รายการและยอดรวมดังนี้ครับ:

1. [ชื่อไอเทม] (จำนวน xx ชิ้น/กล่อง)
   - ราคา: xx XC ต่อหน่วย
   - รวม: จำนวน × ราคา = xx XC

(แสดงครบทุกรายการที่พบ)

💡 **รวมมูลค่าสินค้าในคลังทั้งหมด: xxx XC**

หลังจากตอบสรุปราคาแล้ว ให้ส่ง JSON อยู่ในบล็อก \`\`\`json ... \`\`\` เสมอ ในรูปแบบนี้:
\`\`\`json
[{"id": "itemId จาก ITEM_CATALOG", "qty": จำนวนชิ้นหรือกล่อง}, ...]
\`\`\`
ให้ใช้ id ตรงกับ key ใน ITEM_CATALOG เท่านั้น (เช่น "diamondBox", "diamond", "jadeShard", "normalScrew", "yellowScrew")
ถ้าไม่พบไอเทมที่ตรงกันเลย ให้ส่ง \`\`\`json\n[]\n\`\`\``;
}

let cachedGeminiModel = localStorage.getItem('xinhelper_ai_model') || '';

// Priority list of models (prioritizing stable production models that don't hit 503 high demand)
const GEMINI_STABLE_PRIORITIES = [
  'gemini-flash-lite-latest',
  'gemini-3.5-flash-lite',
  'gemini-3-flash-preview',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-flash-latest',
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-2.0-flash-lite',
  'gemini-2.5-flash',
  'gemini-1.5-pro',
  'gemini-2.5-pro'
];

function getSelectedAIModel() {
  return localStorage.getItem('xinhelper_ai_selected_model') || 'auto';
}

function setSelectedAIModel(model) {
  localStorage.setItem('xinhelper_ai_selected_model', model);
}

function updateModelBadgeDisplay(activeModel) {
  const badge = document.getElementById('aiModelBadge');
  const select = document.getElementById('aiModelSelect');
  if (!badge) return;
  const selVal = select ? select.value : getSelectedAIModel();
  if (selVal === 'auto') {
    const displayModel = activeModel || cachedGeminiModel || 'gemini-flash-lite-latest';
    badge.textContent = `Auto (${displayModel})`;
  } else {
    badge.textContent = `กำหนดเอง (${selVal})`;
  }
}

function populateModelDropdown(modelsList, selectedValue) {
  const select = document.getElementById('aiModelSelect');
  if (!select) return;

  const currentVal = selectedValue || select.value || getSelectedAIModel();

  const friendlyNames = {
    'gemini-flash-lite-latest': 'Gemini Flash Lite (แนะนำ: เสถียรสูงสุด ไม่ติด High Demand)',
    'gemini-3.5-flash-lite': 'Gemini 3.5 Flash Lite (เสถียร & รวดเร็ว)',
    'gemini-3-flash-preview': 'Gemini 3 Flash Preview',
    'gemini-3.8-flash': 'Gemini 3.8 Flash (รุ่นใหม่ อาจมี High Demand)',
    'gemini-3.5-flash': 'Gemini 3.5 Flash (รุ่นใหม่ อาจมี High Demand)',
    'gemini-2.0-flash': 'Gemini 2.0 Flash (เสถียร & รวดเร็ว)',
    'gemini-1.5-flash': 'Gemini 1.5 Flash (เสถียรสูง โควตาเยอะ)',
    'gemini-2.0-flash-lite': 'Gemini 2.0 Flash Lite (เร็ว เบา)',
    'gemini-2.5-flash': 'Gemini 2.5 Flash',
    'gemini-1.5-pro': 'Gemini 1.5 Pro (ฉลาดลึกซึ้ง)',
    'gemini-2.5-pro': 'Gemini 2.5 Pro (รุ่นทดสอบ)'
  };

  let html = `<option value="auto">⚡ อัตโนมัติ (แนะนำ: เลือกรุ่นที่เสถียรที่สุดและสลับให้อัตโนมัติ)</option>`;

  const standardList = [
    'gemini-flash-lite-latest',
    'gemini-3.5-flash-lite',
    'gemini-3-flash-preview',
    'gemini-3.8-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ];

  const listToRender = (modelsList && modelsList.length > 0)
    ? Array.from(new Set([...standardList, ...modelsList]))
    : standardList;

  listToRender.forEach(m => {
    const label = friendlyNames[m] || m;
    const isSelected = m === currentVal ? ' selected' : '';
    html += `<option value="${escapeHTML(m)}"${isSelected}>${escapeHTML(label)}</option>`;
  });

  select.innerHTML = html;
  if (currentVal && select.querySelector(`option[value="${currentVal}"]`)) {
    select.value = currentVal;
  } else {
    select.value = 'auto';
  }
}

async function detectAvailableGeminiModel(apiKey) {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.models || !Array.isArray(data.models)) return null;

    // Filter models supporting generateContent
    const eligible = data.models
      .filter(m => {
        const methods = m.supportedGenerationMethods || [];
        const name = (m.name || '').replace('models/', '');
        return methods.includes('generateContent') &&
               !name.includes('tts') &&
               !name.includes('embedding') &&
               !name.includes('imagen') &&
               !name.includes('realtime');
      })
      .map(m => m.name.replace('models/', ''));

    if (eligible.length === 0) return null;

    // Check priorities
    for (const p of GEMINI_STABLE_PRIORITIES) {
      if (eligible.includes(p)) return p;
    }

    // Try any model with "flash" (excluding experimental 8b if any)
    const anyFlash = eligible.find(m => m.includes('flash') && !m.includes('8b'));
    if (anyFlash) return anyFlash;

    // Fallback: first eligible model
    return eligible[0];
  } catch (e) {
    return null;
  }
}

async function callGeminiAPI(textPrompt, imageDataArray) {
  const apiKey = getAIApiKey();
  if (!apiKey) {
    throw new Error('กรุณาตั้งค่า Gemini API Key ก่อนใช้งาน (ดูวิธีตั้งค่าด้านบน)');
  }

  const parts = [];

  // Add images first
  if (imageDataArray && imageDataArray.length > 0) {
    imageDataArray.forEach(img => {
      parts.push({
        inlineData: {
          mimeType: img.mimeType,
          data: img.base64
        }
      });
    });
  }

  // Add text prompt
  if (textPrompt) {
    parts.push({ text: textPrompt });
  } else if (imageDataArray && imageDataArray.length > 0) {
    parts.push({ text: 'จากภาพนี้ ช่วยวิเคราะห์ชื่อไอเทมและจำนวน แล้วคำนวณมูลค่าสินค้าทั้งหมดตามเรทราคากลางที่ให้ไว้' });
  }

  const payload = {
    contents: [
      {
        parts: parts
      }
    ],
    systemInstruction: {
      parts: [{ text: buildSystemPrompt() }]
    },
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 4096,
    }
  };

  const selectedModel = getSelectedAIModel();

  // If no cached model or cached model was congested on auto, auto-detect or reset to stable
  if (!cachedGeminiModel || (selectedModel === 'auto' && (cachedGeminiModel === 'gemini-2.5-flash' || cachedGeminiModel === 'gemini-3.8-flash' || cachedGeminiModel === 'gemini-2.0-flash'))) {
    const detected = await detectAvailableGeminiModel(apiKey);
    if (detected) {
      cachedGeminiModel = detected;
      localStorage.setItem('xinhelper_ai_model', detected);
    } else {
      cachedGeminiModel = 'gemini-flash-lite-latest';
    }
  }

  // Build candidates list
  let candidates = [];
  if (selectedModel && selectedModel !== 'auto') {
    // User picked specific model: prioritize it first, followed by stable fallbacks
    candidates = [selectedModel, ...GEMINI_STABLE_PRIORITIES];
  } else {
    // Auto mode: start with stable models
    const start = cachedGeminiModel || 'gemini-flash-lite-latest';
    candidates = [start, ...GEMINI_STABLE_PRIORITIES];
  }
  candidates = candidates.filter((m, i, arr) => m && arr.indexOf(m) === i);

  let lastError = null;
  let switchedFrom = null;

  for (const model of candidates) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        // Cache successful model
        cachedGeminiModel = model;
        localStorage.setItem('xinhelper_ai_model', model);
        updateModelBadgeDisplay(model);

        if (switchedFrom) {
          showToast('สลับโมเดลอัตโนมัติ', `สลับมาใช้ ${model} สำเร็จ (เนื่องจาก ${switchedFrom} ติด High Demand)`, false);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          throw new Error('AI ไม่สามารถวิเคราะห์ข้อมูลได้ กรุณาลองใหม่');
        }
        return text;
      }

      const errData = await response.json().catch(() => ({}));
      const errMsg = errData?.error?.message || `HTTP ${response.status}`;
      const lowerMsg = errMsg.toLowerCase();

      // Check for non-recoverable key errors
      if (response.status === 400 && (lowerMsg.includes('api key') || lowerMsg.includes('key not valid'))) {
        throw new Error(`API Key ไม่ถูกต้อง: ${errMsg}`);
      }

      // Check for temporary capacity, high demand, overload, rate-limit or missing model
      const isCapacityOrModelIssue =
        response.status === 404 ||
        response.status === 429 ||
        response.status === 503 ||
        response.status === 500 ||
        response.status === 502 ||
        response.status === 504 ||
        lowerMsg.includes('high demand') ||
        lowerMsg.includes('overloaded') ||
        lowerMsg.includes('spikes in demand') ||
        lowerMsg.includes('resource has been exhausted') ||
        lowerMsg.includes('temporarily') ||
        lowerMsg.includes('quota') ||
        lowerMsg.includes('rate limit') ||
        lowerMsg.includes('not found') ||
        lowerMsg.includes('not supported') ||
        lowerMsg.includes('try again later');

      if (isCapacityOrModelIssue) {
        console.warn(`[Gemini API] โมเดล ${model} ติดขัด (${errMsg}) กำลังสลับไปลองโมเดลถัดไป...`);
        if (!switchedFrom) switchedFrom = model;
        lastError = new Error(errMsg);
        continue;
      }

      // If other error, throw
      throw new Error(`Gemini API Error: ${errMsg}`);

    } catch (err) {
      if (err.message && (err.message.startsWith('API Key ไม่ถูกต้อง') || err.message.startsWith('Gemini API Error:'))) {
        throw err;
      }
      lastError = err;
    }
  }

  // Fallback: re-detect and try directly if fresh detection found something new
  const autoDetect = await detectAvailableGeminiModel(apiKey);
  if (autoDetect && !candidates.includes(autoDetect)) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${autoDetect}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );
      if (response.ok) {
        cachedGeminiModel = autoDetect;
        localStorage.setItem('xinhelper_ai_model', autoDetect);
        updateModelBadgeDisplay(autoDetect);
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (e) {
      // ignore
    }
  }

  if (lastError && (lastError.message.includes('high demand') || lastError.message.includes('overloaded') || lastError.message.includes('exhausted'))) {
    throw new Error(`เซิร์ฟเวอร์โมเดลมีผู้ใช้งานหนาแน่นชั่วคราว (High Demand) กรุณากดปุ่ม "ตั้งค่า Gemini API Key" ด้านบน แล้วเลือกโมเดลเป็น "Gemini 2.0 Flash" หรือ "Gemini 1.5 Flash" เพื่อใช้งานทันทีครับ`);
  }

  throw lastError || new Error('ไม่พบโมเดล Gemini ที่พร้อมใช้งานใน API Key ของคุณ');
}

function parseAIDetectedItems(responseText) {
  // Extract JSON block from response
  const jsonMatch = responseText.match(/```json\s*([\s\S]*?)```/);
  if (!jsonMatch) return null;

  try {
    const items = JSON.parse(jsonMatch[1].trim());
    if (!Array.isArray(items)) return null;

    // Validate items against ITEM_CATALOG
    const validItems = items.filter(item =>
      item && item.id && ITEM_CATALOG[item.id] && typeof item.qty === 'number' && item.qty > 0
    );

    return validItems.length > 0 ? validItems : null;
  } catch (e) {
    return null;
  }
}

function formatAIResponse(text) {
  // Remove JSON block from display
  let display = text.replace(/```json[\s\S]*?```/g, '').trim();

  // Escape HTML first for safety
  display = escapeHTML(display);

  // Bold formatting
  display = display.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Bullet items
  display = display.replace(/^[\*\-]\s+(.*)$/gm, '• $1');

  // Line breaks
  display = display.replace(/\n/g, '<br>');

  return display;
}

function addChatMessage(role, content, images) {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;

  // Remove welcome message if exists
  const welcome = container.querySelector('.ai-welcome-msg');
  if (welcome) welcome.remove();

  const bubble = document.createElement('div');
  bubble.className = `ai-msg ai-msg-${role}`;

  let inner = '';

  if (role === 'user') {
    // Show attached images
    if (images && images.length > 0) {
      inner += '<div class="ai-msg-images">';
      images.forEach(img => {
        inner += `<img src="data:${img.mimeType};base64,${img.base64}" alt="attached" class="ai-msg-thumb">`;
      });
      inner += '</div>';
    }
    if (content) {
      inner += `<div class="ai-msg-text">${escapeHTML(content)}</div>`;
    }
  } else {
    // AI response
    inner += `<div class="ai-msg-avatar">✨</div>`;
    inner += `<div class="ai-msg-body">`;
    inner += `<div class="ai-msg-text">${content}</div>`;

    // Add action buttons if items were detected
    if (lastAIDetectedItems && lastAIDetectedItems.length > 0) {
      inner += `<div class="ai-msg-actions">`;
      inner += `<button class="ai-action-btn ai-btn-autofill" onclick="autoFillFromAI()">`;
      inner += `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path></svg>`;
      inner += ` นำเข้าตารางคำนวณ (${lastAIDetectedItems.length} รายการ)`;
      inner += `</button>`;
      inner += `<button class="ai-action-btn ai-btn-copy-result" onclick="copyAIResult(this)">`;
      inner += `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      inner += ` คัดลอกสรุป`;
      inner += `</button>`;
      inner += `</div>`;
    }

    inner += `</div>`;
  }

  bubble.innerHTML = inner;
  container.appendChild(bubble);

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function addLoadingMessage() {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;

  const loading = document.createElement('div');
  loading.className = 'ai-msg ai-msg-ai ai-msg-loading';
  loading.id = 'aiLoadingMsg';
  loading.innerHTML = `
    <div class="ai-msg-avatar">✨</div>
    <div class="ai-msg-body">
      <div class="ai-loading-dots">
        <span></span><span></span><span></span>
      </div>
      <div class="ai-loading-text">กำลังวิเคราะห์...</div>
    </div>
  `;
  container.appendChild(loading);
  container.scrollTop = container.scrollHeight;
}

function removeLoadingMessage() {
  const el = document.getElementById('aiLoadingMsg');
  if (el) el.remove();
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function autoFillFromAI() {
  if (!lastAIDetectedItems || lastAIDetectedItems.length === 0) {
    showToast('ไม่มีรายการ', 'ไม่พบรายการที่ AI วิเคราะห์ได้', true);
    return;
  }

  lastAIDetectedItems.forEach(item => {
    if (ITEM_CATALOG[item.id]) {
      selectedQuantities[item.id] = (selectedQuantities[item.id] || 0) + item.qty;
    }
  });

  saveSelectedQuantities();
  renderItemList();

  // Switch to calc tab
  const calcTab = document.getElementById('tabCalc');
  if (calcTab) calcTab.click();

  showToast('นำเข้าสำเร็จ ✅', `เพิ่ม ${lastAIDetectedItems.length} รายการลงในตารางคำนวณเรียบร้อย`, false);
}

function copyAIResult(btn) {
  if (!lastAIDetectedItems || lastAIDetectedItems.length === 0) return;

  let text = '📋 AI วิเคราะห์คลังสินค้า\n';
  text += '------------------------------------------\n';
  let total = 0;

  lastAIDetectedItems.forEach(item => {
    const catalog = ITEM_CATALOG[item.id];
    if (!catalog) return;
    const sub = item.qty * catalog.price;
    total += sub;
    text += `• ${catalog.name} (${catalog.nameTh}) x${formatNumber(item.qty)} = ${formatNumber(sub)} XC\n`;
  });

  text += '------------------------------------------\n';
  text += `มูลค่ารวมทั้งหมด: ${formatNumber(total)} XC\n`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('คัดลอกสำเร็จ', 'คัดลอกผลลัพธ์ AI ลงคลิปบอร์ดแล้ว', false);
    });
  }
}

function updateAttachedImagesPreview() {
  const container = document.getElementById('aiAttachedImages');
  if (!container) return;

  if (aiAttachedImages.length === 0) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  container.style.display = 'flex';
  container.innerHTML = '';

  aiAttachedImages.forEach((img, idx) => {
    const wrap = document.createElement('div');
    wrap.className = 'ai-preview-item';
    wrap.innerHTML = `
      <img src="data:${img.mimeType};base64,${img.base64}" alt="${img.name}" class="ai-preview-thumb">
      <button class="ai-preview-remove" data-idx="${idx}" title="ลบรูปนี้">✕</button>
    `;
    container.appendChild(wrap);
  });

  // Remove button handler
  container.querySelectorAll('.ai-preview-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      aiAttachedImages.splice(idx, 1);
      updateAttachedImagesPreview();
    });
  });
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve({
        base64: base64,
        mimeType: file.type || 'image/png',
        name: file.name || 'image'
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function handleAISend() {
  if (aiIsLoading) return;

  const textInput = document.getElementById('aiTextInput');
  const text = textInput ? textInput.value.trim() : '';
  const images = [...aiAttachedImages];

  if (!text && images.length === 0) {
    showToast('กรุณาระบุข้อมูล', 'พิมพ์ข้อความหรือแนบรูปภาพก่อนส่ง', true);
    return;
  }

  if (!getAIApiKey()) {
    showToast('ต้องการ API Key', 'กรุณาใส่ Gemini API Key หรือคลิกลองตัวอย่างด้านบน', true);
    const settingsBody = document.getElementById('aiSettingsBody');
    if (settingsBody) settingsBody.style.display = 'block';
    const keyInput = document.getElementById('aiApiKeyInput');
    if (keyInput) keyInput.focus();
    return;
  }

  // Add user message
  addChatMessage('user', text, images);

  // Clear inputs
  if (textInput) {
    textInput.value = '';
    textInput.style.height = 'auto';
  }
  aiAttachedImages = [];
  updateAttachedImagesPreview();

  // Show loading
  aiIsLoading = true;
  addLoadingMessage();

  try {
    const response = await callGeminiAPI(text || null, images.length > 0 ? images : null);

    removeLoadingMessage();

    // Parse detected items
    lastAIDetectedItems = parseAIDetectedItems(response);

    // Format and display
    const formattedResponse = formatAIResponse(response);
    addChatMessage('ai', formattedResponse);

  } catch (err) {
    removeLoadingMessage();
    let errHtml = `<span style="color:var(--red);">❌ เกิดข้อผิดพลาด: ${escapeHTML(err.message)}</span>`;
    if (err.message && (err.message.includes('high demand') || err.message.includes('overloaded') || err.message.includes('หนาแน่น') || err.message.includes('High Demand'))) {
      errHtml += `<br><span style="color:var(--text-muted); font-size:0.84rem; display:block; margin-top:8px; line-height:1.5;">💡 <strong>วิธีแก้ไข:</strong> โมเดล AI กำลังมีผู้ใช้งานหนาแน่นชั่วคราว คุณสามารถคลิก <strong>ตั้งค่า Gemini API Key</strong> ด้านบน แล้วสลับโมเดลเป็น <strong>Gemini 2.0 Flash</strong> หรือ <strong>Gemini 1.5 Flash</strong> ซึ่งมีความเสถียรสูงและเปิดให้ใช้งานตลอดเวลา หรือกดปุ่ม <strong>"คลิกเพื่อลองตัวอย่าง"</strong> เพื่อทดลองใช้งานได้ทันทีครับ</span>`;
    }
    addChatMessage('ai', errHtml);
  } finally {
    aiIsLoading = false;
  }
}

function runDemoAnalysis() {
  if (aiIsLoading) return;

  const demoItems = [
    { id: 'diamondBox', qty: 60 },
    { id: 'jadeShard', qty: 3 },
    { id: 'normalScrew', qty: 9 }
  ];

  const demoUserText = 'Diamond Box 60 กล่อง, Jade Shard 3 ชิ้น, Normal Screw 9 ชิ้น';
  addChatMessage('user', demoUserText, null);

  aiIsLoading = true;
  addLoadingMessage();

  setTimeout(() => {
    removeLoadingMessage();
    aiIsLoading = false;

    lastAIDetectedItems = demoItems;

    let total = 0;
    let listText = '';
    demoItems.forEach((it, idx) => {
      const cat = ITEM_CATALOG[it.id];
      const sub = it.qty * cat.price;
      total += sub;
      listText += `<strong>${idx + 1}. ${cat.name} (${cat.nameTh})</strong> (จำนวน ${formatNumber(it.qty)} ${it.id === 'diamondBox' ? 'กล่อง' : 'ชิ้น'})<br>` +
                  `&nbsp;&nbsp;&nbsp;• ราคา: ${formatNumber(cat.price)} XC ต่อหน่วย<br>` +
                  `&nbsp;&nbsp;&nbsp;• รวม: ${formatNumber(it.qty)} × ${formatNumber(cat.price)} = <strong>${formatNumber(sub)} XC</strong><br><br>`;
    });

    const aiText = `จากรายการคลังสินค้าตัวอย่าง เมื่อนำมาคำนวณมูลค่าตาม <strong>เรทราคากลางองค์กร (Standard Price)</strong> จะได้รายการและยอดรวมดังนี้ครับ:<br><br>` +
                   listText +
                   `💡 <strong>รวมมูลค่าสินค้าในคลังทั้งหมด: ${formatNumber(total)} XC</strong><br><br>` +
                   `<span style="color:var(--blue-cyan); font-size:0.8rem;">✨ <strong>ระบบพร้อมใช้งาน:</strong> คุณสามารถกดปุ่ม <strong>"นำเข้าตารางคำนวณ"</strong> ด้านล่างเพื่อส่งค่าไปยังหน้าคำนวณราคาได้ทันที หรือใส่ API Key เพื่อใช้งานจริงแบบเรียลไทม์!</span>`;

    addChatMessage('ai', aiText);
  }, 600);
}

function setupAIScanner() {
  // API Key settings
  const savedKey = getAIApiKey();
  const keyInput = document.getElementById('aiApiKeyInput');
  const keyStatus = document.getElementById('aiKeyStatus');
  const saveKeyBtn = document.getElementById('btnSaveApiKey');
  const toggleSettingsBtn = document.getElementById('btnToggleApiSettings');
  const settingsBody = document.getElementById('aiSettingsBody');
  const trySampleBtn = document.getElementById('btnTrySample');
  const modelSelect = document.getElementById('aiModelSelect');
  const checkModelsBtn = document.getElementById('btnCheckModels');

  // Initialize model selector value and badge
  if (modelSelect) {
    const savedSelected = getSelectedAIModel();
    if (savedSelected) {
      modelSelect.value = savedSelected;
    }
    updateModelBadgeDisplay(cachedGeminiModel);

    modelSelect.addEventListener('change', () => {
      const val = modelSelect.value;
      setSelectedAIModel(val);
      updateModelBadgeDisplay(cachedGeminiModel);
      if (val === 'auto') {
        showToast('โหมดอัตโนมัติ', 'ระบบจะเลือกโมเดลที่เสถียรที่สุด และสลับโมเดลให้อัตโนมัติเมื่อเกิด High Demand', false);
      } else {
        showToast('เลือกโมเดล', `ตั้งค่าใช้งานโมเดล ${val} เรียบร้อย`, false);
      }
    });
  }

  // Model check button handler
  if (checkModelsBtn) {
    checkModelsBtn.addEventListener('click', async () => {
      const key = getAIApiKey() || (keyInput ? keyInput.value.trim() : '');
      if (!key) {
        showToast('ต้องการ API Key', 'กรุณาวางและบันทึก Gemini API Key ก่อน', true);
        if (keyInput) keyInput.focus();
        return;
      }

      const origText = checkModelsBtn.innerHTML;
      checkModelsBtn.disabled = true;
      checkModelsBtn.innerHTML = '⏳ กำลังตรวจ...';

      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `HTTP ${res.status}`);
        }
        const data = await res.json();
        const eligible = (data.models || [])
          .filter(m => {
            const methods = m.supportedGenerationMethods || [];
            const name = (m.name || '').replace('models/', '');
            return methods.includes('generateContent') &&
                   !name.includes('tts') &&
                   !name.includes('embedding') &&
                   !name.includes('imagen') &&
                   !name.includes('realtime');
          })
          .map(m => m.name.replace('models/', ''));

        if (eligible.length > 0) {
          populateModelDropdown(eligible);
          const best = eligible.find(m => m === 'gemini-2.0-flash') ||
                       eligible.find(m => m === 'gemini-1.5-flash') ||
                       eligible[0];
          if (!cachedGeminiModel || cachedGeminiModel === 'gemini-2.5-flash') {
            cachedGeminiModel = best;
            localStorage.setItem('xinhelper_ai_model', best);
          }
          updateModelBadgeDisplay(cachedGeminiModel);
          if (keyStatus) {
            keyStatus.innerHTML = `<span style="color:var(--green);">✅ ตรวจสอบสำเร็จ พบ ${eligible.length} โมเดล (กำลังใช้: <strong>${modelSelect ? modelSelect.value : cachedGeminiModel}</strong>)</span>`;
          }
          showToast('ตรวจสอบสำเร็จ', `พบ ${eligible.length} โมเดลที่รองรับ พร้อมสลับใช้งานอัตโนมัติ`, false);
        } else {
          showToast('ไม่พบโมเดล', 'API Key นี้ไม่พบโมเดล generateContent ที่เปิดใช้งาน', true);
        }
      } catch (err) {
        showToast('เกิดข้อผิดพลาด', `ไม่สามารถดึงรายชื่อโมเดลได้: ${err.message}`, true);
      } finally {
        checkModelsBtn.disabled = false;
        checkModelsBtn.innerHTML = origText;
      }
    });
  }

  if (savedKey && keyInput) {
    keyInput.value = savedKey;
    if (keyStatus) {
      keyStatus.innerHTML = `<span style="color:var(--green);">✅ API Key ถูกบันทึกแล้ว ${cachedGeminiModel ? `(โมเดล: <strong>${cachedGeminiModel}</strong>)` : ''}</span>`;
    }
    // Collapse settings if key exists
    if (settingsBody) settingsBody.style.display = 'none';
  }

  if (saveKeyBtn && keyInput) {
    saveKeyBtn.addEventListener('click', async () => {
      const key = keyInput.value.trim();
      if (!key) {
        if (keyStatus) keyStatus.innerHTML = '<span style="color:var(--red);">กรุณาวาง API Key</span>';
        return;
      }
      saveAIApiKey(key);
      if (keyStatus) keyStatus.innerHTML = '<span style="color:var(--blue-cyan);">⏳ กำลังเชื่อมต่อและค้นหาโมเดล...</span>';

      const detected = await detectAvailableGeminiModel(key);
      if (detected) {
        cachedGeminiModel = detected;
        localStorage.setItem('xinhelper_ai_model', detected);
        updateModelBadgeDisplay(detected);
        if (keyStatus) {
          keyStatus.innerHTML = `<span style="color:var(--green);">✅ เชื่อมต่อสำเร็จ! โมเดลที่พร้อมใช้: <strong>${detected}</strong></span>`;
        }
        showToast('เชื่อมต่อสำเร็จ', `พร้อมวิเคราะห์ด้วยโมเดล ${detected}`, false);
      } else {
        updateModelBadgeDisplay();
        if (keyStatus) {
          keyStatus.innerHTML = '<span style="color:var(--green);">✅ บันทึก API Key เรียบร้อย (จะจับคู่โมเดลอัตโนมัติ)</span>';
        }
        showToast('บันทึกสำเร็จ', 'บันทึก API Key เรียบร้อย', false);
      }

      setTimeout(() => {
        if (settingsBody) settingsBody.style.display = 'none';
      }, 1500);
    });
  }

  if (toggleSettingsBtn && settingsBody) {
    toggleSettingsBtn.addEventListener('click', () => {
      const isHidden = settingsBody.style.display === 'none';
      settingsBody.style.display = isHidden ? 'block' : 'none';
      toggleSettingsBtn.querySelector('svg').style.transform = isHidden ? 'rotate(180deg)' : '';
    });
  }

  if (trySampleBtn) {
    trySampleBtn.addEventListener('click', runDemoAnalysis);
  }

  // Image upload
  const imageUploadInput = document.getElementById('aiImageUpload');
  if (imageUploadInput) {
    imageUploadInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files);
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          const imgData = await readFileAsBase64(file);
          aiAttachedImages.push(imgData);
        }
      }
      updateAttachedImagesPreview();
      imageUploadInput.value = '';
    });
  }

  // Paste image (Ctrl+V)
  const textInput = document.getElementById('aiTextInput');
  const inputBar = document.getElementById('aiInputBar');

  if (textInput) {
    textInput.addEventListener('paste', async (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            const imgData = await readFileAsBase64(file);
            aiAttachedImages.push(imgData);
            updateAttachedImagesPreview();
          }
        }
      }
    });

    // Auto-resize textarea
    textInput.addEventListener('input', () => {
      textInput.style.height = 'auto';
      textInput.style.height = Math.min(textInput.scrollHeight, 120) + 'px';
    });

    // Enter to send (Shift+Enter for newline)
    textInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleAISend();
      }
    });
  }

  // Drag and drop on input bar
  if (inputBar) {
    inputBar.addEventListener('dragover', (e) => {
      e.preventDefault();
      inputBar.classList.add('drag-over');
    });
    inputBar.addEventListener('dragleave', () => {
      inputBar.classList.remove('drag-over');
    });
    inputBar.addEventListener('drop', async (e) => {
      e.preventDefault();
      inputBar.classList.remove('drag-over');
      const files = Array.from(e.dataTransfer.files);
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          const imgData = await readFileAsBase64(file);
          aiAttachedImages.push(imgData);
        }
      }
      updateAttachedImagesPreview();
    });
  }

  // Send button
  const sendBtn = document.getElementById('btnAISend');
  if (sendBtn) {
    sendBtn.addEventListener('click', handleAISend);
  }

  // Also allow paste on the entire AI section
  const aiSection = document.getElementById('contentAI');
  if (aiSection) {
    aiSection.addEventListener('paste', async (e) => {
      // Only handle if text input is not focused (to avoid double handling)
      if (document.activeElement === textInput) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            const imgData = await readFileAsBase64(file);
            aiAttachedImages.push(imgData);
            updateAttachedImagesPreview();
          }
        }
      }
    });
  }
}

// 13. ลูปอัปเดตเวลาทุก 1 วินาที
function tick() {
  const clockEl = document.getElementById('currentClock');
  if (clockEl) clockEl.textContent = getNowThaiStr();

  updateRecurringCountdowns();
  updateScheduledCards();
  updateScheduleHighlight();
  updateFilteredNext();
}

// 14. เริ่มทำงานตอนโหลดหน้าเว็บเสร็จ
document.addEventListener('DOMContentLoaded', () => {
  // 1. กำหนดธีมเริ่มต้นและผูก Event ปรับธีม
  initTheme();

  // 2. โหลด & เรนเดอร์หน้าระบบคำนวณราคา
  loadSelectedQuantities();
  renderItemList();
  setupItemEvents();

  // 3. โหลด & เรนเดอร์หน้ากิจกรรม
  loadRecurringStates();
  buildRecurringEvents();
  buildScheduledCards();
  buildScheduleTable();
  buildFilterOptions();
  setupNotificationControls();

  // 4. ตั้งค่าแท็บหลัก
  setupTabs();

  // 5. ตั้งค่า AI Scanner
  setupAIScanner();

  // 6. ลูปเวลาทุก 1 วินาที
  tick();
  setInterval(tick, 1000);
});

