import { Input, Rank } from '@/components';
import { ITEMS } from '@/constant';
import type { ReactElement } from 'react';
import type { SEASONS } from '../useSeasons';
import useSeason from './useSeason';

const XP_PER_LEVEL = 5000;
const MAX_LEVEL = 268_435_455;

interface Properties {
  season: keyof typeof SEASONS;
}

function Season({ season }: Properties): ReactElement {
  const {
    state: { level, scrip, xp },
    actions: { onLevelChange, onScripChange, onXpChange }
  } = useSeason({ season });

  return (
    <div className='w-full'>
      <Rank key={season}>
        <Input
          name='Level'
          initialValue={level}
          icon='assets/pb.webp'
          max={Math.floor(MAX_LEVEL / XP_PER_LEVEL)}
          onChange={onLevelChange}
        />
        <Input
          name='Experience'
          initialValue={xp}
          label='XP'
          max={XP_PER_LEVEL - 1}
          onChange={onXpChange}
        />
        <Input
          name={ITEMS.SCRIP}
          icon={`assets/${ITEMS.SCRIP.toLowerCase()}.webp`}
          initialValue={scrip}
          max={0x0f_ff_ff_ff}
          onChange={onScripChange}
        />
      </Rank>
    </div>
  );
}
export default Season;
