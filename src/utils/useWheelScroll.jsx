import { useRef } from 'react'
import { useDomEvent } from 'framer-motion'
import { spring } from 'popmotion'
import { mix } from '@popmotion/popcorn'
import { debounce } from 'lodash'

const deltaThreshold = 5
const elasticFactor = 0.2

function springTo(value, from, to) {
   if (value.isAnimating()) return

   value.start(complete => {
      spring({
         from,
         to,
         velocity: value.getVelocity(),
         stiffness: 400,
         damping: 40,
      }).start({
         update: v => value.set(v),
         complete,
      })
   })
}

const debouncedSpringTo = debounce(springTo, 100)

export function useWheelScroll(ref, y, constraints, onWheelCallback, isActive) {
   const yRef = useRef(y)

   const onWheel = event => {
      event.preventDefault()

      const currentY = yRef.current.get()
      let newY = currentY - event.deltaY
      let startedAnimation = false
      const isWithinBounds = constraints && newY >= constraints.top && newY <= constraints.bottom

      if (constraints && !isWithinBounds) {
         newY = mix(currentY, newY, elasticFactor)

         if (newY < constraints.top) {
            if (event.deltaY <= deltaThreshold) {
               springTo(yRef.current, newY, constraints.top)
               startedAnimation = true
            } else {
               debouncedSpringTo(yRef.current, newY, constraints.top)
            }
         }

         if (newY > constraints.bottom) {
            if (event.deltaY >= -deltaThreshold) {
               springTo(yRef.current, newY, constraints.bottom)
               startedAnimation = true
            } else {
               debouncedSpringTo(yRef.current, newY, constraints.bottom)
            }
         }
      }

      if (!startedAnimation) {
         yRef.current.stop()
         yRef.current.set(newY)
      } else {
         debouncedSpringTo.cancel()
      }

      onWheelCallback(event)
   }

   useDomEvent(ref, 'wheel', isActive && onWheel, { passive: false })
}
