import type { Directive,DirectiveBinding } from "vue";


interface ElType extends HTMLElement {
    // 扩展了 HTMLElement 接口的属性
    copyData: string | number;
    __handleClick__: any;
  }

  const focus: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        
    
    }
  }