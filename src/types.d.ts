interface MonthData {
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

export interface TableDataExpanded extends TableData {
  totalInShop: number;
}

export interface TotalMonths {
  [key: string]: number;
}

export interface TableInput {
  color?: string,
  weight?: string,
  backgroundColor?: string,
}



