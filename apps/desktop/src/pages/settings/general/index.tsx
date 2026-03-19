import * as React from 'react'
import { Laptop, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ConfigTitle } from '@/components/setting/config-title'
import { SettingsCard } from '@/components/setting/settings-card'
import { SettingsRow } from '@/components/setting/settings-row'
import { PillSelect } from '@/components/setting/pill-select'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type FollowUpMode = 'queue' | 'steer'
type ThemeMode = 'light' | 'dark' | 'system'

export default function SettingsGeneralPage() {
  const [language, setLanguage] = React.useState('en-us')
  const [threadDetail, setThreadDetail] = React.useState('steps-with-code')
  const [preventSleep, setPreventSleep] = React.useState(false)
  const [requireMetaEnter, setRequireMetaEnter] = React.useState(false)
  const [followUpMode, setFollowUpMode] = React.useState<FollowUpMode>('queue')
  const [themeMode, setThemeMode] = React.useState<ThemeMode>('light')
  const [opaqueWindow, setOpaqueWindow] = React.useState(false)
  const [usePointerCursor, setUsePointerCursor] = React.useState(true)
  const [completionNotify, setCompletionNotify] = React.useState('unfocused')
  const [permissionNotifications, setPermissionNotifications] =
    React.useState(true)

  return (
    <>
      <section>
        <ConfigTitle>通用</ConfigTitle>
        <SettingsCard>
          <SettingsRow
            title='默认打开位置'
            description='文件和文件夹的默认打开位置'
            control={
              <Button
                variant='secondary'
                className='h-7 w-full justify-start gap-2 rounded-full px-3 text-[12px] md:w-[212px]'
              >
                <span className='inline-grid size-5 place-items-center rounded-full bg-black text-[10px] font-semibold text-white'>
                  C
                </span>
                Cursor
              </Button>
            }
          />
          <SettingsRow
            title='语言'
            description='应用界面语言'
            control={
              <PillSelect
                value={language}
                onValueChange={setLanguage}
                items={[{ value: 'en-us', label: 'English (United States)' }]}
              />
            }
          />
          <SettingsRow
            title='对话详情'
            description='选择在对话中显示多少命令输出'
            control={
              <PillSelect
                value={threadDetail}
                onValueChange={setThreadDetail}
                items={[
                  { value: 'steps-with-code', label: '带代码命令的步骤' }
                ]}
                widthClassName='w-full md:min-w-[248px]'
              />
            }
          />
          <SettingsRow
            title='运行时阻止休眠'
            description='在运行对话时保持电脑处于唤醒状态'
            control={
              <Switch
                checked={preventSleep}
                onCheckedChange={setPreventSleep}
                className='h-5 w-8 data-[state=checked]:bg-[#0A84FF]'
              />
            }
          />
          <SettingsRow
            title='需要 Cmd + Enter 发送长提示词'
            description='启用后，多行提示词需要按 Cmd + Enter 发送'
            control={
              <Switch
                checked={requireMetaEnter}
                onCheckedChange={setRequireMetaEnter}
                className='h-5 w-8 data-[state=checked]:bg-[#0A84FF]'
              />
            }
          />
          <SettingsRow
            title='后续行为'
            description='在运行时队列后续消息或引导当前运行。按 Shift+Cmd+Enter 可对单条消息执行相反操作'
            noBorder
            control={
              <ToggleGroup
                type='single'
                value={followUpMode}
                onValueChange={(value) => {
                  if (value) setFollowUpMode(value as FollowUpMode)
                }}
                className='rounded-full bg-muted/30 p-0.5'
              >
                <ToggleGroupItem
                  value='queue'
                  className='h-6 rounded-full px-2.5 text-[12px] first:rounded-full last:rounded-full data-[state=on]:bg-muted'
                >
                  队列
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='steer'
                  className='h-6 rounded-full px-2.5 text-[12px] first:rounded-full last:rounded-full data-[state=on]:bg-muted'
                >
                  引导
                </ToggleGroupItem>
              </ToggleGroup>
            }
          />
        </SettingsCard>
      </section>

      <section>
        <ConfigTitle>外观</ConfigTitle>
        <SettingsCard>
          <SettingsRow
            title='主题'
            description='使用浅色、深色或跟随系统'
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
                <ToggleGroupItem
                  value='system'
                  className='h-6 rounded-full px-2.5 text-[12px] first:rounded-full last:rounded-full data-[state=on]:bg-muted'
                >
                  <Laptop className='h-3 w-3' />
                  跟随系统
                </ToggleGroupItem>
              </ToggleGroup>
            }
          />
          <SettingsRow
            title='使用不透明窗口背景'
            description='使用实色背景而非系统半透明效果'
            control={
              <Switch
                checked={opaqueWindow}
                onCheckedChange={setOpaqueWindow}
                className='h-5 w-8 data-[state=checked]:bg-[#0A84FF]'
              />
            }
          />
          <SettingsRow
            title='使用指针光标'
            description='悬停在交互元素上时将光标改为指针'
            control={
              <Switch
                checked={usePointerCursor}
                onCheckedChange={setUsePointerCursor}
                className='h-5 w-8 data-[state=checked]:bg-[#0A84FF]'
              />
            }
          />
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
                  value='-apple-system, BlinkMacSystemFont, "Segoe UI"'
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
                  value='ui-monospace, "SFMono-Regular", Menlo, Consolas'
                  readOnly
                  className='h-7 text-[12px]'
                />
              </div>
            }
          />
        </SettingsCard>
      </section>

      <section>
        <ConfigTitle>通知</ConfigTitle>
        <SettingsCard>
          <SettingsRow
            title='完成通知'
            description='设置完成任务时提醒你的时机'
            control={
              <PillSelect
                value={completionNotify}
                onValueChange={setCompletionNotify}
                items={[{ value: 'unfocused', label: '仅在未聚焦时' }]}
              />
            }
          />
          <SettingsRow
            title='启用权限通知'
            description='需要通知权限时显示提醒'
            noBorder
            control={
              <div className='flex justify-end'>
                <Checkbox
                  checked={permissionNotifications}
                  onCheckedChange={(value) =>
                    setPermissionNotifications(value === true)
                  }
                  className='size-4 rounded border-border data-[state=checked]:bg-muted data-[state=checked]:text-foreground'
                />
              </div>
            }
          />
        </SettingsCard>
      </section>
    </>
  )
}
