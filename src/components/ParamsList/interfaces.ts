import { ConsultParamsProps } from "../../pages/Home/interface";

export interface ParamsListPeopleProps {
    isMobile?: boolean;
    typeList: string;
    consultParams: ConsultParamsProps;
    setOpenModal(value: boolean): void;
    setConsultParams(value: ConsultParamsProps): void
};