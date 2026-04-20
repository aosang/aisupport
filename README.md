### AISupport

面向客服场景的 **可嵌入组件 + 管理端**：访客通过脚本加载组件聊天

**在线演示：**： [AISupport](https://app.wangle.run)

---

### 功能简介

客户端：帮助企业快速搭建快速在线客服入口：无需要做复杂配置，打开企业官网即可发起咨询。

管理端：后台团队统一处理会话，更新处理状态/人工介入会话。上传维护知识库资料。调整AI话术及引导内容。
支持通过开启订阅解锁进阶能力（语音插件等...）

### 使用方式

- 在管理端后台复制嵌入代码, 将它粘贴到前端HTML页面中, data-position的可选值，目前支持
bottom-right/bottom-left(左下角或右下角)


```HTML
<script 
  src="https://cdn.example.com/widget.js" 
  data-organization-id="your organization id"
  data-position="bottom-right"
>
</script>
```

- 页面右下角（或左下角）会出现悬浮按钮，点击展开聊天窗口

<img src="https://www.wangle.run/images/widget-show.gif" width="260" />