import { notCountingHole } from "../../database/db.interface";

export interface CompetitionFormatTypeCheck {
    check(notCountingHoles:notCountingHole[]):boolean;
}
