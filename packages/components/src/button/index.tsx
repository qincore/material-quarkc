import { QuarkElement, createRef, customElement, property } from "quarkc";
import style from "./style.less?inline";

export interface IButtonProps {
  type: "filled" | "outlined" | "text" | "elevated" | "tonal";
}

@customElement({
  tag: "md-button",
  style,
})
export class Button extends QuarkElement {
  @property({
    type: String,
  })
  type = "filled";

  @property({
    type: Boolean,
  })
  disabled = false;

  // buttonRef: { current: HTMLButtonElement } = createRef();

  // componentDidMount(): void {
  //   this.buttonRef.current.addEventListener("click", (e: Event) => {
  //     if (this.disabled) {
  //       e.stopPropagation();
  //     }
  //   });
  //   this.buttonRef.current.addEventListener("touchstart", () => {});
  // }
  render() {
    return (
      <button disabled={this.disabled}>
        <span class="md-shadow"></span>
        {!this.disabled && <md-ripple class="md-button-ripple"></md-ripple>}
        <span class="md-label-text">
          <slot></slot>
        </span>
      </button>
    );
  }
}
