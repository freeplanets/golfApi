import { scoreLine } from "../../function/func.interface";
import StrokePlay from "./StrokePlay";

/**
 * 拉斯維加斯 (Las Vegas)
這是4人遊戲。第1洞開球出去後，依遠近分出1,2,3,4名，弟1洞的組合就是1和4同組，2和3同組。
有別於計算個人桿數，得分以同組兩人桿數的組合，桿數少的排前面(十位)，桿數多的排後面(個位)，來計算分數。
例如是PAR4的洞，1(A先生)打5桿，2(B)打6桿，3(C)打4桿，4(D)打4桿。1,4那組得分45，2,3那組得分46。得分少的為贏。
表示1,4那組各贏1點，2,3那組各輸1點。下1洞的組合，將會因本洞的桿數有所變動，以成績好的往後排。
桿數相同時，依上1洞的優先序。所以第2洞的組合排序C.D.A.B，變成C和B同一組，D和A同一組。
當有桿數10桿或以上時，桿數多的排前面，例如1個打11桿，1個打4桿，得分為114。
另，當有小鳥或更好成績出現時，對方要翻牌，即，桿數多的排前面。
 */
export default class LasVegas extends StrokePlay {
	protected getResult(): { title: scoreLine; total: scoreLine; scoreLines: scoreLine[]; } {
		const res = super.getResult();
		const startHoleNo = this.sg.extraInfo.startHoleNo as number | 1;
		return res;
	}
}