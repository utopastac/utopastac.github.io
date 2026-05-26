import { ScaledHero } from '@/components/ScaledHero'
import styles from './index.module.css'

export function EndPage() {
  return (
    <div className={styles.endPage}>
      <ScaledHero
        measureText="I make stuff."
        ariaLabel="I make stuff."
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
        Maker.
      </ScaledHero>
    </div>
  )
}
