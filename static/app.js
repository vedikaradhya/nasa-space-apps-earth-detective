* {
  box-sizing: border-box;
}

:root {
  --bg: #07131f;
  --panel: #0d1e2e;
  --panel-alt: #10263b;
  --line: rgba(148, 163, 184, 0.22);
  --text: #e5eef9;
  --muted: #98a9c4;
  --accent: #4ecdc4;
  --accent-2: #ff9f43;
  --danger: #ff6b6b;
  --shadow: rgba(15, 23, 42, 0.4);
}

body {
  margin: 0;
  font-family: Inter, Segoe UI, sans-serif;
  background: radial-gradient(circle at top, #102a3d, var(--bg) 45%);
  color: var(--text);
}

button,
select {
  font: inherit;
}

.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.eyebrow,
.section-tag {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  color: var(--accent);
}

h1, h2, h3, p {
  margin-top: 0;
}

h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 0;
}

.controls {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(18, 35, 52, 0.82);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 10px 25px var(--shadow);
}

.controls label {
  color: var(--muted);
}

select {
  background: #081c2b;
  color: var(--text);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 10px 12px;
}

button {
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, var(--accent), #2aa5d6);
  color: #031720;
  font-weight: 700;
  cursor: pointer;
}

main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.panel {
  background: rgba(16, 37, 53, 0.94);
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: 0 12px 30px var(--shadow);
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
}

.hero h2 {
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  margin-bottom: 8px;
}

#summaryIntro {
  max-width: 700px;
  color: var(--muted);
  margin-bottom: 0;
}

.signal-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(78, 205, 196, 0.09);
  border: 1px solid rgba(78, 205, 196, 0.35);
  border-radius: 999px;
  padding: 10px 16px;
  color: #b9f7f2;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 16px var(--accent);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.summary-card {
  padding: 18px 18px 16px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(17, 49, 67, 0.9), rgba(11, 26, 37, 0.95));
  border: 1px solid var(--line);
}

.summary-card h4 {
  margin: 0 0 12px;
  color: var(--muted);
  font-weight: 600;
  font-size: 0.85rem;
}

.summary-value {
  font-size: clamp(1.4rem, 2vw, 1.8rem);
  font-weight: 800;
  margin-bottom: 8px;
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
  gap: 20px;
}

.chart-panel {
  padding: 18px 18px 8px;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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
  width: 100%;
  min-height: 260px;
  border-radius: 12px;
  background: rgba(5, 17, 28, 0.35);
  border: 1px solid rgba(148, 163, 184, 0.1);
  overflow: hidden;
}

.insights-panel {
  padding: 18px 20px 10px;
}

.insights-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.insights-list li {
  background: rgba(9, 26, 37, 0.9);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 14px 16px;
}

.insights-list strong {
  display: block;
  margin-bottom: 6px;
  font-size: 0.92rem;
}

.insights-list span {
  color: var(--muted);
  line-height: 1.5;
  font-size: 0.88rem;
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
  stroke: rgba(148, 163, 184, 0.18);
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

@media (max-width: 860px) {
  .topbar,
  .hero {
    display: block;
  }

  .controls {
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .chart-grid {
    grid-template-columns: 1fr;
  }
}
