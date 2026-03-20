import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { SettingsCard } from '@/components/setting/settings-card'
import { SettingsRow } from '@/components/setting/settings-row'
import { ConfigTitle } from '@/components/setting/config-title'

export default function SettingsGitPage() {
  const [branchPrefix, setBranchPrefix] = useState('OpenMind/')
  const [forceWithLease, setForceWithLease] = useState(false)
  const [draftPR, setDraftPR] = useState(false)
  const [commitInstructions, setCommitInstructions] = useState('')
  const [prInstructions, setPrInstructions] = useState('')

  return (
    <>
      <section>
        <ConfigTitle>Git</ConfigTitle>
      </section>

      <section>
        <SettingsCard>
          <SettingsRow
            title='分支前缀'
            description='在 OpenMind 中创建新分支时使用的前缀'
            control={
              <Input
                value={branchPrefix}
                onChange={(e) => setBranchPrefix(e.target.value)}
                className='w-40 h-8 text-[13px]'
              />
            }
          />
          <SettingsRow
            title='始终强制推送'
            description='从 OpenMind 推送时使用 --force-with-lease 参数'
            control={
              <Switch
                checked={forceWithLease}
                onCheckedChange={setForceWithLease}
              />
            }
          />
          <SettingsRow
            title='Create draft pull requests'
            description='Use draft pull requests by default when creating PRs from OpenMind'
            control={
              <Switch
                checked={draftPR}
                onCheckedChange={setDraftPR}
              />
            }
            noBorder
          />
        </SettingsCard>
      </section>

      <section>
        <ConfigTitle>提交指令</ConfigTitle>
        <SettingsCard>
          <div className='px-3.5 py-3 space-y-3'>
            <p className='text-[13px] text-muted-foreground'>
              已添加到提交信息生成提示中
            </p>
            <Textarea
              placeholder='添加提交消息指引...'
              value={commitInstructions}
              onChange={(e) => setCommitInstructions(e.target.value)}
              className='min-h-32 resize-y text-[13px]'
            />
            <div className='flex justify-end'>
              <Button
                variant='default'
                size='sm'
              >
                保存
              </Button>
            </div>
          </div>
        </SettingsCard>
      </section>

      <section>
        <ConfigTitle>拉取请求指令</ConfigTitle>
        <SettingsCard>
          <div className='px-3.5 py-3 space-y-3'>
            <p className='text-[13px] text-muted-foreground'>
              已附加到由 OpenMind 创建的拉取请求正文中
            </p>
            <Textarea
              placeholder='添加拉取请求指引...'
              value={prInstructions}
              onChange={(e) => setPrInstructions(e.target.value)}
              className='min-h-32 resize-y text-[13px]'
            />
            <div className='flex justify-end'>
              <Button
                variant='default'
                size='sm'
              >
                保存
              </Button>
            </div>
          </div>
        </SettingsCard>
      </section>
    </>
  )
}
