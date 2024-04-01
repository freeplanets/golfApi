import { notCountingHole } from "../../database/db.interface";
import { CompetitionFormatTypeCheck } from "./cfif";

/**
 * 同貝利亞及雙貝利亞相反，新貝利亞以相反之方式計：
從 18 洞裏的３桿洞，４桿洞及５桿洞中各抽取２個洞，共６個洞不計算分數，再將餘下的12個洞打出之桿數相加起來乘 1.5 (計算12個洞桿數總和時用2,3,4制度，計算超桿數目，Par 3洞最高計5桿，Par 4洞計7桿，Par 5洞計9桿等)，減去該球場之標準桿數，然後乘以 0.8 ，即為當日差點。

由於球場通常包括 10個４桿洞，４個５桿洞及４個３桿洞，如果依此方法各抽出２個洞不計分數，4桿洞的成績對差點無疑影響很大；另外只要你在計算差點的12個洞中打出高桿數，高桿數計算後會產生高差點，總桿數減去高差點，便是低桿數，這樣你反而會得到好成績，於是有時候似乎不能反映出真正的技術水平，勝出亦多少靠點好運氣。
 */
export default class NewPeoria implements CompetitionFormatTypeCheck {
    private hasPars = [3, 4, 5];
    check(notCountingHoles: notCountingHole[]): boolean {
        const check = notCountingHoles.every((itm) => itm.fairways.length === 3 && itm.pars?.length === 3);
        if (check) {    
            return this.hasPars.every((par) => notCountingHoles.find((itm) => itm.pars?.some((p) => p === par)));
        }
        return false;
    }
}