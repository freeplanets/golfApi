import StrokePlay from "./StrokePlay";

/**
 * 六局比桿賽 Sixes
每6局更換分組。本質上是三個獨立的投注。 投注前6洞（第 1-6 洞）、中6洞（第 7-12 洞）及後6洞（第 13-18 洞）的最佳桿數。
可以根據球員差點之間的差異，依讓分規則計算。
 */
export default class Sixes extends StrokePlay {}