interface OptionDetail {
  label: string;
  value: string;
  moreDesc?: string;
}

type OptionSummary = OptionDetail;

export interface Tier {
  id: number | string;
}

export interface TierInfoProps {
  label?: string;
  detail?: string;
  onEdit?: () => void;
}

export interface TierOptionProps {
  id: number | string;
  title: string;
  tooltip: React.ReactNode;
  selected?: boolean;
  checked?: boolean;
  details: OptionDetail[];
  summary: OptionSummary;
  onSelectedValue?: (id: number | string | undefined) => void;
}

export default interface TierSelect {
  options: TierOptionProps[];
  value: Tier;
  open: boolean;
  onClose: () => void;
  onSelect: (value: TierOptionProps) => void;
}
