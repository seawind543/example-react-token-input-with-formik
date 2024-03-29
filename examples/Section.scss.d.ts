export type Styles = {
  section: string;
  "section-content": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
