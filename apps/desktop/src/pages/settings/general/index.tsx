import * as React from 'react'
import { Laptop, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ConfigTitle } from '@/components/config/config-title'
import { SettingsCard } from '@/components/config/settings-card'
import { SettingsRow } from '@/components/config/settings-row'
import { PillSelect } from '@/components/config/pill-select'
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
      <h1 className="text-2xl font-semibold leading-none tracking-tight mb-6 mt-4">General</h1>

      <div className="mt-2.5 space-y-2.5">
        <SettingsCard>
          <SettingsRow
            title="Default open destination"
            description="Where files and folders open by default"
            titleClassName="text-[14px]"
            descriptionClassName="text-[13px]"
            control={
              <Button
                variant="secondary"
                className="h-7 w-full justify-start gap-2 rounded-full px-3 text-[12px] md:w-[212px]"
              >
                <span className="inline-grid size-5 place-items-center rounded-full bg-black text-[10px] font-semibold text-white">
                  C
                </span>
                Cursor
              </Button>
            }
          />
          <SettingsRow
            title="Language"
            description="Language for the app UI"
            control={
              <PillSelect
                value={language}
                onValueChange={setLanguage}
                items={[{ value: 'en-us', label: 'English (United States)' }]}
              />
            }
          />
          <SettingsRow
            title="Thread detail"
            description="Choose how much command output to show in threads"
            control={
              <PillSelect
                value={threadDetail}
                onValueChange={setThreadDetail}
                items={[
                  { value: 'steps-with-code', label: 'Steps with code commands' },
                ]}
                widthClassName="w-full md:min-w-[248px]"
              />
            }
          />
          <SettingsRow
            title="Prevent sleep while running"
            description="Keep your computer awake while Codex is running a thread."
            control={
              <Switch
                checked={preventSleep}
                onCheckedChange={setPreventSleep}
                className="h-5 w-8 data-[state=checked]:bg-[#0A84FF]"
              />
            }
          />
          <SettingsRow
            title="Require Cmd + Enter to send long prompts"
            description="When enabled, multiline prompts require Cmd + Enter to send."
            control={
              <Switch
                checked={requireMetaEnter}
                onCheckedChange={setRequireMetaEnter}
                className="h-5 w-8 data-[state=checked]:bg-[#0A84FF]"
              />
            }
          />
          <SettingsRow
            title="Follow-up behavior"
            description="Queue follow-ups while Codex runs or steer the current run. Press Shift+Cmd+Enter to do the opposite for one message."
            noBorder
            control={
              <ToggleGroup
                type="single"
                value={followUpMode}
                onValueChange={(value) => {
                  if (value) setFollowUpMode(value as FollowUpMode)
                }}
                className="rounded-full bg-muted/30 p-0.5"
              >
                <ToggleGroupItem
                  value="queue"
                  className="h-6 rounded-full px-2.5 text-[12px] first:rounded-full last:rounded-full data-[state=on]:bg-muted"
                >
                  Queue
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="steer"
                  className="h-6 rounded-full px-2.5 text-[12px] first:rounded-full last:rounded-full data-[state=on]:bg-muted"
                >
                  Steer
                </ToggleGroupItem>
              </ToggleGroup>
            }
          />
        </SettingsCard>

        <section>
          <ConfigTitle>Appearance</ConfigTitle>
          <SettingsCard>
            <SettingsRow
              title="Theme"
              description="Use light, dark, or match your system"
              control={
                <ToggleGroup
                  type="single"
                  value={themeMode}
                  onValueChange={(value) => {
                    if (value) setThemeMode(value as ThemeMode)
                  }}
                  className="rounded-full bg-muted/30 p-0.5"
              >
                <ToggleGroupItem
                  value="light"
                  className="h-6 rounded-full px-2.5 text-[12px] first:rounded-full last:rounded-full data-[state=on]:bg-muted"
                >
                    <Sun className="h-3 w-3" />
                    Light
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="dark"
                    className="h-6 rounded-full px-2.5 text-[12px] first:rounded-full last:rounded-full data-[state=on]:bg-muted"
                  >
                    <Moon className="h-3 w-3" />
                    Dark
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="system"
                    className="h-6 rounded-full px-2.5 text-[12px] first:rounded-full last:rounded-full data-[state=on]:bg-muted"
                  >
                    <Laptop className="h-3 w-3" />
                    System
                  </ToggleGroupItem>
                </ToggleGroup>
              }
            />
            <SettingsRow
              title="Use opaque window background"
              description="Make windows use a solid background rather than system translucency"
              control={
                <Switch
                  checked={opaqueWindow}
                  onCheckedChange={setOpaqueWindow}
                  className="h-5 w-8 data-[state=checked]:bg-[#0A84FF]"
                />
              }
            />
            <SettingsRow
              title="Use pointer cursors"
              description="Change the cursor to a pointer when hovering over interactive elements"
              control={
                <Switch
                  checked={usePointerCursor}
                  onCheckedChange={setUsePointerCursor}
                  className="h-5 w-8 data-[state=checked]:bg-[#0A84FF]"
                />
              }
            />
            <SettingsRow
              title="Sans font family"
              description="Adjust the font used for the Codex UI"
              control={
                <div className="grid w-full grid-cols-[66px_auto_1fr] gap-1.5 md:w-[318px]">
                  <Input
                    value="13"
                    readOnly
                    className="h-7 text-center text-[12px]"
                  />
                  <div className="flex items-center text-[12px] text-muted-foreground">
                    px
                  </div>
                  <Input
                    value='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                    readOnly
                    className="h-7 text-[12px]"
                  />
                </div>
              }
            />
            <SettingsRow
              title="Code font"
              description="Adjust font and size used for code across chats and diffs"
              noBorder
              control={
                <div className="grid w-full grid-cols-[66px_auto_1fr] gap-1.5 md:w-[318px]">
                  <Input
                    value="13"
                    readOnly
                    className="h-7 text-center text-[12px]"
                  />
                  <div className="flex items-center text-[12px] text-muted-foreground">
                    px
                  </div>
                  <Input
                    value='ui-monospace, "SFMono-Regular", Menlo, Consolas'
                    readOnly
                    className="h-7 text-[12px]"
                  />
                </div>
              }
            />
          </SettingsCard>
        </section>

        <section>
          <ConfigTitle>Notifications</ConfigTitle>
          <SettingsCard>
            <SettingsRow
              title="Turn completion notifications"
              description="Set when Codex alerts you that it is finished"
              control={
                <PillSelect
                  value={completionNotify}
                  onValueChange={setCompletionNotify}
                  items={[{ value: 'unfocused', label: 'Only when unfocused' }]}
                />
              }
            />
            <SettingsRow
              title="Enable permission notifications"
              description="Show alerts when notification permissions are required"
              noBorder
              control={
                <div className="flex justify-end">
                  <Checkbox
                    checked={permissionNotifications}
                    onCheckedChange={(value) =>
                      setPermissionNotifications(value === true)
                    }
                    className="size-4 rounded border-border data-[state=checked]:bg-muted data-[state=checked]:text-foreground"
                  />
                </div>
              }
            />
          </SettingsCard>
        </section>
      </div>
    </>
  )
}
