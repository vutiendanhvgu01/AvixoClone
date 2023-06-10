interface AvixoImageAnnotateProps {
  imgUrl: string;
}

export interface AnnotateToolbarProps {
  canvas: any;
  imgUrl: string;
  handleState: (canvasObject: string) => void;
  state: string[];
  setMod: (val: number) => void;
  mod: number;
}

export default AvixoImageAnnotateProps;
