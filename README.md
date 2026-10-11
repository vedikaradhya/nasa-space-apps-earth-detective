const regionSelect = document.getElementById('regionSelect');
const analyzeBtn = document.getElementById('analyzeBtn');
const compareBtn = document.getElementById('compareBtn');
const compareRegionsInput = document.getElementById('compareRegions');
const regionTitle = document.getElementById('regionTitle');
const summaryIntro = document.getElementById('summaryIntro');
const summaryGrid = document.getElementById('summaryGrid');
const signalStatus = document.getElementById('signalStatus');
const signalGrid = document.getElementById('signalGrid');
const compareGrid = document.getElementById('compareGrid');
const storyHeadline = document.getElementById('storyHeadline');
const storyNarrative = document.getElementById('storyNarrative');
const storyInsight = document.getElementById('storyInsight');
const forecastScenario = document.getElementById('forecastScenario');
const forecastList = document.getElementById('forecastList');
const recommendationList = document.getElementById('recommendationList');

const chartPalette = {
  temperature: '#52d5c4',
  ice: '#6ecbff',
  co2: '#ffbf69',
  vegetation: '#8ae28f',
  methane: '#ff7b7b',
  events: '#d9a8ff',
};

const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.tab-panel'));

function setActiveTab(tabName) {
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });
  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabName);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => setActiveTab(tab.dataset.tab));
});

async function fetchRegions() {
  const response = await fetch('/api/regions');
  const data = await response.json();
  regionSelect.innerHTML = data.regions
    .map((region) => `<option value="${region}">${region}</option>`)
    .join('');
}

async function loadRegionData(regionName) {
  const response = await fetch(`/api/trends?region=${encodeURIComponent(regionName)}`);
  if (!response.ok) throw new Error('Unable to load trend data');
  return response.json();
}

async function loadCompareData(regionsText) {
  const response = await fetch(`/api/compare?regions=${encodeURIComponent(regionsText)}`);
  if (!response.ok) throw new Error('Unable to load comparison data');
  return response.json();
}

function renderSummaryCards(items) {
  summaryGrid.innerHTML = items
    .map(
      (item) => `
        <article class="summary-card">
          <h4>${item.title}</h4>
          <div class="summary-value">${item.value}</div>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join('');
}

function renderSignalCards(cards) {
  signalGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="signal-card" data-status="${card.status}">
          <div class="metric-name">${card.label}</div>
          <span class="metric-value">${formatMetric(card.metric, card.value)}</span>
          <div class="metric-trend">
            <span>${card.trend >= 0 ? '+' : ''}${card.trend}%</span>
            <span>${card.status}</span>
          </div>
        </article>
      `
    )
    .join('');
}

function formatMetric(metric, value) {
  if (metric === 'temperature_anomaly') return `${value.toFixed(2)}°C`;
  if (metric === 'sea_ice_extent') return `${value.toFixed(1)}%`;
  if (metric === 'co2_ppm') return `${value.toFixed(1)} ppm`;
  if (metric === 'vegetation_index') return `${value.toFixed(1)}`;
  if (metric === 'fire_risk') return `${value.toFixed(2)}`;
  if (metric === 'ocean_heat') return `${value.toFixed(1)} J/m²`;
  return `${value.toFixed(1)}`;
}

function renderReport(data) {
  const { story, forecast, recommendations } = data;
  storyHeadline.textContent = story.headline;
  storyNarrative.textContent = story.narrative;
  storyInsight.textContent = story.insight;
  forecastScenario.textContent = forecast.scenario;
  forecastList.innerHTML = [
    `<li>Temperature by 2030: ${forecast.projection.temperature_2030.toFixed(2)}°C</li>`,
    `<li>CO₂ by 2030: ${forecast.projection.co2_2030.toFixed(1)} ppm</li>`,
    `<li>Sea-ice extent by 2030: ${forecast.projection.sea_ice_2030.toFixed(1)}%</li>`,
    `<li>Risk score: ${forecast.projection.risk_score.toFixed(1)}</li>`,
  ].join('');
  recommendationList.innerHTML = recommendations.map((item) => `<li>${item}</li>`).join('');
}

function renderCompare(data) {
  compareGrid.innerHTML = data.regions
    .map(
      (region) => `
        <article class="compare-card">
          <h4>${region.name}</h4>
          <ul>
            <li><span>Temperature</span><strong>${region.temperature.toFixed(2)}°C</strong></li>
            <li><span>Sea ice</span><strong>${region.ice.toFixed(1)}%</strong></li>
            <li><span>CO₂</span><strong>${region.co2.toFixed(1)} ppm</strong></li>
            <li><span>Vegetation</span><strong>${region.vegetation.toFixed(1)}</strong></li>
            <li><span>Fire risk</span><strong>${region.fire.toFixed(2)}</strong></li>
          </ul>
        </article>
      `
    )
    .join('');
}

function buildLineChart(containerId, labels, values, config) {
  const container = document.getElementById(containerId);
  const width = 520;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 35, left: 40 };

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const yMin = minValue - (maxValue - minValue) * 0.2 || 0;
  const yMax = maxValue + (maxValue - minValue) * 0.2 || 1;
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
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${config.label}">
      ${Array.from({ length: yTicks + 1 }, (_, index) => {
        const y = padding.top + (index * (height - padding.top - padding.bottom)) / yTicks;
        const value = (yMax - ((y - padding.top) / (height - padding.top - padding.bottom)) * (yMax - yMin)).toFixed(config.precision || 1);
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

function buildBarChart(containerId, labels, values, config) {
  const container = document.getElementById(containerId);
  const width = 520;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 35, left: 40 };
  const maxValue = Math.max(...values, 1);
  const barWidth = (width - padding.left - padding.right) / values.length - 8;

  const svg = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${config.label}">
      ${values.map((value, index) => {
        const x = padding.left + index * ((width - padding.left - padding.right) / values.length) + 4;
        const barHeight = (value / maxValue) * (height - padding.top - padding.bottom);
        const y = height - padding.bottom - barHeight;
        return `
          <rect class="bar" x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="5" fill="${config.color}"></rect>
          <text class="axis-text" x="${x + barWidth / 2}" y="${height - 8}" text-anchor="middle">${labels[index]}</text>
        `;
      }).join('')}
    </svg>
  `;
  container.innerHTML = svg;
}

function renderCharts(data) {
  const labels = data.years;
  const values = data.metrics;
  buildLineChart('chart-temperature', labels, values.temperature_anomaly, { label: 'Temperature anomaly', color: chartPalette.temperature, precision: 2 });
  buildLineChart('chart-sea-ice', labels, values.sea_ice_extent, { label: 'Sea ice extent', color: chartPalette.ice, precision: 1 });
  buildLineChart('chart-co2', labels, values.co2_ppm, { label: 'CO2', color: chartPalette.co2, precision: 1 });
  buildLineChart('chart-vegetation', labels, values.vegetation_index, { label: 'Vegetation index', color: chartPalette.vegetation, precision: 1 });

  const combinedYears = labels.slice(-10);
  const combinedOcean = values.ocean_heat.slice(-10);
  const combinedMethane = values.methane_ppb.slice(-10);
  buildLineChart('chart-combined', combinedYears, combinedOcean, { label: 'Ocean heat', color: chartPalette.temperature, precision: 1 });

  const methaneChart = document.getElementById('chart-combined');
  methaneChart.innerHTML = `
    <svg viewBox="0 0 520 260" role="img" aria-label="Ocean heat and methane pressure">
      <g>
        ${combinedOcean.map((value, index) => {
          const x = 40 + index * ((520 - 80) / combinedOcean.length);
          const y = 220 - ((value - Math.min(...combinedOcean)) / (Math.max(...combinedOcean) - Math.min(...combinedOcean) || 1)) * 170;
          return `<circle class="point" cx="${x}" cy="${y}" r="3" style="color: ${chartPalette.temperature};"></circle>`;
        }).join('')}
        ${combinedMethane.map((value, index) => {
          const x = 40 + index * ((520 - 80) / combinedMethane.length);
          const y = 220 - ((value - Math.min(...combinedMethane)) / (Math.max(...combinedMethane) - Math.min(...combinedMethane) || 1)) * 170;
          return `<circle class="point" cx="${x}" cy="${y}" r="3" style="color: ${chartPalette.methane};"></circle>`;
        }).join('')}
      </g>
    </svg>
  `;

  buildBarChart('chart-extreme', labels.slice(-10), values.extreme_events.slice(-10), { label: 'Extreme events', color: chartPalette.events });
}

function updateOverview(regionName) {
  loadRegionData(regionName)
    .then((data) => {
      regionTitle.textContent = data.region;
      summaryIntro.textContent = `This investigation tracks how ${data.region.toLowerCase()} shifts across temperature, ice, carbon, vegetation, and disturbance indicators from 2000 to 2025.`;
      const finalTemp = data.metrics.temperature_anomaly[data.metrics.temperature_anomaly.length - 1];
      signalStatus.textContent = finalTemp > 1.0 ? 'Climate signal active' : 'Climate signal stable';
      renderSummaryCards(data.summary);
      renderSignalCards(data.signals);
      renderCharts(data);
      renderReport(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function initialize() {
  await fetchRegions();
  regionSelect.value = 'Global';
  updateOverview('Global');

  analyzeBtn.addEventListener('click', () => {
    updateOverview(regionSelect.value);
  });

  regionSelect.addEventListener('change', () => {
    updateOverview(regionSelect.value);
  });

  compareBtn.addEventListener('click', async () => {
    const text = compareRegionsInput.value.trim();
    if (!text) return;
    const data = await loadCompareData(text);
    renderCompare(data);
  });

  const initialCompare = await loadCompareData('Global,Arctic,Amazon');
  renderCompare(initialCompare);
}

initialize();














































































































