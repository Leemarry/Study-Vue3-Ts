
import { Directive,DirectiveBinding,VNode } from "vue";

 const hightlight : Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding,vnode:VNode) {
    console.log('yellow',binding,vnode);
    
    el.style.backgroundColor = binding.value;
  },
};

export default hightlight;