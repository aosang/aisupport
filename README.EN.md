[中文](./README.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[English](./README.EN.md)

## AISupport

An **embeddable widget + admin dashboard** for customer support: visitors chat via a script-loaded component on your site.

**Live demo:** [AISupport](https://app.wangle.run)

---

### Features

**Visitor side:** Add a lightweight support entry to your site without heavy setup—visitors can start a chat from your homepage.

**Admin side:** Your team handles conversations, updates status, and can take over manually. Upload and maintain knowledge-base content. Tune AI tone and onboarding copy. Advanced features (e.g. voice plugins) are available with a subscription.

### Embedding

- Copy the embed snippet from the admin dashboard and paste it into your site’s HTML (usually before `</body>`).

- `data-position` supports `bottom-right` and `bottom-left` (corner of the floating button).

```html
<script 
  src="https://cdn.example.com/widget.js" 
  data-organization-id="your organization id"
  data-position="bottom-right"
>
</script>
```

- A floating button appears in the chosen corner; click it to open the chat panel.

<img src="https://www.wangle.run/images/widget-show.gif" width="260" />
