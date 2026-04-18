import Header from '../../components/shared/Header/Header.jsx'
import SectionIndicator from '../../components/shared/SectionIndicator/SectionIndicator.jsx'
import useFullpageScroll from '../../components/intro/useFullpageScroll.js'
import FieldsBanner from '../../components/fields/FieldsBanner/FieldsBanner.jsx'
import FieldsDB from '../../components/fields/FieldsDB/FieldsDB.jsx'
import FieldsConstruction from '../../components/fields/FieldsConstruction/FieldsConstruction.jsx'
import FieldsMEP from '../../components/fields/FieldsMEP/FieldsMEP.jsx'
import FieldsSafety from '../../components/fields/FieldsSafety/FieldsSafety.jsx'
import FieldsHR from '../../components/fields/FieldsHR/FieldsHR.jsx'
import FieldsEquipment from '../../components/fields/FieldsEquipment/FieldsEquipment.jsx'
import FieldsISO from '../../components/fields/FieldsISO/FieldsISO.jsx'
import FieldsOutro from '../../components/fields/FieldsOutro/FieldsOutro.jsx'
import '../../components/fields/fields-shared.css'

const SECTION_LABELS = [
  'Banner',
  'Tổng thầu D&B',
  'Xây dựng',
  'Cơ điện',
  'An toàn',
  'Nhân lực',
  'Thiết bị',
  'Chứng nhận',
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
  'paper',
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
        <FieldsConstruction active={index === 2} />
        <FieldsMEP active={index === 3} />
        <FieldsSafety active={index === 4} />
        <FieldsHR active={index === 5} />
        <FieldsEquipment active={index === 6} />
        <FieldsISO active={index === 7} />
        <FieldsOutro active={index === 8} />
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
