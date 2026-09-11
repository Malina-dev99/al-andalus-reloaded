import { Button } from 'components/button'
import s from './modal.module.scss'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useStore } from 'lib/store'

const GitHub = dynamic(() => import('icons/sponsor.svg'), { ssr: false })

export function Modal() {
  const [active, setActive] = useState(false)

  const lenis = useStore(({ lenis }) => lenis)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActive(true)
    }, 99999999)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!lenis) return

    if (active) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [active])

  return (
    <div
      className={cn(
        s.modal,
        'layout-grid-inner theme-light',
        active && s.active
      )}
      onClick={() => setActive(false)}
    >
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        <button className={s.close} onClick={() => setActive(false)}></button>
        <div className={cn(s.text, 'p')}>
          <p>
            Creado por Marina Prieto Oltra 🚀
            <br />
          </p>
        </div>
        <Button
          className={cn(s.cta)}
          arrow
          icon={<GitHub />}
          href="https://github.com/sponsors/darkroomengineering"
        >
        </Button>
      </div>
    </div>
  )
}
