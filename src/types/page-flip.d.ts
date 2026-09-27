// Minimal typings for page-flip@2.0.7 (the package ships no .d.ts).
declare module "page-flip" {
  export type FlipCorner = "top" | "bottom";
  export type Orientation = "portrait" | "landscape";

  export interface FlipSetting {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    startPage?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    swipeDistance?: number;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    disableFlipByClick?: boolean;
    showPageCorners?: boolean;
  }

  export interface WidgetEvent<T = unknown> {
    data: T;
    object: PageFlip;
  }

  export class PageFlip {
    constructor(element: HTMLElement, setting: FlipSetting);
    // The README says loadFromHtml; the shipped bundle uses loadFromHTML.
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    loadFromImages(images: string[]): void;
    on(event: "flip", cb: (e: WidgetEvent<number>) => void): PageFlip;
    on(event: "changeOrientation", cb: (e: WidgetEvent<Orientation>) => void): PageFlip;
    on(event: "changeState", cb: (e: WidgetEvent<string>) => void): PageFlip;
    on(event: "init" | "update", cb: (e: WidgetEvent<{ page: number; mode: Orientation }>) => void): PageFlip;
    off(event: string): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
    getOrientation(): Orientation;
    turnToPage(pageNum: number): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    flipNext(corner?: FlipCorner): void;
    flipPrev(corner?: FlipCorner): void;
    flip(pageNum: number, corner?: FlipCorner): void;
    update(): void;
    destroy(): void;
  }
}
