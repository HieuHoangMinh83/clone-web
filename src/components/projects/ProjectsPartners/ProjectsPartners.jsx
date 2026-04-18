import './ProjectsPartners.css'

const PARTNERS = [
  'Vingroup',
  'Masterise Homes',
  'Sun Group',
  'Vincom Retail',
  'BIM Group',
  'T&T Group',
  'Techcombank',
  'Flamingo',
  'Nam Long',
  'BW Industrial',
  'Viettel',
  'Becamex Tokyu',
  'Sonadezi',
  'Suncity',
  'Dewey Group',
]

export default function ProjectsPartners() {
  const track = [...PARTNERS, ...PARTNERS]

  return (
    <section className="prj-sec prj-partners" aria-label="Đối tác đã đồng hành">
      <header className="prj-partners__head">
        <span>Chủ đầu tư · Đối tác</span>
        <em>đồng hành cùng Newtecons</em>
        <span className="prj-partners__line" aria-hidden />
      </header>
      <div className="prj-partners__track" aria-hidden>
        {track.map((name, i) => (
          <span key={`${name}-${i}`} className="prj-partners__item">
            <span className="prj-partners__dot" />
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
