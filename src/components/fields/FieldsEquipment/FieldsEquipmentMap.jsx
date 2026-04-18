import { useEffect, useMemo, useState } from 'react'
import { feature } from 'topojson-client'
import { geoPath, geoIdentity } from 'd3-geo'

const TOPO_URL = '/data/vn-topo.json'

const HIGHLIGHTS = {
  'Hà Nội':         { key: 'hn',  city: 'Hà Nội'  },
  'Đà Nẵng':        { key: 'dn',  city: 'Đà Nẵng' },
  'TP.Hồ Chí Minh': { key: 'hcm', city: 'TP.HCM'  },
}

const VIEW = { x: 46, y: 0, w: 707, h: 800 }

/* Ngưỡng x (px viewBox) — phía đông ngưỡng này coi là quần đảo ngoài khơi */
const ISLAND_X_THRESHOLD = 570

const path = geoPath(geoIdentity())

/* Lấy centroid của polygon LỚN NHẤT trong feature — đảm bảo trỏ vào thân chính của tỉnh */
function mainlandCentroid(f) {
  if (f.geometry.type === 'Polygon') return path.centroid(f)
  let best = null, bestArea = -Infinity
  for (const polyCoords of f.geometry.coordinates) {
    const sub = { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: polyCoords } }
    const a = path.area(sub)
    if (a > bestArea) { bestArea = a; best = sub }
  }
  return path.centroid(best)
}

export default function FieldsEquipmentMap() {
  const [topo, setTopo] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(TOPO_URL)
      .then(r => r.json())
      .then(j => { if (!cancelled) setTopo(j) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const { provinces, islands, pins } = useMemo(() => {
    if (!topo) return { provinces: [], islands: [], pins: [] }
    const fc = feature(topo, topo.objects.tracts)
    const provinces = []
    const islands = []
    let islandIdx = 0
    for (const f of fc.features) {
      const name = f.properties.ten_tinh
      const hl = HIGHLIGHTS[name] || null
      // Tỉnh có highlight: tách polygon lớn nhất làm thân tỉnh, phần còn lại = đảo (trắng)
      if (hl && f.geometry.type === 'MultiPolygon') {
        let mainIdx = 0, mainArea = -Infinity
        const subs = f.geometry.coordinates.map(coords => ({
          type: 'Feature', properties: f.properties,
          geometry: { type: 'Polygon', coordinates: coords },
        }))
        subs.forEach((s, i) => {
          const a = path.area(s)
          if (a > mainArea) { mainArea = a; mainIdx = i }
        })
        provinces.push({ name, d: path(subs[mainIdx]), hl })
        subs.forEach((s, i) => {
          if (i !== mainIdx) islands.push({ key: `is-${islandIdx++}`, d: path(s) })
        })
      } else {
        provinces.push({ name, d: path(f), hl })
        // Tỉnh thường: vẫn tách quần đảo ngoài khơi xa làm đảo trắng
        if (f.geometry.type === 'MultiPolygon') {
          for (const polyCoords of f.geometry.coordinates) {
            const sub = { type: 'Feature', properties: f.properties, geometry: { type: 'Polygon', coordinates: polyCoords } }
            const [cx] = path.centroid(sub)
            if (cx > ISLAND_X_THRESHOLD) islands.push({ key: `is-${islandIdx++}`, d: path(sub) })
          }
        }
      }
    }
    const pins = provinces
      .filter(p => p.hl)
      .map(p => {
        const f = fc.features.find(x => x.properties.ten_tinh === p.name)
        const [cx, cy] = mainlandCentroid(f)
        return {
          ...p.hl,
          xPct: ((cx - VIEW.x) / VIEW.w) * 100,
          yPct: (cy / VIEW.h) * 100,
        }
      })
    return { provinces, islands, pins }
  }, [topo])

  return (
    <div className={`fp-eq__mapviz ${topo ? 'is-ready' : ''}`}>
      <svg
        className="fp-eq__mapviz-svg"
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <g className="fp-eq__mapviz-paths">
          {provinces.map(p => (
            <path
              key={p.name}
              d={p.d}
              className={`fp-eq__province ${p.hl ? `is-active is-${p.hl.key}` : ''}`}
            />
          ))}
          {islands.map(is => (
            <path key={is.key} d={is.d} className="fp-eq__island" />
          ))}
        </g>
      </svg>

      {pins.map((p, i) => (
        <div
          key={p.key}
          className={`fp-eq__pin fp-eq__pin--${p.key}`}
          style={{ left: `${p.xPct}%`, top: `${p.yPct}%`, '--pi': i }}
        >
          <span className="fp-eq__pin-name">{p.city}</span>
        </div>
      ))}
    </div>
  )
}
