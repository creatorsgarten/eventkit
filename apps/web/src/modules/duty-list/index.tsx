import { useMemo } from 'react'
import tw from 'twin.macro'

import { DutyGroup, DutyListProps, DutyListSection } from './DutyRenderer'

import { sortDuty } from './utils/sort-duty'

interface Props extends DutyListProps {
  slot: number | null
}

const Title = tw.div`text-left mb-4 text-sm sm:text-base font-thin text-gray-300`

export const DutyList = (props: Props) => {
  const { slot, duties } = props

  const { now, past, upcoming } = useMemo(() => {
    if (!duties) return { now: [], past: [], upcoming: [] }

    // Exclude empty duties.
    const list = duties.filter((d) => d.title).sort(sortDuty)

    // Group the duties based on time slot.
    const now = list.filter((d) => d.slot === slot)
    const past = list.filter((d) => slot === null || d.slot < slot)
    const upcoming = list.filter((d) => slot !== null && d.slot > slot)

    return { now, past, upcoming }
  }, [duties, slot])

  if (!duties) return null

  return (
    <div tw="flex flex-col space-y-8">
      {now.length > 0 && (
        <div>
          <Title>งานปัจจุบัน</Title>

          <DutyGroup duties={now} />
        </div>
      )}

      {upcoming.length > 0 && (
        <div>
          <Title>งานถัดไป</Title>

          <div>
            <DutyListSection duties={upcoming} />
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <Title>งานที่ผ่านมา</Title>

          <DutyListSection duties={past} />
        </div>
      )}
    </div>
  )
}
