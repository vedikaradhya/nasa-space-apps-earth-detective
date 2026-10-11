:root {
  --bg: #061621;
  --panel: rgba(13, 29, 42, 0.95);
  --panel-strong: rgba(18, 39, 55, 0.98);
  --line: rgba(148, 163, 184, 0.28);
  --text: #ebf6ff;
  --muted: #a9bfd6;
  --accent: #52d5c4;
  --accent-2: #6ecbff;
  --warning: #ffbf69;
  --danger: #ff7b7b;
  --success: #8ae28f;
  --shadow: rgba(2, 6, 23, 0.38);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: Inter, "Segoe UI", sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at top, rgba(21, 97, 119, 0.3), transparent 30%),
    linear-gradient(180deg, #061622 0%, #091d2d 100%);
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 18px 72px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

h1, h2, h3, p, ul {
  margin-top: 0;
}

h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 0;
}

.eyebrow,
.section-tag {
  margin-bottom: 8px;
  font-size: 0.73rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.controls {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(16, 31, 44, 0.9);
  border-radius: 12px;
  border: 1px solid var(--line);
  box-shadow: 0 10px 20px var(--shadow);
}

.controls label {
  font-size: 0.85rem;
  color: var(--muted);
}

select,
input {
  background: #061b2a;
  color: var(--text);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 10px 12px;
}

button {
  border: none;
  border-radius: 10px;
  color: #06202b;
  font-weight: 700;
  padding: 10px 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 8px 20px rgba(82, 213, 196, 0.3);
}

.secondary-btn {
  background: rgba(110, 203, 255, 0.12);
  color: var(--text);
  border: 1px solid rgba(110, 203, 255, 0.3);
  box-shadow: none;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.tab {
  background: rgba(17, 33, 48, 0.9);
  color: var(--muted);
  border: 1px solid var(--line);
  box-shadow: none;
}

.tab.active {
  background: linear-gradient(135deg, rgba(82, 213, 196, 0.25), rgba(110, 203, 255, 0.18));
  color: var(--text);
  border-color: rgba(82, 213, 196, 0.5);
}

main {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.tab-panel {
  display: none;
}

.tab-panel.active {
  display: block;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: 0 16px 30px var(--shadow);
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 24px 28px;
}

.hero h2 {
  margin-bottom: 10px;
  font-size: clamp(2rem, 3vw, 2.7rem);
}

#summaryIntro {
  max-width: 700px;
  margin-bottom: 0;
  color: var(--muted);
  line-height: 1.6;
}

.signal-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(82, 213, 196, 0.45);
  background: rgba(82, 213, 196, 0.08);
  color: #c8fff7;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 16px rgba(82, 213, 196, 0.9);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.summary-card {
  padding: 18px 18px 14px;
  background: linear-gradient(180deg, rgba(18, 42, 58, 0.95), rgba(10, 23, 31, 0.95));
  border: 1px solid var(--line);
  border-radius: 16px;
}

.summary-card h4 {
  margin-bottom: 12px;
  color: var(--muted);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.summary-value {
  font-size: clamp(1.4rem, 2vw, 2rem);
  font-weight: 800;
  margin-bottom: 6px;
}

.summary-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.5;
  font-size: 0.88rem;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;
}

.chart-panel {
  padding: 18px 18px 6px;
}

.wide {
  grid-column: span 2;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.panel-head h3 {
  margin: 0;
  font-size: 1.08rem;
}

.panel-head span {
  color: var(--muted);
  font-size: 0.8rem;
}

.chart {
  min-height: 260px;
  border-radius: 12px;
  background: rgba(4, 16, 25, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.08);
  overflow: hidden;
}

.signal-panel,
.compare-panel,
.report-panel {
  padding: 18px 20px 20px;
  margin-top: 18px;
}

.signal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.signal-card {
  padding: 16px 14px;
  border-radius: 12px;
  background: rgba(8, 20, 31, 0.8);
  border: 1px solid var(--line);
}

.signal-card .metric-name {
  font-size: 0.78rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.signal-card .metric-value {
  display: block;
  margin: 8px 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.signal-card .metric-trend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.82rem;
  color: var(--muted);
}

.signal-card[data-status="high"] {
  border-color: rgba(255, 123, 123, 0.45);
}

.signal-card[data-status="moderate"] {
  border-color: rgba(255, 191, 105, 0.4);
}

.signal-card[data-status="stable"] {
  border-color: rgba(138, 226, 143, 0.35);
}

.compare-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.compare-inputs input {
  flex: 1;
  max-width: 520px;
}

.compare-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.compare-card {
  background: rgba(8, 23, 35, 0.78);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 16px 14px;
}

.compare-card h4 {
  margin: 0 0 12px;
  font-size: 1.1rem;
}

.compare-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
  color: var(--muted);
}

.compare-card li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.report-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.story-card {
  background: rgba(8, 22, 32, 0.7);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 18px 16px;
}

.story-card h3 {
  margin: 0 0 10px;
}

.story-card p {
  color: var(--muted);
  line-height: 1.65;
}

.muted {
  color: var(--muted);
}

.forecast-list,
.recommendation-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
  color: var(--muted);
}

.forecast-list li,
.recommendation-list li {
  background: rgba(13, 33, 45, 0.8);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 12px 12px;
  line-height: 1.55;
}

svg {
  width: 100%;
  height: 260px;
  display: block;
}

.axis-text {
  fill: var(--muted);
  font-size: 11px;
}

.grid-line {
  stroke: rgba(148, 163, 184, 0.16);
  stroke-width: 1;
}

.line {
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.point {
  fill: white;
  stroke: currentColor;
  stroke-width: 2;
}

.bar {
  fill: rgba(82, 213, 196, 0.7);
}

@media (max-width: 860px) {
  .topbar,
  .hero,
  .compare-inputs,
  .panel-head {
    display: block;
  }

  .controls {
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .chart-grid,
  .report-grid {
    grid-template-columns: 1fr;
  }

  .wide {
    grid-column: auto;
  }
}






























