import { z } from "zod";

/**
 * 工具定义接口
 */
export interface ToolDefinition {
  name: string;
  description: string;
  parameters?: z.ZodType<any>;
  handler: (...args: any[]) => Promise<any>;
}

/**
 * 工具注册表 - 存储所有已注册的装饰器
 */
const toolsRegistry = new Map<string, ToolDefinition>();

/**
 * 获取所有已注册的 tools
 */
export function getTools(): ToolDefinition[] {
  return Array.from(toolsRegistry.values());
}

/**
 * 获取指定名称的工具
 */
export function getTool(name: string): ToolDefinition | undefined {
  return toolsRegistry.get(name);
}

/**
 * @tool 装饰器 - 用于定义 Agent 工具
 *
 * @example
 * ```ts
 * const WeatherSchema = z.object({
 *   city: z.string().describe("城市名称"),
 * });
 *
 * // 方式1：装饰类
 * @tool("get-weather", "获取指定城市的天气信息", WeatherSchema)
 * class GetWeatherTool {
 *   async run({ city }: { city: string }) {
 *     return `天气晴朗，${city} 温度 25°C`;
 *   }
 * }
 *
 * // 方式2：装饰方法
 * @tool("web-search", "网络搜索工具")
 * async function webSearch(query: string) {
 *   return searchResults;
 * }
 * ```
 */
export function tool(
  name: string,
  description: string,
  parameters?: z.ZodType<any>
) {
  // 返回类装饰器
  return function <T extends new (...args: any[]) => any>(
    target: T,
    _context: ClassDecoratorContext
  ) {
    // 注册工具
    toolsRegistry.set(name, {
      name,
      description,
      parameters,
      handler: async (...args: any[]) => {
        const instance = new target();
        // 查找 run 方法并执行
        if (typeof instance.run === "function") {
          return instance.run(...args);
        }
        return undefined;
      },
    });

    return target;
  };
}

/**
 * @tools 装饰器 - 用于定义多个 Agent 工具
 *
 * @example
 * ```ts
 * @tools(
 *   {
 *     name: "tool-one",
 *     description: "工具1描述",
 *   },
 *   {
 *     name: "tool-two",
 *     description: "工具2描述",
 *   }
 * )
 * class MyTools {
 *   async toolOne() { ... }
 *   async toolTwo() { ... }
 * }
 * ```
 */
export function tools(
  ...configs: Array<{ name: string; description: string; parameters?: z.ZodType<any> }>
) {
  return function <T extends new (...args: any[]) => any>(
    target: T,
    _context: ClassDecoratorContext
  ) {
    // 将配置存储到类的元数据中
    const metadata = (target as any).toolConfigs || [];
    metadata.push(...configs);
    (target as any).toolConfigs = metadata;

    return target;
  };
}

export { z };

@tool("web-search", "网络搜索工具")
class WebSearchTool {
  async run(query: string) {
    // 搜索逻辑
    return results;
  }
}
