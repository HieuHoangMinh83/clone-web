import Header from '../../components/shared/Header/Header.jsx'
import SectionIndicator from '../../components/shared/SectionIndicator/SectionIndicator.jsx'
import useFullpageScroll from '../../components/intro/useFullpageScroll.js'
import FieldsBanner from '../../components/fields/FieldsBanner/FieldsBanner.jsx'
import FieldsDB from '../../components/fields/FieldsDB/FieldsDB.jsx'
import FieldsPanel from '../../components/fields/FieldsPanel/FieldsPanel.jsx'
import FieldsOutro from '../../components/fields/FieldsOutro/FieldsOutro.jsx'
import { FIELDS_DATA } from '../../components/fields/fieldsData.js'
import '../../components/fields/fields-shared.css'

const SECTION_LABELS = [
  'Banner',
  'Tổng thầu D&B',
  'Dân dụng',
  'Công nghiệp',
  'Hạ tầng',
  'Cơ điện',
  'Liên hệ',
]

const SECTION_TONES = [
  'light',
  'paper',
  'light',
  'light',
  'light',
  'light',
  'light',
]

export default function FieldsPage() {
  const total = SECTION_LABELS.length
  const { index, goTo } = useFullpageScroll(total)

  return (
    <>
      <Header />
      <div
        className="fullpage"
        style={{ transform: `translateY(-${index * 100}vh)` }}
      >
        <FieldsBanner active={index === 0} />
        <FieldsDB active={index === 1} />
        {FIELDS_DATA.map((f, i) => (
          <FieldsPanel
            key={f.id}
            field={f}
            index={i + 1}
            total={FIELDS_DATA.length}
            active={index === i + 2}
            reversed={i % 2 === 1}
          />
        ))}
        <FieldsOutro active={index === total - 1} />
      </div>
      <SectionIndicator
        current={index}
        total={total}
        onNav={goTo}
        labels={SECTION_LABELS}
        tone={SECTION_TONES[index]}
      />
    </>
  )
}
