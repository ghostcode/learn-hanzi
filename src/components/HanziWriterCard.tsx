import { useEffect, useRef, useState } from 'react'
import HanziWriter from 'hanzi-writer'

interface Props {
  char: string
  size?: number
}

type Status = 'loading' | 'ready' | 'error'

export default function HanziWriterCard({ char, size = 280 }: Props) {
  const targetRef = useRef<HTMLDivElement>(null)
  const writerRef = useRef<HanziWriter | null>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    const el = targetRef.current
    if (!el) return
    setStatus('loading')
    el.innerHTML = ''
    writerRef.current = null

    let writer: HanziWriter
    try {
      writer = HanziWriter.create(el, char, {
        width: size,
        height: size,
        padding: 10,
        showOutline: true,
        showCharacter: false,
        strokeColor: '#2b2620',
        radicalColor: '#9e2b25',
        delayBetweenStrokes: 280,
        strokeAnimationSpeed: 1,
        onLoadCharDataSuccess: () => setStatus('ready'),
        onLoadCharDataError: () => setStatus('error'),
      })
      writerRef.current = writer
    } catch {
      setStatus('error')
    }

    return () => {
      writerRef.current = null
      el.innerHTML = ''
    }
  }, [char, size])

  const animate = () => {
    const w = writerRef.current
    if (!w) return
    w.animateCharacter()
  }
  const quiz = () => {
    const w = writerRef.current
    if (!w) return
    w.quiz({ onComplete: () => animate() })
  }
  const reset = () => {
    const w = writerRef.current
    if (!w) return
    w.hideCharacter()
  }

  return (
    <div>
      <div className="writer-target" ref={targetRef}>
        {status === 'error' && (
          <div style={{ textAlign: 'center', color: 'var(--ink-faint)' }}>
            <div
              style={{
                fontFamily: 'var(--brush)',
                fontSize: 96,
                color: 'var(--ink)',
              }}
            >
              {char}
            </div>
            <div style={{ fontSize: 13, marginTop: 8 }}>此字暂无笔顺数据</div>
          </div>
        )}
      </div>

      {status !== 'error' && (
        <div className="writer-controls">
          <button className="btn small" onClick={animate}>
            演示笔顺
          </button>
          <button className="btn small ghost" onClick={quiz}>
            描红练习
          </button>
          <button className="btn small ghost" onClick={reset}>
            重置
          </button>
        </div>
      )}
    </div>
  )
}
