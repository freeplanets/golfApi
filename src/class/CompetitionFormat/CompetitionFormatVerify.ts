import { CompetitionFormatType } from "../../models/enum";
import { notCountingHole } from "../../database/db.interface";
import NewNewPeoria from "./NewNewPeoria";
import NewPeoria from "./NewPeoria";

export default class CompetitionFormatVerify {
    verify(notCountingHoles:notCountingHole[], cfType:CompetitionFormatType): boolean {
        let isPassed = false;
        switch(cfType) {
            case CompetitionFormatType.NEW_PEORIA:
                isPassed = new NewPeoria().check(notCountingHoles);
                break;
            case CompetitionFormatType.NEW_NEW_PEORIA:
                isPassed = new NewNewPeoria().check(notCountingHoles);
                break;
        }
        return isPassed;
    }
}