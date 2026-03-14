<template>
  <div class="app">
    <header class="header">
      <h1 class="header-title">{{ station.name }}</h1>
      <p class="header-slogan">环保回收，变废为宝</p>
    </header>

    <section class="info-section">
      <div class="info-row">
        <a
          :href="mapUrl"
          target="_blank"
          class="info-item"
        >
          <svg class="info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78716C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span class="info-text">{{ station.address }}</span>
        </a>

        <a
          :href="`tel:${station.phone}`"
          class="info-item"
        >
          <svg class="info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78716C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span class="info-text">{{ station.phone }}</span>
        </a>
      </div>
    </section>

    <section class="price-section">
      <div class="price-header">
        <h2 class="price-title">今日回收价格</h2>
        <span class="price-date">更新于 {{ updateDate }}</span>
      </div>

      <div class="price-list">
        <div
          v-for="item in priceList"
          :key="item.name"
          class="price-card"
        >
          <div class="price-name">{{ item.name }}</div>
          <div class="price-info">
            <span class="price-value">{{ item.price.toFixed(2) }}</span>
            <span class="price-unit">元/{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getStationInfo, getPrices } from './api.js'

const station = ref({
  name: '',
  address: '',
  phone: '',
  latitude: 0,
  longitude: 0
})

const priceList = ref([])
const updateDate = ref('')

const mapUrl = computed(() => {
  const { latitude, longitude } = station.value
  return `https://uri.amap.com/marker?position=${longitude},${latitude}&name=${encodeURIComponent(station.value.name)}`
})

onMounted(async () => {
  try {
    const [infoRes, priceRes] = await Promise.all([
      getStationInfo(),
      getPrices()
    ])

    if (infoRes.status === 'success') {
      station.value = infoRes.datum
    }

    if (priceRes.status === 'success') {
      priceList.value = priceRes.datum.list
      updateDate.value = priceRes.datum.updateDate
    }
  } catch (err) {
    console.error('加载数据失败:', err)
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #FAFAF9;
  color: #292524;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.app {
  max-width: 480px;
  margin: 0 auto;
  padding: 16px;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 16px 0 12px;
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  color: #292524;
  margin-bottom: 4px;
}

.header-slogan {
  font-size: 12px;
  color: #78716C;
}

.info-section {
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.info-item {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  cursor: pointer;
}

.info-item:hover {
  background-color: #FAFAF9;
}

.info-item:active {
  background-color: #F5F5F4;
}

.info-item:first-child {
  border-right: 1px solid #E7E5E4;
}

.info-icon {
  flex-shrink: 0;
  margin-right: 8px;
}

.info-text {
  font-size: 13px;
  color: #292524;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price-section {
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.price-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #E7E5E4;
}

.price-title {
  font-size: 16px;
  font-weight: 700;
  color: #292524;
}

.price-date {
  font-size: 11px;
  color: #78716C;
}

.price-list {
  display: flex;
  flex-direction: column;
}

.price-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #F5F5F4;
  transition: all 0.2s ease;
}

.price-card:hover {
  background-color: #FAFAF9;
  margin: 0 -8px;
  padding: 10px 8px;
  border-radius: 6px;
}

.price-card:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.price-card:last-child:hover {
  padding-bottom: 10px;
}

.price-name {
  font-size: 14px;
  color: #292524;
}

.price-info {
  display: flex;
  align-items: baseline;
}

.price-value {
  font-size: 16px;
  font-weight: 700;
  color: #A16207;
  margin-right: 2px;
}

.price-unit {
  font-size: 11px;
  color: #78716C;
}
</style>
