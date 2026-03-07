# adapter 适配示例

## 这个 adapter 的作用

`ANTHROPIC_PROTOCOL_ADAPTER` 用于把项目里的统一模型调用配置，映射到 Anthropic 原生协议需要的：

- 请求路径格式
- 请求头鉴权格式

这样业务层不需要关心不同厂商的 URL 和 Header 差异，只需要根据 `protocol` 选择对应 adapter 即可。

## resolveChatCompletionsPath 的作用

`resolveChatCompletionsPath(baseUrl)` 负责生成 Anthropic 消息接口地址：

1. 先去掉 `baseUrl` 末尾多余的 `/`
2. 再拼接 `/v1/messages`

示例：

- 输入：`https://api.anthropic.com/`
- 输出：`https://api.anthropic.com/v1/messages`

## resolveHeaders 的作用

`resolveHeaders(apiKey)` 负责生成请求头：

- `x-api-key: <apiKey>`：Anthropic 的 API Key 鉴权头
- `Content-Type: application/json`：声明 JSON 请求体

## 适配调用示例

```ts
import { ANTHROPIC_PROTOCOL_ADAPTER } from "./anthropic-adapter"

const baseUrl = "https://api.anthropic.com/"
const apiKey = "sk-ant-xxxx"

const requestUrl = ANTHROPIC_PROTOCOL_ADAPTER.resolveChatCompletionsPath(baseUrl)
const headers = ANTHROPIC_PROTOCOL_ADAPTER.resolveHeaders(apiKey)

console.log(requestUrl)
// https://api.anthropic.com/v1/messages

console.log(headers)
// {
//   "x-api-key": "sk-ant-xxxx",
//   "Content-Type": "application/json"
// }
```

## 通过协议注册表获取 adapter（推荐）

```ts
import { getProtocolAdapter } from "./index"

const adapter = getProtocolAdapter("anthropic")
const url = adapter.resolveChatCompletionsPath("https://api.anthropic.com")
const headers = adapter.resolveHeaders("sk-ant-xxxx")
```

`adapter` 的输出结构示例：

```ts
{
  protocol: "anthropic",
  resolveChatCompletionsPath: (baseUrl: string) => string,
  resolveHeaders: (apiKey: string) => Record<string, string>
}
```

如果直接打印关键结果，可得到：

```ts
console.log(adapter.protocol)
// anthropic

console.log(
  adapter.resolveChatCompletionsPath("https://api.anthropic.com/")
)
// https://api.anthropic.com/v1/messages

console.log(adapter.resolveHeaders("sk-ant-xxxx"))
// {
//   "x-api-key": "sk-ant-xxxx",
//   "Content-Type": "application/json"
// }
```
