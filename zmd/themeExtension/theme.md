
<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- TOC -->

- [sass与类样式混合使用](#sass与类样式混合使用)
    - [css](#css)
    - [sass](#sass)
        - [sass样式 类样式](#sass样式-类样式)
        - [sass样式 元素属性](#sass样式-元素属性)
- [跟随系统主题](#跟随系统主题)

<!-- /TOC -->
<br/>
<strong>:root</strong>是一个 CSS 选择器，它用于选择文档的根元素，即 <html> 元素。在 :root 选择器内部定义的 CSS 变量（也称为 CSS 自定义属性）可以被整个文档中的任何元素访问和使用。
~~~css
:root {
    --theme_bgColor: #e71010;
}


.full-container {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: var(--theme_bgColor);
}
~~~


<strong>获取样式</strong>
~~~javascript

  let root = document.documentElement; // 获取文档的根元素  
  let style = getComputedStyle(root); // 获取根元素的计算样式  
  let bgColor = style.getPropertyValue('--theme_bgColor'); // 获取CSS变量的值  
  console.log(bgColor); // 输出: #00f500
~~~

 <strong>样式设置</strong>
~~~javascript
  let root = document.documentElement;
  root.style.setProperty('--theme_bgColor', '#00f500');
~~~




## sass与类样式混合使用

> 1.每一个主题主题只有（背景颜色与字体颜色）

### css
1.设置主题样式
~~~css
div[theme="highlight"] {
  color: rgb(35, 208, 23);
  background-color: yellow;
}

div[theme="dark"] {
  color: white;
  background-color: black;
}
~~~
2.页面
~~~html
<div  id="myDiv" theme="highlight">你好</div>
<button id="switchTheme">切换主题</button>  
~~~

3.js切换主题
~~~js

var switchThemeButton = document.getElementById('switchTheme');  
// 为按钮添加点击事件监听器  
switchThemeButton.addEventListener('click', switchTheme);
// 切换主题的函数  
function switchTheme() {  
  // 切换theme属性的值  
  var myDiv = document.getElementById('myDiv') as HTMLElement;  
  var currentTheme = myDiv.getAttribute('theme');  
  var newTheme = currentTheme === 'highlight' ? 'dark' : 'highlight';  
    
  // 设置新的theme属性值并应用相应的样式  
  myDiv.setAttribute('theme', newTheme);  

} 

~~~

### sass

#### sass样式 类样式
4.sass样式设置

~~~scss
// 定义theme样式map  
$themes: (  
  "highlight": (  
    color: rgb(35, 208, 23),  
    background-color: yellow  
  ),  
  "dark": (  
    color: white,  
    background-color: black  ,
    // font-size:20px,
  ),  
  // ... 可以继续添加其他theme  
);  
  
// 定义一个函数来生成样式规则  
@function theme-styles($theme-name) {  
  @return map-get(map-get($themes, $theme-name), color) + ", " + map-get(map-get($themes, $theme-name), background-color);  
}  
  
// 使用@each遍历map来生成静态的CSS类  
@each $theme-name, $theme-styles in $themes {  
  .theme-#{$theme-name} {  
    color: map-get($theme-styles, color);  
    background-color: map-get($theme-styles, background-color);  
  }  
}  
// 等效于：  
// .theme-highlight {  
//   color: rgb(35, 208, 23);  
//   background-color: yellow;  
// }  
  
// .theme-dark {  
//   color: white;  
//   background-color: black;  
// }  

~~~

5.JS切换主题

~~~javascript
 div.classList.add(theme); // 将该值作为类名添加到元素上  
~~~


#### sass样式 元素属性
> 通过 dom 元素属性来切换主题 <strong>theme="highlight"</strong>

1. html
~~~ html 
<div   theme="highlight">你好</div>
~~~

2.sass样式
<br>
主题文件：[cs.scss](./cs.scss)

3.每一个主题主题含有样式不确定  
 <br>
 主题文件：[cs3.scss](./cs3.scss) 

## 跟随系统主题


~~~javascript

   const match=    matchMedia('(prefers-color-scheme:dark)')
   console.log(match,'match');
   const currentTheme = matchMedia.matches ?  'drak': 'light'

     // 监听主题变更
  match.onchange = function () {
    console.log('match监听主题变更');
    
    // changeTheme(THEME_SYSTEM)
  }
  
~~~











