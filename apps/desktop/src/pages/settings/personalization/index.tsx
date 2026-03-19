import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ConfigTitle } from '@/components/setting/config-title'
import { SettingsCard } from '@/components/setting/settings-card'
import { SettingsRow } from '@/components/setting/settings-row'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Slider } from '@/components/ui/slider'
import { CodeDiffViewer } from '@/components/code-diff-viewer'

type ThemeMode = 'light' | 'dark' | 'system'

const oldCode = `const themePreview: ThemeConfig = {
  surface: "sidebar",
  accent: "#2563eb",
  contrast: 42,
};`

const newCode = `const themePreview: ThemeConfig = {
  surface: "sidebar-elevated",
  accent: "#0ea5e9",
  contrast: 68,
};`

export default function SettingsPersonalizationPage() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  const [accentColor, setAccentColor] = useState('#0285FF')
  const [translucentSidebar, setTranslucentSidebar] = useState(true)
  const [contrast, setContrast] = useState(45)
  const [usePointerCursor, setUsePointerCursor] = useState(true)

  return (
    <>
      <section>
        <ConfigTitle>外观</ConfigTitle>
        <SettingsCard>
          <SettingsRow
            title='主题'
            description='使用浅色或深色模式'
            noBorder
            control={
              <ToggleGroup
                type='single'
                value={themeMode}
                onValueChange={(value) => {
                  if (value) setThemeMode(value as ThemeMode)
                }}
                className='rounded-full bg-muted/30 p-0.5'
              >
                <ToggleGroupItem
                  value='light'
                  className='h-6 rounded-full px-2.5 text-[12px] first:rounded-full last:rounded-full data-[state=on]:bg-muted'
                >
                  <Sun className='h-3 w-3' />
                  浅色
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='dark'
                  className='h-6 rounded-full px-2.5 text-[12px] first:rounded-full last:rounded-full data-[state=on]:bg-muted'
                >
                  <Moon className='h-3 w-3' />
                  深色
                </ToggleGroupItem>
              </ToggleGroup>
            }
          />
          {/* Code Preview */}
          <CodeDiffViewer
            oldCode={oldCode}
            newCode={newCode}
            mode='split'
            className='w-full p-3'
            language='js'
          />
          <SettingsRow
            title='强调色'
            description='应用界面的强调色'
            control={
              <div className='flex items-center gap-1.5'>
                <Input
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className='h-7 w-20 text-center text-[12px] font-mono uppercase'
                />
              </div>
            }
          />
          <SettingsRow
            title='半透明侧边栏'
            description='侧边栏使用半透明效果'
            control={
              <Switch
                checked={translucentSidebar}
                onCheckedChange={setTranslucentSidebar}
                className='h-5 w-8 data-[state=checked]:bg-[#0A84FF]'
              />
            }
          />
          <SettingsRow
            title='对比度'
            description='调整界面元素的对比度'
            noBorder
            control={
              <div className='flex items-center gap-2'>
                <Slider
                  value={[contrast]}
                  onValueChange={(v) => setContrast(v[0])}
                  min={0}
                  max={100}
                  className='w-24'
                />
                <span className='w-8 text-right text-[12px] text-muted-foreground'>
                  {contrast}
                </span>
              </div>
            }
          />
        </SettingsCard>
      </section>

      <section>
        <ConfigTitle>字体</ConfigTitle>
        <SettingsCard>
          <SettingsRow
            title='无衬线字体'
            description='调整界面使用的字体'
            control={
              <div className='grid w-full grid-cols-[66px_auto_1fr] gap-1.5 md:w-[318px]'>
                <Input
                  value='13'
                  readOnly
                  className='h-7 text-center text-[12px]'
                />
                <div className='flex items-center text-[12px] text-muted-foreground'>
                  px
                </div>
                <Input
                  value='-apple-system, BlinkMacSystemFont, Segoe UI'
                  readOnly
                  className='h-7 text-[12px]'
                />
              </div>
            }
          />
          <SettingsRow
            title='代码字体'
            description='调整对话和差异中代码使用的字体和大小'
            noBorder
            control={
              <div className='grid w-full grid-cols-[66px_auto_1fr] gap-1.5 md:w-[318px]'>
                <Input
                  value='13'
                  readOnly
                  className='h-7 text-center text-[12px]'
                />
                <div className='flex items-center text-[12px] text-muted-foreground'>
                  px
                </div>
                <Input
                  value='ui-monospace, SFMono-Regular, Menlo'
                  readOnly
                  className='h-7 text-[12px]'
                />
              </div>
            }
          />
        </SettingsCard>
      </section>

      <section>
        <ConfigTitle>光标</ConfigTitle>
        <SettingsCard>
          <SettingsRow
            title='使用指针光标'
            description='悬停在交互元素上时将光标改为指针'
            noBorder
            control={
              <Switch
                checked={usePointerCursor}
                onCheckedChange={setUsePointerCursor}
                className='h-5 w-8 data-[state=checked]:bg-[#0A84FF]'
              />
            }
          />
        </SettingsCard>
      </section>
    </>
  )
}
