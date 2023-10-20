import { QuarkElement, customElement, property } from "quarkc";
import style from './style.less?inline';

export interface IButtonProps {
  type: "filled" | "outlined" | "text" | "elevated" | "tonal"
}

@customElement({
  tag: "md-button",
  style,
})
export class Button extends QuarkElement {
  @property({
    type: String,
  })
  type = "filled"
  render() {
    return (
      <button onClick={() => console.log("456")}>
        <span class="md-shadow"></span>
        <md-ripple class="md-button-ripple"></md-ripple>
        <span class="md-label-text">
          <slot></slot>
        </span>
      </button>
    );
  }
}
