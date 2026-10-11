const regionSelect = document.getElementById('regionSelect');
const analyzeBtn = document.getElementById('analyzeBtn');
const regionTitle = document.getElementById('regionTitle');
const summaryIntro = document.getElementById('summaryIntro');
const summaryGrid = document.getElementById('summaryGrid');
const insightsList = document.getElementById('insightsList');
const signalStatus = document.getElementById('signalStatus');

const chartConfigs = {
  temperature_anomaly: { label: 'Temperature anomaly', unit: '°C', color: '#4ecdc4' },
  sea_ice_extent: { label: 'Sea ice extent', unit: '%', color: '#7ec8ff' },
  co2_ppm: { label: 'Atmospheric CO2', unit: 'ppm', color: '#ff9f43' },
  vegetation_index: { label: 'Vegetation index', unit: 'index', color: '#8ae28f' },
};

async function fetchRegions() {
  const response = await fetch('/api/regions');
  const data = await response.json();
  regionSelect.innerHTML = data.regions
    .map((region) => `<option value="${region}">${region}</option>`)
    .join('');
}

async function loadRegionData(regionName) {
  const response = await fetch(`/api/trends?region=${encodeURIComponent(regionName)}`);
  if (!response.ok) {
    throw new Error('Unable to load region data');
  }
  return response.json();
}

function renderSummaryCards(insights) {
  summaryGrid.innerHTML = insights
    .map(
      (item) => `
        <article class="summary-card">
          <h4>${item.title}</h4>
          <div class="summary-value">${item.value}</div>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join('');
}

function renderInsights(insights) {
  insightsList.innerHTML = insights
    .map(
      (item) => `
        <li>
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </li>
      `,
    )
    .join('');
}

function buildLineChart(containerId, labels, values, config) {
  const container = document.getElementById(containerId);
  const width = 520;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const yMin = minValue - (maxValue - minValue) * 0.15 || 0;
  const yMax = maxValue + (maxValue - minValue) * 0.15 || 1;

  const xStep = (width - padding.left - padding.right) / (Math.max(labels.length - 1, 1));

  const points = values
    .map((value, index) => {
      const x = padding.left + index * xStep;
      const y = height - padding.bottom - ((value - yMin) / (yMax - yMin || 1)) * (height - padding.top - padding.bottom);
      return `${x},${y}`;
    })
    .join(' ');

  const yTicks = 4;
  const svg = `
    <svg viewBox="0 0 ${width} ${height}" aria-label="${config.label} chart" role="img">
      ${Array.from({ length: yTicks + 1 }, (_, index) => {
        const y = padding.top + (index * (height - padding.top - padding.bottom)) / yTicks;
        const value = (yMax - ((y - padding.top) / (height - padding.top - padding.bottom)) * (yMax - yMin)).toFixed(1);
        return `
          <line class="grid-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}"></line>
          <text class="axis-text" x="8" y="${y + 4}">${value}</text>
        `;
      }).join('')}

      <polyline class="line" points="${points}" style="stroke: ${config.color};"></polyline>

      ${values.map((value, index) => {
        const x = padding.left + index * xStep;
        const y = height - padding.bottom - ((value - yMin) / (yMax - yMin || 1)) * (height - padding.top - padding.bottom);
        return `<circle class="point" cx="${x}" cy="${y}" r="2.5" style="color: ${config.color};"></circle>`;
      }).join('')}

      ${labels.map((label, index) => {
        if (index % 5 !== 0 && index !== labels.length - 1) return '';
        const x = padding.left + index * xStep;
        return `<text class="axis-text" x="${x}" y="${height - 8}" text-anchor="middle">${label}</text>`;
      }).join('')}
    </svg>
  `;

  container.innerHTML = svg;
}

function renderCharts(metrics) {
  const years = metrics.years || [];
  const values = {
    temperature_anomaly: metrics.temperature_anomaly,
    sea_ice_extent: metrics.sea_ice_extent,
    co2_ppm: metrics.co2_ppm,
    vegetation_index: metrics.vegetation_index,
  };

  Object.entries(chartConfigs).forEach(([key, config]) => {
    buildLineChart(`chart-${key === 'temperature_anomaly' ? 'temperature' : key === 'sea_ice_extent' ? 'sea-ice' : key === 'co2_ppm' ? 'co2' : 'vegetation'}`, years, values[key], config);
  });
}

async function updateDashboard() {
  const selectedRegion = regionSelect.value;
  const data = await loadRegionData(selectedRegion);

  regionTitle.textContent = data.region;
  summaryIntro.textContent = `This investigation tracks how ${data.region.toLowerCase()} signals shift across temperature, ice, carbon, and ecosystem indicators from 2000 to 2025.`;

  const climateSignal = data.metrics.temperature_anomaly[data.metrics.temperature_anomaly.length - 1] > data.metrics.temperature_anomaly[0]
    ? 'Climate signal active'
    : 'Climate signal stable';
  signalStatus.textContent = climateSignal;

  renderSummaryCards(data.insights);
  renderInsights(data.insights);
  renderCharts(data.metrics);
}

async function init() {
  await fetchRegions();
  regionSelect.value = 'Global';
  analyzeBtn.addEventListener('click', updateDashboard);
  regionSelect.addEventListener('change', updateDashboard);
  await updateDashboard();
}

init();


































































"use strict";

const regionSelect = document.getElementById('regionSelect');
const analyzeBtn = document.getElementById('analyzeBtn');
const regionTitle = document.getElementById('regionTitle');
const summaryIntro = document.getElementById('summaryIntro');
const summaryGrid = document.getElementById('summaryGrid');
const insightsList = document.getElementById('insightsList');
const signalStatus = document.getElementById('signalStatus');

const chartConfigs = {
  temperature_anomaly: { label: 'Temperature anomaly', unit: '°C', color: '#4ecdc4' },
  sea_ice_extent: { label: 'Sea ice extent', unit: '%', color: '#7ec8ff' },
  co2_ppm: { label: 'Atmospheric CO2', unit: 'ppm', color: '#ff9f43' },
  vegetation_index: { label: 'Vegetation index', unit: 'index', color: '#8ae28f' },
};

async function fetchRegions() {
  const response = await fetch('/api/regions');
  const data = await response.json();
  regionSelect.innerHTML = data.regions
    .map((region) => `<option value="${region}">${region}</option>`)
    .join('');
}

async function loadRegionData(regionName) {
  const response = await fetch(`/api/trends?region=${encodeURIComponent(regionName)}`);
  if (!response.ok) {
    throw new Error('Unable to load region data');
  }
  return response.json();
}

function renderSummaryCards(insights) {
  summaryGrid.innerHTML = insights
    .map(
      (item) => `
        <article class="summary-card">
          <h4>${item.title}</h4>
          <div class="summary-value">${item.value}</div>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join('');
}

function renderInsights(insights) {
  insightsList.innerHTML = insights
    .map(
      (item) => `
        <li>
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </li>
      `,
    )
    .join('');
}

function buildLineChart(containerId, labels, values, config) {
  const container = document.getElementById(containerId);
  const width = 520;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const yMin = minValue - (maxValue - minValue) * 0.15 || 0;
  const yMax = maxValue + (maxValue - minValue) * 0.15 || 1;

  const xStep = (width - padding.left - padding.right) / (Math.max(labels.length - 1, 1));

  const points = values
    .map((value, index) => {
      const x = padding.left + index * xStep;
      const y = height - padding.bottom - ((value - yMin) / (yMax - yMin || 1)) * (height - padding.top - padding.bottom);
      return `${x},${y}`;
    })
    .join(' ');

  const yTicks = 4;
  const svg = `
    <svg viewBox="0 0 ${width} ${height}" aria-label="${config.label} chart" role="img">
      ${Array.from({ length: yTicks + 1 }, (_, index) => {
        const y = padding.top + (index * (height - padding.top - padding.bottom)) / yTicks;
        const value = (yMax - ((y - padding.top) / (height - padding.top - padding.bottom)) * (yMax - yMin)).toFixed(1);
        return `
          <line class="grid-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}"></line>
          <text class="axis-text" x="8" y="${y + 4}">${value}</text>
        `;
      }).join('')}

      <polyline class="line" points="${points}" style="stroke: ${config.color};"></polyline>

      ${values.map((value, index) => {
        const x = padding.left + index * xStep;
        const y = height - padding.bottom - ((value - yMin) / (yMax - yMin || 1)) * (height - padding.top - padding.bottom);
        return `<circle class="point" cx="${x}" cy="${y}" r="2.5" style="color: ${config.color};"></circle>`;
      }).join('')}

      ${labels.map((label, index) => {
        if (index % 5 !== 0 && index !== labels.length - 1) return '';
        const x = padding.left + index * xStep;
        return `<text class="axis-text" x="${x}" y="${height - 8}" text-anchor="middle">${label}</text>`;
      }).join('')}
    </svg>
  `;

  container.innerHTML = svg;
}

function renderCharts(data) {
  const years = data.years || [];
  const values = {
    temperature_anomaly: data.metrics.temperature_anomaly,
    sea_ice_extent: data.metrics.sea_ice_extent,
    co2_ppm: data.metrics.co2_ppm,
    vegetation_index: data.metrics.vegetation_index,
  };

  Object.entries(chartConfigs).forEach(([key, config]) => {
    const chartId = key === 'temperature_anomaly'
      ? 'chart-temperature'
      : key === 'sea_ice_extent'
        ? 'chart-sea-ice'
        : key === 'co2_ppm'
          ? 'chart-co2'
          : 'chart-vegetation';
    buildLineChart(chartId, years, values[key], config);
  });
}

async function updateDashboard() {
  const selectedRegion = regionSelect.value;
  const data = await loadRegionData(selectedRegion);

  regionTitle.textContent = data.region;
  summaryIntro.textContent = `This investigation tracks how ${data.region.toLowerCase()} signals shift across temperature, ice, carbon, and ecosystem indicators from 2000 to 2025.`;

  const climateSignal = data.metrics.temperature_anomaly[data.metrics.temperature_anomaly.length - 1] > data.metrics.temperature_anomaly[0]
    ? 'Climate signal active'
    : 'Climate signal stable';
  signalStatus.textContent = climateSignal;

  renderSummaryCards(data.insights);
  renderInsights(data.insights);
  renderCharts(data);
}

async function init() {
  await fetchRegions();
  regionSelect.value = 'Global';
  analyzeBtn.addEventListener('click', updateDashboard);
  regionSelect.addEventListener('change', updateDashboard);
  await updateDashboard();
}

init();


































	
	
	
		
			
			
			
			
			
			
			
			
			
			
			
			
			
			
				
