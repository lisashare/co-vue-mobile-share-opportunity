# webapp

## 搜索页面

### 问题：点击数据传递到message详情页

解决办法：编程式导航 + secssionStorage

## message详情页

### 问题：message组件中的图片，样式不能更改

 解决方案：

1、scoped属性导致css仅对当前组件生效（用css3的属性选择器+生成的随机属性实现的），而html绑定渲染出的内容可以理解为是子组件的内容，子组件不会被加上对应的属性，所以不会应用css.解决的话把scoped属性去掉就行了

2、而如果在组件中使用了v-html，要为news.dec中的标签添加CSS样式，我们需要在写样式的时候添加>>>

注意： table>内部的组件<tr is="row组件"></tr> ol>li ul>li select>option 

