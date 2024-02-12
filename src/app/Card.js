import { motion, useMotionValue } from 'framer-motion'
import s from './card.module.css'
import { useScrollConstraints } from '@/utils/useScrollConstrains'
import { useRef } from 'react'
import { useWheelScroll } from '@/utils/useWheelScroll'

const dismissDistance = 30

export default function Card({ id, title, count, content, isSelected, onClick, closeCard }) {
   const y = useMotionValue(0)

   const cardRef = useRef(null)
   const containerRef = useRef(null)
   const constraints = useScrollConstraints(cardRef, isSelected)

   function checkSwipeToDismiss() {
      y.get() > dismissDistance && closeCard()
   }

   useWheelScroll(containerRef, y, constraints, checkSwipeToDismiss, isSelected)

   return (
      <motion.div ref={containerRef} className={isSelected ? s.cardContainer : ''}>
         <motion.div
            style={{ y }}
            className={s.card}
            ref={cardRef}
            layoutId={id}
            onClick={onClick}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeOut', duration: 0.4, type: 'spring' }}
            drag={isSelected ? 'y' : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
         >
            <div className={s.cardContent}>
               <h2>{title}</h2>
               {isSelected && (
                  <div className={s.cardText}>
                     <p>{content.repeat(count)}</p> <br />
                     <p>{content.repeat(count)}</p>
                  </div>
               )}
            </div>
         </motion.div>
      </motion.div>
   )
}
