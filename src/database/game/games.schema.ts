import { Schema } from "dynamoose";
import teeObjectSchema from "../zone/common/tee.schema";
import GameExtra from "./gameExtra.schema";

const GamesSchema = new Schema({
  gameid: {
    type: String,
    hashKey: true
  },
  siteid: {
    type: String,
    index: [
      {
        name: 'siteidcourseidGlobalIndex',
				type: 'global',
        // global: true,
        rangeKey: 'courseid',
      },
      {
        name: 'siteidesttimatedstarttimeGlobalIndex',
				type: 'global',
        // global: true,
        rangeKey: 'esttimatedStartTime',
      },
      {
        name: 'siteidstatusGlobalIndex',
				type: 'global',
        // global: true,
        rangeKey: 'status',
      },
      {
        name: 'siteidrefkeyGlobalIndex',
        type: 'global',
        rangeKey: 'refKey',
      }      
    ]
  },
  courseid: {
    type: String,
    index: {
			type: 'global',
      //global: true
    }
  },
  outZone: {
    type: String
  },
  inZone: {
    type: String
  },
  stepInZone: {
    type: String
  },
  stepInFairway: {
    type: Number
  },
  carts: {
    type: Array,
    schema: [String],
  },
  par: {
    type: Number
  },
  rating: {
    type: Number
  },
  slope: {
    type: Number
  },
  esttimatedStartTime: {
    type: Number
  },
  startTime: {
    type: Number
  },
  endTime: {
    type: Number
  },
  players: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          playerName: {
            type: String,
          },
          hcp: {
            type: String
          },
          tee: {
            type: Object,
            schema: teeObjectSchema,
          },
          playerOrder: {
            type: Number
          },
          gross: {
            type: Number
          },
          frontGross: {
            type: Number,
          },
          backGross: {
            type: Number,
          },
          parDiff: {
            type: Number,
          },
          stablefordPoint: {
            type: Number,
          },
          holes: {
            type: Array,
            schema: [
              {
                type: Object,
                schema: {
                  holeNo: {
                    type: Number,
                  },
                  zoneid: {
                    type: String,
                  },
                  fairwayno: {
                    type: Number,
                  },
                  handicap: {
                    type: Number,
                  },
                  par: {
                    type: Number,
                  },
                  gross: {
                    type: Number,
                  },
                  parDiff: {
                    type: Number,
                  },
                  extraInfo: {
                    type: Object
                  }
                }
              }
            ]
          },
          extra: {
            type: Object
          }
        }
      }
    ]
  },
  caddies: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          caddieid: {
            type: String
          },
          caddieName: {
            type: String
          }
        }
      }
    ]
  },
  playerDefaults: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          playerName: {
            type: String
          },
          tee: {
            type: String
          },
          fullHcp: {
            type: String
          },
          allowance: {
            type: String
          },
          hcp: {
            type: String
          },
          hcpRound: {
            type: Boolean,
            default: false,
          },
          selected: {
            type: Boolean,
            default: true,
          },
          betterballGroup: {
            type: String,
            default: '',
          },
          playOrder: {
            type: String,
            default: '',
          }
        }
      }
    ]
  },
  sideGames: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          sideGameName: {
            type: String
          },
          format: {
            type: String
          },
          wager: {
            type: Number
          },
          wagerMax: {
            type: Number,
            required: false,
          },
          carryOver: {
            type: Boolean,
            required: false,
          },
          hcpType: {
            type: String
          },
          playerGameData: {
            type: Array,
            schema: [
              {
                type: Object,
                schema: {
                  selected: {
                    type: Boolean
                  },
                  playerName: {
                    type: String
                  },
                  hcp: {
                    type: String
                  },
                  betterballGroup: {
                    type: String
                  },
                  points: {
                    type: Number,
                  },
                  playOrder: {
                    type: Number,
                  },
                  holes: {
                    type: Array,
                    schema: [
                      {
                        type: Object,
                        schema: {
                          holeNo: {
                            type: Number
                          },
                          zoneid: {
                            type: String
                          },
                          fairwayno: {
                            type: Number
                          },
                          gross: {
                            type: Number
                          },
                          extraInfo: {
                            type: Object
                          }
                        }
                      }
                    ]
                  },
                  extraInfo: {
                    type: Object,
                  }
                }
              }
            ]
          },
          extraInfo: {
            type: Object,
          }
        }
      }
    ]
  },
  gameTitle: {
    type: String,
  },
  refKey: {
    type: String,
  },
  extra: {
    type: Object,
  },
  status: {
    type: Number,
  }
}, { timestamps: true, saveUnknown: ["extra.**", "players.**", "sideGames.**"] });
export default GamesSchema;