export interface MonthData {
  id: string;
  name: string;
  value: number;
}

export interface StoreData {
  id: number;
  name: string;
}

export interface TableData {
  store: StoreData;
  months: MonthData[];
}

// export interface Budget {
//   store: StoreData;
//   months: {
//     name: string,
//     value: number
//   }[],
//   totalInShop: number
// }


