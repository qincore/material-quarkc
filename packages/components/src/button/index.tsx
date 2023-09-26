import { QuarkElement, customElement, property } from "quarkc";
import style from './style.less';

@customElement({
  tag: "test-button",
  style,
})
export class Button extends QuarkElement {
  @property()
  type: "elevated" | "filled";
  render() {
    return (
      <button onClick={() => console.log("456")}>
        <span class="md-shadow"></span>
        {this.type}
        <slot></slot>
      </button>
    );
  }
}
