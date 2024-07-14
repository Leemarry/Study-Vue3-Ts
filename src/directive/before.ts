// import { createApp } from 'vue';
// import App from './App.vue'
// // 注册一个全局自定义指令 `v-before`  
// app.directive('before', {  
//     // 当被绑定的元素插入到 DOM 中时……  
//     mounted(el, binding, vnode) {  
//       // 创建一个新的元素  
//       const newElement = document.createElement('div');  
//       // 设置新元素的属性或内容，这里仅作为示例  
//       newElement.textContent = '这是新添加的元素';  
//       // 可选：为新元素添加样式  
//       newElement.style.color = 'red';  
    
//       // 将新元素插入到当前元素之前  
//       // 注意：使用 parentNode 来找到当前元素的父节点  
//       if (el.parentNode) {  
//         el.parentNode.insertBefore(newElement, el);  
//       }  
//     },  
//     // 当绑定元素所在组件的 VNode 更新时，但也可能发生在其子 VNode 更新之前  
//     updated(el, binding, vnode, oldVnode) {  
//       // 这里可以根据需要更新新添加的元素  
//       // 例如，如果绑定值变化了，可以根据新值更新新元素的内容  
//       // 注意：由于每次更新都创建新元素可能不是最佳实践，这里只是展示如何操作  
//     },  
//     // 指令离开绑定元素时调用  
//     unmounted(el) {  
//       // 清理工作：如果需要，可以移除之前添加的元素  
//       // 注意：这里假设只添加了一个元素，并且没有保留对新元素的引用  
//       // 实际应用中，你可能需要保存对新元素的引用以便在这里移除它  
//       if (el.previousElementSibling && el.previousElementSibling.textContent === '这是新添加的元素') {  
//         el.parentNode?.removeChild(el.previousElementSibling);  
//       }  
//     }  
//   });