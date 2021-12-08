import { OrganizationIcon, PeopleIcon, LawIcon } from '@primer/octicons-react';

export const Delta7Icon = () => (
    <div className='Icons'>
        <LawIcon size={16} fill='#fff' />
        <span className='foreground-white'>7D</span>
    </div>
);

export const PerLakhIcon = () => (
    <div className='Icons'>
        <PeopleIcon size={16} fill='#fff' />
        <span className='foreground-white'>1L</span>
    </div>
);

export const DistrictIcon = () => (
    <div className='Icons'>
        <OrganizationIcon size={16} fill='#fff' />
    </div>
);
