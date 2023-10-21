import {
  QuarkElement,
  createRef,
  customElement,
  property,
  state,
} from "quarkc";
import style from "./style.less?inline";
import { isMobile, addClassName, removeClassName } from "../utils";
import { queryParentNode } from "../utils/queryParentNode";

@customElement({
  tag: "md-ripple",
  style,
})
class Ripple extends QuarkElement {
  @property({
    type: String,
  })
  for: string;

  @state()
  isHover = false;

  @state()
  forRef: HTMLElement;

  @state()
  ripples = [] as HTMLElement[];

  rippleRef: { current: HTMLDivElement } = createRef();

  componentDidMount(): void {
    if (this.for) {
      this.forRef = this.querySelector(this.for);
    }

    if (!this.for && this.rippleRef) {
      this.forRef = queryParentNode(this.rippleRef.current);
      console.log(this.forRef);
    }
  }

  createRipple = (e) => {
    addClassName(this.forRef, ["md-pressed"]);
    const rect = this.forRef.getBoundingClientRect();
    const clientX = e.clientX || e.changedTouches[0].clientX;
    const clientY = e.clientY || e.changedTouches[0].clientY;

    const radius = this.findFurthestPoint(
      clientX,
      this.forRef.offsetWidth,
      rect.left,
      clientY,
      this.forRef.offsetHeight,
      rect.top
    );

    const ripple = document.createElement("span");
    addClassName(ripple, ["md-ripple-effect"]);
    ripple.style.left = clientX - rect.left - radius + "px";
    ripple.style.top = clientY - rect.top - radius + "px";
    ripple.style.width = ripple.style.height = radius * 2 + "px";
    this.ripples.push(ripple);
    this.rippleRef.current.appendChild(ripple);
  };

  removeRipple = (e) => {
    if (e.type === "mouseleave" && !isMobile()) {
      removeClassName(this.forRef, ["md-hovered"]);
    }
    removeClassName(this.forRef, ["md-pressed"]);
    if (this.ripples) {
      this.ripples.forEach((ripple) => {
        const timerOp = setTimeout(() => {
          ripple.style.opacity = "0";
          clearTimeout(timerOp);
        }, 200);

        const timeRe = setTimeout(() => {
          ripple.remove();
          clearTimeout(timeRe);
        }, 1000);
      });
    }
  };

  onMouseEnter = (e) => {
    if (isMobile()) {
      return;
    }
    addClassName(this.forRef, ["md-hovered"]);
  };

  findFurthestPoint = (
    clickPointX: number,
    elementWidth: number,
    offsetX: number,
    clickPointY: number,
    elementHeight: number,
    offsetY: number
  ) => {
    let x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
    let y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
    let d = Math.hypot(
      x - (clickPointX - offsetX),
      y - (clickPointY - offsetY)
    );
    return d * 1.8;
  };

  render() {
    return (
      <div
        class="md-ripple"
        ref={this.rippleRef}
        onMouseEnter={this.onMouseEnter}
        onPointerDown={!isMobile() && this.createRipple}
        onTouchStart={this.createRipple}
        onPointerUp={this.removeRipple}
        onMouseLeave={this.removeRipple}
        onDragLeave={this.removeRipple}
        onTouchMove={this.removeRipple}
        onTouchEnd={this.removeRipple}
        onTouchCancel={this.removeRipple}
      ></div>
    );
  }
}

export default Ripple;
