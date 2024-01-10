import { gameTitle } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";

export default class GTResQuery extends commonResponse implements commonResWithData<gameTitle[]> {

}