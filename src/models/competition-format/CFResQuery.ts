import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import CompetitionFormatModel from "./CompetitionFormat";

export default class CFResQuery extends commonResponse implements commonResWithData<CompetitionFormatModel[]> {}