import { Schema } from "dynamoose";

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
    schema: String,
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
            type: String
          },
          hcp: {
            type: String
          },
          tee: {
            type: String
          },
          playerOrder: {
            type: Number
          },
          gross: {
            type: Number
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
            type: Number
          },
          hcp: {
            type: String
          },
          hcpRound: {
            type: Boolean,
            default: false,
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
                    type: Number
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
                  }
                }
              }
            ]
          }
        }
      }
    ]
  }
}, { timestamps: true, saveUnknown: ["players.**"] });
export default GamesSchema;