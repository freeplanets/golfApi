import StrokePlay from "./StrokePlay";

/**
 * 打海珊(Hessein)
海珊賽法是同組球友在一洞開球時以第二順位的球友當「海珊」，
當海珊的人在該洞與其他球友比輸贏（例如，同組是三位，是一對二；同組是四位，則是一對三），
亦即，一洞結束後，海珊的桿數乘2（或乘3），與其他球友的桿數總合比較，
如海珊打了4桿，其他三位分別為4、4、5桿，則海珊是4乘3為12桿，其他三位的總合是13桿，海珊分別贏三位球友1點；
如海珊是5桿，其餘一樣是4、4、5桿，則是15桿對13桿，海珊要輸其他球友各2點。
賽程中，海珊的人選並非固定的，每一洞結束後，當洞擊球桿數排名第二（如桿數相同，則以開球順序為準）的球友自動成為下一洞的海珊。
假使在某洞平手且打球順序不變時，當「海珊」的球友延續擔任，但在下一洞的輸贏點數加倍；若再相同時，在下下一洞再加倍，餘依此類推。
 */
export default class Hessein extends StrokePlay {}