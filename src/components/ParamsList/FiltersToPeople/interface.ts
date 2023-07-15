import { ParamsListPeopleProps } from './../interfaces';

export interface FiltersToPeopleProps {
    isMobile: boolean;
    consultParams: ParamsListPeopleProps['consultParams'];
    setConsultParams: ParamsListPeopleProps['setConsultParams'];
}