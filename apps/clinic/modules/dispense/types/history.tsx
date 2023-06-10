interface DispensingHistoryItemProps {
  id: number;
  detail: string;
  by: string;
  date: string;
}

export interface DispensingHistoryProps {
  showHistory: boolean;
  setShowHistory: (value: boolean) => void;
  items: DispensingHistoryItemProps[];
}
