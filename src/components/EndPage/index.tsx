import { ScaledHero } from '@/components/ScaledHero'
import styles from './index.module.css'

type EndPageProps = {
  word: string
}

export function EndPage({ word }: EndPageProps) {
  return (
    <div className={styles.endPage}>
      <ScaledHero
        measureText="I make stuff."
        ariaLabel={word}
        titleClassName={styles.title}
        titleGroupClassName={styles.titleGroup}
        reflectionHorizonClassName={styles.horizon}
        reflectionClassName={styles.reflection}
        reflectionMirrorClassName={styles.reflectionMirror}
        reflectionBlurLayerClassNames={[
          styles.reflectionBlurSharp,
          styles.reflectionBlurMid,
          styles.reflectionBlurSoft,
        ]}
      >
        {word}
      </ScaledHero>
    </div>
  )
}
