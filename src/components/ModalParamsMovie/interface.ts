import { ConsultParamsProps } from "../../pages/Home/interface";

export interface ModalParamsMovieProps {
    consultParams: ConsultParamsProps;
    setOpenModal(value: boolean): void;
    consultMovies(value?: null | ConsultParamsProps): void;
    setConsultParams(value: ConsultParamsProps): void
};