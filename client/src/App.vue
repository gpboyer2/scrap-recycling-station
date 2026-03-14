<template>
  <div class="app">
    <header class="header">
      <h1>{{ station.name }}</h1>
    </header>

    <section class="info-section">
      <div class="info-item">
        <span class="label">地址：</span>
        <a
          :href="mapUrl"
          target="_blank"
          class="link"
        >
          {{ station.address }}
        </a>
      </div>
      <div class="info-item">
        <span class="label">电话：</span>
        <a
          :href="`tel:${station.phone}`"
          class="link"
        >
          {{ station.phone }}
        </a>
      </div>
      <div class="info-item update-time">
        价格更新日期：{{ updateDate }}
      </div>
    </section>

    <section class="price-section">
      <h2>今日价格</h2>
      <table class="price-table">
        <thead>
          <tr>
            <th>废品名称</th>
            <th>单位</th>
            <th>价格（元）</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in priceList" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.unit }}</td>
            <td class="price">{{ item.price.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
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
  // 高德地图 URL Scheme
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 28px;
  color: #2e7d32;
}

.info-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-item {
  font-size: 16px;
  margin-bottom: 12px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.label {
  color: #666;
}

.link {
  color: #1976d2;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.update-time {
  color: #999;
  font-size: 14px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
}

.price-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.price-section h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
}

.price-table {
  width: 100%;
  border-collapse: collapse;
}

.price-table th,
.price-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.price-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #666;
}

.price-table td {
  font-size: 16px;
}

.price-table .price {
  color: #d32f2f;
  font-weight: 600;
}

.price-table tr:last-child td {
  border-bottom: none;
}
</style>
