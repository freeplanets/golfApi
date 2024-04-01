import { notCountingHole } from "../../database/db.interface";
import { CompetitionFormatTypeCheck } from "./cfif";

/**
 * 經多次改良，目前一般業餘賽大都採用呢個比較”完善”及”公平”的計算差點方法 :
完成比賽後，從18個洞中以抽籤形式抽出其中12個洞，將抽出12洞之桿數相加 (計算12個洞桿數總和時用2,3,4制度，計算超桿數目，Par 3洞最高計5桿，Par 4洞計7桿，Par 5洞計9桿等)。
將總和乘以 1.5，然後減去18 洞之標準桿數 ，以此數乘以 0.8 即為當日個人差點。
即係﹕(抽出12洞的總桿 x 1.5 – 18洞標準桿數) x 0.8 = 差點。
同樣地各球友將18洞所得的總桿數 ，減去當日差點 ，便得出淨桿分數，依淨桿分數高低排列出比賽名次。
即係﹕18洞總桿數 – 差點 = 淨桿。
備註﹕計算後之差點如果超出30以上者，一般皆以30計算 。淨桿分數相同者，則以差點較少的為勝出者，但如差點都相同就要計單數球道(1、3、5、7、9、11、13、15、17) 的總桿數，以低者為勝。
 */
export default class NewNewPeoria implements CompetitionFormatTypeCheck {
    private hasPars = [3, 4, 5];
    check(notCountingHoles: notCountingHole[]): boolean {
        const check = notCountingHoles.every((itm) => itm.fairways.length === 3 && itm.pars?.length === 3);
        if (check) {
            return notCountingHoles.every((holes) => holes.pars?.every((par) => this.hasPars.some((p) => p === par)));
        }
        return false;
    }
}